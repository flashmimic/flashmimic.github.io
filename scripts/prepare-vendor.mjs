import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const copies = {
  "@mujoco/mujoco": ["mujoco.js", "mujoco.wasm"],
  "onnxruntime-web": ["dist/ort.wasm.min.mjs", "dist/ort-wasm-simd-threaded.mjs", "dist/ort-wasm-simd-threaded.wasm"],
  three: ["build/three.module.js", "build/three.core.js", "examples/jsm/controls/OrbitControls.js", "LICENSE"]
};
const versions = {};
for (const [pkg, files] of Object.entries(copies)) {
  const source = path.join(root, "node_modules", pkg);
  const dest = path.join(root, "assets/vendor", pkg.split("/").pop());
  await mkdir(dest, { recursive: true });
  for (const file of files) await copyFile(path.join(source, file), path.join(dest, path.basename(file)));
  versions[pkg] = JSON.parse(await readFile(path.join(source, "package.json"))).version;
}
await writeFile(path.join(root, "assets/vendor/versions.json"), JSON.stringify(versions, null, 2) + "\n");
console.log("Prepared static runtime assets:", versions);
