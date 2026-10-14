// Losslessly pack the original XML/STL assets; physics and mesh data stay intact.
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { createHash } from "node:crypto";
const base = new URL("../assets/sim/", import.meta.url);
const config = JSON.parse(await readFile(new URL("manifest.json", base)));
const chunks = [], files = [];
let offset = 0;
for (const path of config.robotFiles) {
  const bytes = await readFile(new URL(path, base));
  files.push({ path, offset, bytes: bytes.length });
  chunks.push(bytes);
  offset += bytes.length;
}
const packed = gzipSync(Buffer.concat(chunks), { level: 9 });
const hash = createHash("sha256").update(packed).digest("hex");
await writeFile(new URL("robot.bundle.gz", base), packed);
config.robotBundle = { path: `robot.bundle.gz?v=${hash.slice(0, 12)}`, sha256: hash,
  bytes: packed.length, uncompressedBytes: offset, files };
await writeFile(new URL("manifest.json", base), JSON.stringify(config, null, 2) + "\n");
console.log(`${files.length} robot files: ${offset} → ${packed.length} bytes (gzip)`);
