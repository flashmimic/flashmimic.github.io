// In-flight downloads are shared by prewarming and Play, independent of HTTP cache.
export const base = new URL("../assets/sim/", import.meta.url);
const downloads = new Map();
function cached(url, read, options) {
  const key = String(url);
  if (!downloads.has(key)) {
    const promise = fetch(url, options).then(response => {
      if (!response.ok) throw new Error(`Asset ${response.status}: ${url}`);
      return read(response);
    }).catch(error => { downloads.delete(key); throw error; });
    downloads.set(key, promise);
  }
  return downloads.get(key);
}
export const binary = url => cached(url, response => response.arrayBuffer());
export const manifest = () => cached(new URL("manifest.json", base), response => response.json(), { cache: "no-cache" });
export const physicsBytes = () => binary(new URL("../assets/vendor/mujoco/mujoco.wasm", import.meta.url));
export const inferenceBytes = () => binary(new URL("../assets/vendor/onnxruntime-web/ort-wasm-simd-threaded.wasm", import.meta.url));
export async function robotFiles(config) {
  if (config.robotBundle && typeof DecompressionStream !== "undefined") {
    const packed = await binary(new URL(config.robotBundle.path, base));
    const signature = new Uint8Array(packed, 0, Math.min(2, packed.byteLength));
    // Some hosts set Content-Encoding: gzip and fetch has already decoded it.
    const compressed = signature[0] === 0x1f && signature[1] === 0x8b;
    const unpacked = compressed
      ? new Uint8Array(await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer())
      : new Uint8Array(packed);
    if (unpacked.byteLength !== config.robotBundle.uncompressedBytes) throw new Error("Invalid robot bundle size.");
    return config.robotBundle.files.map(({ path, offset, bytes }) => {
      if (offset < 0 || offset + bytes > unpacked.length) throw new Error("Invalid robot bundle entry.");
      return [path, unpacked.subarray(offset, offset + bytes)];
    });
  }
  // Older browsers can still use the original, unmodified assets.
  const files = [];
  let next = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (next < config.robotFiles.length) {
      const path = config.robotFiles[next++];
      files.push([path, new Uint8Array(await binary(new URL(path, base)))]);
    }
  }));
  return files;
}
export async function warmShared() {
  const configTask = manifest().then(config => {
    if (config.robotBundle && typeof DecompressionStream !== "undefined") return binary(new URL(config.robotBundle.path, base));
  });
  await Promise.all([physicsBytes(), inferenceBytes(), configTask]);
}
export async function warmDemo(id) {
  const config = await manifest(), spec = config.demos[id];
  if (!spec) throw new Error("Unknown FlashMimic demo.");
  await Promise.all([warmShared(), binary(new URL(spec.motion, base)), binary(new URL(spec.policy, base))]);
}
