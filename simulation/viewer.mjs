import * as THREE from "../assets/vendor/three/three.module.js";
import { OrbitControls } from "../assets/vendor/three/OrbitControls.js";
import loadMujoco from "../assets/vendor/mujoco/mujoco.js";
import * as ort from "../assets/vendor/onnxruntime-web/ort.wasm.min.mjs";
import { Controller, PUSH_FORCE } from "./controller.mjs";
import { base, binary, manifest, physicsBytes, inferenceBytes, robotFiles } from "./assets.mjs";

export async function createViewer(container, report, onError) {
  const started = performance.now();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x13202c);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-label", "Interactive G1 physics simulation");
  renderer.domElement.tabIndex = 0;
  container.append(renderer.domElement);
  let mj, model, data;
  try {
    report("loadingEngine");
    const config = await manifest();
    if (config.schemaVersion !== 1 || config.observationDim !== 397 || config.actionDim !== 29) throw new Error("Unsupported demo manifest.");
    // Network transfers overlap: robot, physics WASM, inference WASM and policy.
    const robotTask = robotFiles(config);
    const ortTask = inferenceBytes();
    // These tasks may fail before their consumers await them.
    robotTask.catch(() => {}); ortTask.catch(() => {});
    mj = await loadMujoco({ wasmBinary: await physicsBytes() });
    const engineReady = performance.now();
    if (mj.mj_versionString() !== "3.11.0") throw new Error("MuJoCo version mismatch.");
    report("loadingRobot");
    mj.FS.mkdirTree("/flashmimic");
    for (const [file, bytes] of await robotTask) {
      const path = `/flashmimic/${file}`;
      mj.FS.mkdirTree(path.slice(0, path.lastIndexOf("/")));
      mj.FS.writeFile(path, bytes);
    }
    const robotDownloaded = performance.now();
    model = mj.MjModel.mj_loadXML(`/flashmimic/${config.scene}`);
    data = new mj.MjData(model);
    model.opt.timestep = config.simDt;
    if (model.nq !== 36 || model.nu !== 29) throw new Error("Unexpected G1 robot layout.");
    ort.env.wasm.wasmPaths = new URL("../assets/vendor/onnxruntime-web/", import.meta.url).href;
    // GitHub Pages does not require cross-origin isolation with these settings.
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.proxy = false;
    ort.env.wasm.wasmBinary = await ortTask;
    const viewer = new Viewer({ renderer, container, mj, model, data, config, report, onError });
    console.info("FlashMimic startup", JSON.stringify({ engineMs: Math.round(engineReady - started),
      robotWaitMs: Math.round(robotDownloaded - engineReady),
      sceneAndRendererMs: Math.round(performance.now() - robotDownloaded), totalMs: Math.round(performance.now() - started) }));
    return viewer;
  } catch (error) {
    data?.delete(); model?.delete(); renderer.dispose(); renderer.domElement.remove();
    throw error;
  }
}

