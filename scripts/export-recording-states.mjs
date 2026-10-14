// Run the website's actual WASM controller and ONNX policies, not reference replay.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import loadMujoco from "../assets/vendor/mujoco/mujoco.js";
import * as ort from "../assets/vendor/onnxruntime-web/ort.wasm.min.mjs";
import { Controller } from "../simulation/controller.mjs";

const output = process.argv[2];
if (!output) throw new Error("Usage: node scripts/export-recording-states.mjs OUTPUT_DIRECTORY");
await mkdir(output, { recursive: true });
const base = new URL("../assets/sim/", import.meta.url);
const config = JSON.parse(await readFile(new URL("manifest.json", base)));
const mj = await loadMujoco({ wasmBinary: await readFile(new URL("../assets/vendor/mujoco/mujoco.wasm", import.meta.url)) });
if (mj.mj_versionString() !== "3.11.0") throw new Error("MuJoCo version mismatch");
const packed = gunzipSync(await readFile(new URL(config.robotBundle.path, base)));
for (const { path: file, offset, bytes } of config.robotBundle.files) {
  const dest = `/flashmimic/${file}`;
  mj.FS.mkdirTree(path.dirname(dest));
  mj.FS.writeFile(dest, packed.subarray(offset, offset + bytes));
}
const model = mj.MjModel.mj_loadXML(`/flashmimic/${config.scene}`);
model.opt.timestep = config.simDt;
const data = new mj.MjData(model);
const controller = new Controller(mj, model, data, config);
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.wasm.wasmPaths = new URL("../assets/vendor/onnxruntime-web/", import.meta.url).href;
const metadata = { engine: config.engine, observationDim: config.observationDim,
  actionDim: config.actionDim, fps: 1 / config.ctrlDt, nq: model.nq, nv: model.nv,
  domainRandomization: false, observationNoise: false, manualPush: false,
  robotBundleSha256: config.robotBundle.sha256, demos: {} };
for (const [id, spec] of Object.entries(config.demos)) {
  const motion = await readFile(new URL(spec.motion, base));
  controller.setMotion(new Float32Array(motion.buffer.slice(motion.byteOffset, motion.byteOffset + motion.byteLength)), spec);
  const policy = await readFile(new URL(spec.policy, base));
  const session = await ort.InferenceSession.create(new Uint8Array(policy), { executionProviders: ["wasm"], graphOptimizationLevel: "all" });
  // Stop before the loop's automatic reset, so the last frame never jumps home.
  const frames = spec.frames - 1, stride = model.nq + model.nv;
  const states = new Float64Array(frames * stride);
  for (let frame = 0; frame < frames; frame++) {
    states.set(data.qpos, frame * stride);
    states.set(data.qvel, frame * stride + model.nq);
    if (frame === frames - 1) break;
    const input = new ort.Tensor("float32", controller.observation(), [1, config.observationDim]);
    const result = await session.run({ obs: input });
    const outcome = controller.step(result.action.data);
    input.dispose(); result.action.dispose();
    if (outcome.failed || outcome.ended) throw new Error(`${id}: unexpected reset at frame ${frame}`);
  }
  if (!states.every(Number.isFinite)) throw new Error(`${id}: invalid state`);
  await writeFile(path.join(output, `${id}.f64`), new Uint8Array(states.buffer));
  metadata.demos[id] = { frames, duration: frames / metadata.fps, stride,
    policySha256: createHash("sha256").update(policy).digest("hex"), resets: controller.resets };
  await session.release();
  console.log(`${id}: ${frames} frames, no DR, no tracking failures`);
}
await writeFile(path.join(output, "recordings.json"), JSON.stringify(metadata, null, 2) + "\n");
data.delete(); model.delete();
