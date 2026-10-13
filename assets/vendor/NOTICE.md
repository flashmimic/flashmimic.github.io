# Browser runtime dependencies

These files are copied from the exact npm versions in `package-lock.json` by
`scripts/prepare-vendor.mjs`. They are hosted locally so demos do not depend on a CDN.

| Package | Version | Upstream | License |
| --- | --- | --- | --- |
| @mujoco/mujoco | 3.11.0 | https://github.com/google-deepmind/mujoco | Apache-2.0, `mujoco/LICENSE` |
| onnxruntime-web | 1.23.2 | https://github.com/microsoft/onnxruntime | MIT, `onnxruntime-web/LICENSE` |
| three | 0.180.0 | https://github.com/mrdoob/three.js | MIT, `three/LICENSE` |

G1 XML, meshes and trajectories in `assets/sim/` are copied from the user's
FlashMimic project. Policies are exported from its `g1_batch_v1` training runs;
their provenance and SHA-256 hashes are recorded in `assets/sim/manifest.json`.
They are not copied from the UniLab website's policy binaries.