class Viewer {
  constructor({ renderer, container, mj, model, data, config, report, onError }) {
    Object.assign(this, { renderer, container, mj, model, data, config, report, onError });
    this.controller = new Controller(mj, model, data, config);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x13202c, 12, 35);
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.02, 60);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(2.4, -2.9, 1.65);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.target.set(0, 0, 0.7);
    this.controls.enableDamping = true;
    this.controls.minDistance = 0.6;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.scene.add(new THREE.HemisphereLight(0xd5edff, 0x364354, 2.5));
    const sun = new THREE.DirectionalLight(0xffffff, 3);
    sun.position.set(3, -4, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = sun.shadow.camera.bottom = -5;
    sun.shadow.camera.right = sun.shadow.camera.top = 5;
    sun.shadow.normalBias = 0.025;
    this.scene.add(sun);
    this.sun = sun;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x253744, roughness: 0.95 }));
    floor.receiveShadow = true;
    floor.position.z = -0.002;
    this.scene.add(floor);
    const grid = new THREE.GridHelper(100, 100, 0x52717b, 0x38505d);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = 0.001;
    this.scene.add(grid);
    this.meshes = [];
    this.buildRobot();
    this.pushDirection = new THREE.Vector3(...PUSH_FORCE).normalize();
    this.pushArrow = new THREE.ArrowHelper(this.pushDirection, new THREE.Vector3(), 0.9, 0xffb347, 0.22, 0.13);
    for (const part of [this.pushArrow.line, this.pushArrow.cone]) {
      part.material.depthTest = false;
      part.material.depthWrite = false;
      part.material.transparent = true;
      part.renderOrder = 10;
    }
    this.pushArrow.visible = false;
    this.pushFadeUntil = 0;
    this.scene.add(this.pushArrow);
    this.visible = true;
    this.paused = false;
    this.busy = false;
    this.selecting = false;
    this.generation = 0;
    this.lastTick = 0;
    this.lastReport = 0;
    this.follow = new THREE.Vector3();
    this.hasFollow = false;
    this.cameraFollow = true;
    this.resize = new ResizeObserver(() => this.resizeCanvas());
    this.resize.observe(container);
    renderer.domElement.addEventListener("webglcontextlost", event => {
      event.preventDefault(); this.paused = true; onError(new Error("WebGL context lost. Reload the page to recover."));
    });
    this.animate = this.animate.bind(this);
    this.animation = requestAnimationFrame(this.animate);
  }
  buildRobot() {
    const m = this.model;
    const meshCache = new Map();
    for (let i = 0; i < m.ngeom; i++) {
      if (m.geom_group[i] !== 2) continue; // Visible robot meshes, not collision proxies.
      if (m.geom_type[i] !== 7) continue; // mjGEOM_MESH; ground is drawn separately.
      const id = m.geom_dataid[i];
      let geometry = meshCache.get(id);
      if (!geometry) {
        geometry = new THREE.BufferGeometry();
        const start = m.mesh_vertadr[id] * 3, count = m.mesh_vertnum[id] * 3;
        const firstFace = m.mesh_faceadr[id] * 3, faces = m.mesh_facenum[id] * 3;
        geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(m.mesh_vert.slice(start, start + count)), 3));
        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(m.mesh_face.slice(firstFace, firstFace + faces)), 1));
        geometry.computeVertexNormals();
        meshCache.set(id, geometry);
      }
      let rgba = m.geom_rgba.slice(i * 4, i * 4 + 4);
      const materialId = m.geom_matid[i];
      if (materialId >= 0) rgba = m.mat_rgba.slice(materialId * 4, materialId * 4 + 4);
      const color = new THREE.Color().setRGB(rgba[0], rgba[1], rgba[2], THREE.LinearSRGBColorSpace);
      const material = new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.5 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      this.meshes.push({ id: i, mesh });
      this.scene.add(mesh);
    }
  }
  resizeCanvas() {
    const width = this.container.clientWidth, height = this.container.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  async select(id) {
    const started = performance.now();
    const spec = this.config.demos[id];
    if (!spec) throw new Error("Unknown FlashMimic demo.");
    this.selecting = true;
    this.generation++;
    // Wait for an in-flight inference before releasing its session.
    if (this.pending) await this.pending;
    if (this.session) { await this.session.release(); this.session = null; }
    this.report("loadingPolicy");
    const [buffer, policy] = await Promise.all([binary(new URL(spec.motion, base)), binary(new URL(spec.policy, base))]);
    if (buffer.byteLength !== spec.frames * spec.stride * 4) throw new Error("Invalid reference trajectory size.");
    const session = await ort.InferenceSession.create(policy, { executionProviders: ["wasm"], graphOptimizationLevel: "all" });
    this.session = session;
    this.controller.setMotion(new Float32Array(buffer), spec);
    this.pushFadeUntil = 0;
    this.id = id;
    this.centerCamera();
    this.paused = false;
    this.selecting = false;
    this.lastTick = performance.now();
    this.resizeCanvas();
    console.info("FlashMimic policy ready", JSON.stringify({ id, totalMs: Math.round(performance.now() - started) }));
  }
  centerCamera() {
    const target = new THREE.Vector3(this.data.qpos[0], this.data.qpos[1], 0.65);
    this.camera.position.add(target.clone().sub(this.controls.target));
    this.controls.target.copy(target);
    this.follow.copy(target);
    this.hasFollow = true;
  }
  setCameraFollow(follow) {
    this.cameraFollow = follow;
    if (follow && this.id) this.centerCamera();
  }
  setVisible(visible) { this.visible = visible; this.lastTick = performance.now(); }
  setPaused(paused) { this.paused = paused; this.generation++; this.lastTick = performance.now(); }
  reset() { this.generation++; this.controller.reset(); this.pushFadeUntil = 0; }
  push() {
    if (this.paused || !this.visible || this.selecting || !this.id) return;
    this.controller.push();
  }
  async tick() {
    this.busy = true;
    const generation = this.generation;
    try {
      const input = this.controller.observation();
      const tensor = new ort.Tensor("float32", input, [1, 397]);
      let result;
      try { result = await this.session.run({ obs: tensor }); }
      finally { tensor.dispose(); }
      if (generation === this.generation) {
        const { ended, failed } = this.controller.step(result.action.data);
        if (ended || failed) this.pushFadeUntil = 0;
      }
      for (const output of Object.values(result)) output.dispose();
    } catch (error) {
      this.paused = true;
      this.onError(error);
    } finally { this.busy = false; }
  }
  animate(now) {
    this.animation = requestAnimationFrame(this.animate);
    if (!this.visible || document.hidden || !this.id || this.selecting) return;
    if (!this.paused && !this.busy && now - this.lastTick >= this.config.ctrlDt * 1000) {
      this.lastTick = Math.max(this.lastTick + this.config.ctrlDt * 1000, now - 80);
      this.pending = this.tick();
    }
    const d = this.data;
    const pushing = this.controller.pushSteps > 0;
    // Keep a fading trace for 600 ms so the short physical impulse is legible.
    if (pushing) this.pushFadeUntil = now + 600;
    const pushOpacity = pushing ? 1 : Math.max(0, (this.pushFadeUntil - now) / 600);
    this.pushArrow.visible = !this.paused && pushOpacity > 0;
    if (this.pushArrow.visible) {
      this.pushArrow.position.fromArray(d.xipos, this.controller.rootId * 3).addScaledVector(this.pushDirection, -0.9);
      this.pushArrow.line.material.opacity = pushOpacity;
      this.pushArrow.cone.material.opacity = pushOpacity;
    }
    for (const { id, mesh } of this.meshes) {
      const p = id * 3, r = id * 9, a = d.geom_xmat;
      mesh.matrix.set(a[r], a[r+1], a[r+2], d.geom_xpos[p], a[r+3], a[r+4], a[r+5], d.geom_xpos[p+1], a[r+6], a[r+7], a[r+8], d.geom_xpos[p+2], 0, 0, 0, 1);
      mesh.matrixWorldNeedsUpdate = true;
    }
    const target = new THREE.Vector3(d.qpos[0], d.qpos[1], 0.65);
    if (!this.hasFollow) { this.follow.copy(target); this.hasFollow = true; }
    const delta = target.clone().sub(this.follow);
    if (this.cameraFollow) {
      this.camera.position.add(delta);
      this.controls.target.copy(target);
    }
    this.follow.copy(target);
    this.sun.position.set(target.x + 3, target.y - 4, 6);
    this.sun.target.position.copy(target);
    this.sun.target.updateMatrixWorld();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    if (now - this.lastReport > 200) {
      this.lastReport = now;
      this.report("running", { time: (this.controller.frame / 50).toFixed(1), duration: ((this.controller.spec.frames - 1) / 50).toFixed(1), resets: this.controller.resets });
    }
  }
}
