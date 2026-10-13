// Exercise the same WASM engine, actor, observation adapter and control loop as
// the browser, without a renderer. Run after exporting the assets.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import loadMujoco from "../assets/vendor/mujoco/mujoco.js";
import * as ort from "../assets/vendor/onnxruntime-web/ort.wasm.min.mjs";
import { Controller } from "../simulation/controller.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const base = path.join(root, "assets/sim");
const config = JSON.parse(await readFile(path.join(base, "manifest.json")));
const mj = await loadMujoco({ wasmBinary: await readFile(path.join(root, "assets/vendor/mujoco/mujoco.wasm")) });
mj.FS.mkdirTree("/flashmimic");
for (const file of config.robotFiles) {
  const dest = `/flashmimic/${file}`;
  mj.FS.mkdirTree(path.dirname(dest));
  mj.FS.writeFile(dest, await readFile(path.join(base, file)));
}
const model = mj.MjModel.mj_loadXML(`/flashmimic/${config.scene}`);
const data = new mj.MjData(model);
const controller = new Controller(mj, model, data, config);
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.wasm.wasmPaths = new URL("../assets/vendor/onnxruntime-web/", import.meta.url).href;
const results = [];
for (const [id, spec] of Object.entries(config.demos)) {
  const buffer = await readFile(path.join(base, spec.motion));
  const motion = new Float32Array(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
  controller.setMotion(motion, spec);
  const session = await ort.InferenceSession.create(new Uint8Array(await readFile(path.join(base, spec.policy))), { executionProviders: ["wasm"] });
  let firstFailureFrame = null, completedClips = 0, maxAction = 0;
  const start = performance.now();
  for (let i = 0; i < spec.frames + 10; i++) {
    const input = new ort.Tensor("float32", controller.observation(), [1, config.observationDim]);
    const result = await session.run({ obs: input });
    maxAction = Math.max(maxAction, ...result.action.data.map(Math.abs));
    const frame = controller.frame;
    const { failed, ended } = controller.step(result.action.data);
    if (failed && firstFailureFrame === null) firstFailureFrame = frame;
    if (ended) completedClips++;
    input.dispose(); result.action.dispose();
    if (!data.qpos.every(Number.isFinite)) throw new Error(`${id}: nonfinite physics state`);
  }
  // Check that the control target uses the previous action, then reset/push.
  controller.reset();
  controller.step(new Float32Array(29).fill(0.01));
  const delayError = Math.max(...data.ctrl.map((v, i) => Math.abs(v - config.defaultJointPosition[i])));
  if (delayError > 1e-6) throw new Error(`${id}: action delay mismatch`);
  controller.push();
  controller.step(new Float32Array(29));
  if (controller.pushSteps !== 12) throw new Error("Push duration mismatch");
  controller.reset();
  if (controller.frame !== 0 || controller.lastAction.some(v => v !== 0)) throw new Error("Reset did not clear controller state");
  await session.release();
  const row = { id, simulatedSteps: spec.frames + 10, completedClips, firstFailureFrame, maxAction,
                actionDelayMaxError: delayError, elapsedSeconds: (performance.now() - start) / 1000 };
  results.push(row);
  console.log(JSON.stringify(row));
}
data.delete(); model.delete();
const out = process.argv[2];
if (out) { await mkdir(path.dirname(out), { recursive: true }); await writeFile(out, JSON.stringify(results, null, 2) + "\n"); }
