"""Compare the JavaScript actor inputs against FlashMimic's real Python terms.

Run with FlashMimic's Python interpreter. Uses perturbed states, upside-down
poses and both trajectory boundaries; no GPU/training environment is required.
"""
import argparse
import json
import os
import subprocess
import tempfile
from pathlib import Path
from types import SimpleNamespace

import numpy as np
import torch
os.environ.setdefault("NUMBA_CACHE_DIR", str(Path(tempfile.gettempdir()) / "flashmimic-numba-cache"))
from flashmimic.tasks.motion_tracking import obs_terms
from flashmimic.tasks.motion_tracking.motion_command import FlashMimicTensorMotionCommand, TensorMotionObsFuture

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", type=Path, required=True)
    args = parser.parse_args()
    config = json.loads((ROOT / "assets/sim/manifest.json").read_text())
    cases = []
    rng = np.random.default_rng(42)
    to_tensor = lambda a: torch.tensor(np.asarray(a), dtype=torch.float32)
    for job, spec in config["demos"].items():
        with np.load(args.project / "src/flashmimic/assets/motions/g1" / spec["source"]["motion"]) as m:
            for index, frame in enumerate([0, 1, 7, 50, spec["frames"] // 2, spec["frames"] - 1]):
                q = rng.standard_normal(4)
                q /= np.linalg.norm(q)
                if index == 1:
                    q = np.array([2**-0.5, 0, 2**-0.5, 0]) # near vertical heading fallback
                if index == 2:
                    q = np.array([0, 1, 0, 0]) # upside-down
                position = m["body_pos_w"][frame, 1] + rng.uniform(-0.1, 0.1, 3)
                state = {"rootPosition": position.tolist(), "rootQuaternion": q.tolist(),
                         "gyro": rng.standard_normal(3).tolist(), "upVector": rng.standard_normal(3).tolist(),
                         "jointPosition": m["joint_pos"][frame].tolist(), "jointVelocity": m["joint_vel"][frame].tolist()}
                last_action = rng.uniform(-1, 1, 29).astype(np.float32)
                rows = np.clip(frame + np.array(config["futureSteps"]), 0, spec["frames"] - 1)
                future = TensorMotionObsFuture(
                    future_steps=tuple(config["futureSteps"]),
                    ref_joint_pos=to_tensor(m["joint_pos"][rows][None]),
                    ref_body_pos_w=to_tensor(m["body_pos_w"][rows, 1][None, :, None, :]),
                    ref_body_quat_w=to_tensor(m["body_quat_w"][rows, 1][None, :, None, :]),
                    ref_body_lin_vel_w=torch.empty(1, 8, 1, 3), ref_body_ang_vel_w=torch.empty(1, 8, 1, 3),
                )
                command = object.__new__(FlashMimicTensorMotionCommand)
                command.obs_root_body_idx = 0
                command._obs_robot_body_pos_w = to_tensor(position[None, None])
                command._obs_robot_body_quat_w = to_tensor(q[None, None])
                command._refresh_robot_state = lambda: None
                command.obs_future = lambda steps: future
                command.memoize_aux = lambda future, key, make: make()
                command._robot_joint_pos = to_tensor(m["joint_pos"][frame][None])
                command._robot_joint_vel = to_tensor(m["joint_vel"][frame][None])
                command.robot = SimpleNamespace(data=SimpleNamespace(joint_pos=command._robot_joint_pos, joint_vel=command._robot_joint_vel))
                command._env = SimpleNamespace(scene=SimpleNamespace())
                command.joint_default_bias = torch.zeros(1, 29)
                env = SimpleNamespace(num_envs=1, command_manager=SimpleNamespace(get_term=lambda name: command))
                parts = [to_tensor(last_action[None]),
                         obs_terms.ref_root_pos_future_local(env, "motion", config["futureSteps"]),
                         obs_terms.ref_root_ori_future_b(env, "motion", config["futureSteps"]),
                         obs_terms.ref_joint_pos_future(env, "motion", config["futureSteps"]),
                         to_tensor([state["gyro"]]), -to_tensor([state["upVector"]]),
                         obs_terms.motion_joint_pos(env, "motion"), obs_terms.motion_joint_vel(env, "motion")]
                expected = torch.cat(parts, dim=-1).numpy().reshape(-1)
                cases.append({"job": job, "frame": frame, "state": state, "lastAction": last_action.tolist(),
                              "expected": expected.tolist()})
    script = """
import { readFileSync } from 'node:fs';
import { buildObservation } from './simulation/observations.mjs';
const cases = JSON.parse(readFileSync(0, 'utf8'));
const config = JSON.parse(readFileSync('assets/sim/manifest.json'));
let maxError = 0;
for (const c of cases) {
  const spec = config.demos[c.job];
  const bytes = readFileSync('assets/sim/' + spec.motion);
  const motion = new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const actual = buildObservation(c.state, motion, spec, config, c.frame, c.lastAction);
  const error = Math.max(...actual.map((v, i) => Math.abs(v - c.expected[i])));
  maxError = Math.max(maxError, error);
  if (error > 1e-5) throw new Error(c.job + ' frame ' + c.frame + ': observation error ' + error);
}
console.log(JSON.stringify({cases: cases.length, maxAbsError: maxError}));
"""
    result = subprocess.run(["node", "--input-type=module", "-e", script], input=json.dumps(cases), text=True,
                            cwd=ROOT, capture_output=True, check=True)
    print(result.stdout.strip())


if __name__ == "__main__":
    main()
