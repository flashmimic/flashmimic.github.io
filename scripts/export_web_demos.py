"""Export FlashMimic G1 FlashSAC runs for the buildless browser demo.

Run with FlashMimic's Python environment; never modifies the training project.
Fails on unsupported profiles instead of silently exporting mismatched control.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path

import mujoco
import numpy as np
import onnx
import onnxruntime as ort
import torch
import yaml
from uni_rl.algos.flash_sac.network import FlashSACActor

FUTURE = [-8, -4, -2, 0, 1, 2, 3, 4]
TERMS = [
    "last_action", "ref_root_pos_future_local_u", "ref_root_ori_future_b_u",
    "ref_joint_pos_future_u", "base_ang_vel_u", "projected_gravity_u", "joint_pos_u", "joint_vel_u",
]
MOTIONS = {
    "G01_dance": "dance1_subject2_part.npz",
    "G02_flip": "flip_360_001__A304.npz",
    "G03_run": "run1_subject5_from_csv_clip15s_v2.npz",
    "G04_sprint": "sprint1_subject4_from_csv_clip15s_v2.npz",
    "G05_walk": "walk1_subject5_from_csv_clip15s_v2.npz",
}


def sha256(file: Path) -> str:
    return hashlib.sha256(file.read_bytes()).hexdigest()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", type=Path, required=True)
    parser.add_argument("--runs", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "assets/sim")
    args = parser.parse_args()
    assets = args.project / "src/flashmimic/assets"
    robot = assets / "robots/g1"
    model = mujoco.MjModel.from_xml_path(str(robot / "scene_flat.xml"))
    require(mujoco.__version__ == "3.11.0", "Use MuJoCo 3.11.0 to match the pinned browser runtime.")
    require((model.nq, model.nv, model.nu) == (36, 35, 29), "Expected the G1 29-DOF model.")
    args.output.mkdir(parents=True, exist_ok=True)
    shutil.copytree(robot, args.output / "robot", dirs_exist_ok=True)
    robot_files = sorted(str(p.relative_to(args.output)) for p in (args.output / "robot").rglob("*") if p.is_file())
    body_names = [model.body(i).name for i in range(model.nbody)]
    manifest = {
        "schemaVersion": 1, "engine": "MuJoCo 3.11.0", "algorithm": "FlashSAC",
        "observationDim": 397, "actionDim": 29, "futureSteps": FUTURE,
        "scene": "robot/scene_flat.xml", "robotFiles": robot_files,
        "rootBody": "pelvis", "anchorBody": "torso_link", "demos": {},
    }
    common = None
    torch.set_num_threads(1)
    for job, motion_name in MOTIONS.items():
        run = args.runs / job
        config_path = run / "resolved_config.yaml"
        cfg = yaml.safe_load(config_path.read_text())
        env, algo = cfg["env"], cfg["algo"]
        require(algo["algo"] == "flashsac" and not algo["obs_normalization"], "Unsupported algorithm/normalizer.")
        obs = env["observations"]["actor"]
        require(list(obs["terms"]) == TERMS, f"{job}: actor term order differs from the web adapter.")
        require(not obs.get("history_length", 0), "Observation history is not supported by this adapter.")
        expected_funcs = [
            "unilab.envs.mdp.last_action",
            "flashmimic.tasks.motion_tracking.obs_terms.ref_root_pos_future_local",
            "flashmimic.tasks.motion_tracking.obs_terms.ref_root_ori_future_b",
            "flashmimic.tasks.motion_tracking.obs_terms.ref_joint_pos_future",
            "unilab.envs.mdp.builtin_sensor", "unilab.envs.mdp.projected_gravity_from_sensor",
            "flashmimic.tasks.motion_tracking.obs_terms.motion_joint_pos",
            "flashmimic.tasks.motion_tracking.obs_terms.motion_joint_vel",
        ]
        require([v["func"] for v in obs["terms"].values()] == expected_funcs, "Observation functions changed.")
        for term in TERMS[1:4]:
            require(obs["terms"][term]["params"]["future_steps"] == FUTURE, "Future frame layout differs.")
        require(obs["terms"]["base_ang_vel_u"]["params"]["sensor_name"] == "torso_gyro", "Gyro changed.")
        require(obs["terms"]["projected_gravity_u"]["params"]["sensor_name"] == "pelvis_upvector", "Gravity sensor changed.")
        action = env["actions"]["joint_pos"]
        require(len(env["actions"]) == 1 and action["scale"] == 2.0 and action["use_default_offset"]
                and action["simulate_action_latency"], "Action scale/offset/latency differs.")
        params = env["commands"]["motion"]["params"]
        require(params["obs_root_body_name"] == "pelvis", "Observation root differs.")
        require(params["joint_default_position_range"] == [0.0, 0.0], "Encoder/default bias must be adapted.")
        require(Path(params["motion_file"]).name == motion_name, f"{job}: checkpoint/motion mismatch.")
        joint_names = env["scene"]["entities"]["robot"]["joint_names"]
        require(joint_names == [model.joint(i).name for i in range(1, model.njnt)], "Joint order differs.")
        terminations = env["terminations"]
        signature = {"simDt": env["sim_dt"], "ctrlDt": env["ctrl_dt"], "actionScale": action["scale"],
                     "defaultJointPosition": model.key_qpos[0, 7:].tolist(), "jointNames": joint_names,
                     "trackedBodyNames": params["body_names"],
                     "anchorZThreshold": terminations["anchor_pos"]["params"]["threshold"],
                     "anchorOrientationThreshold": terminations["anchor_ori"]["params"]["threshold"],
                     "endEffectorZThreshold": terminations["ee_body_pos"]["params"]["threshold"]}
        require(abs(signature["ctrlDt"] - 0.02) < 1e-12 and abs(signature["simDt"] * 3 - 0.02) < 1e-12,
                "Expected 150 Hz physics / 50 Hz control.")
        if common is None:
            common = signature
            manifest.update(signature)
        require(signature == common, "All cards must use the same control profile.")
        tracked_ids = [body_names.index(name) for name in params["body_names"]]
        checkpoints = sorted(run.glob("model_*.pt"), key=lambda p: int(p.stem.split("_")[-1]))
        checkpoint = checkpoints[-1]
        state = torch.load(checkpoint, map_location="cpu", weights_only=True)
        actor = FlashSACActor(num_blocks=algo["algo_params"]["actor_num_blocks"], input_dim=397,
                              hidden_dim=algo["actor_hidden_dim"], action_dim=29, device="cpu")
        actor.load_state_dict(state["actor"], strict=True)
        actor.eval()
        wrapper = actor.as_export_module().eval()
        dest = args.output / job
        dest.mkdir(exist_ok=True)
        onnx_path = dest / "policy.onnx"
        with torch.inference_mode():
            torch.onnx.export(wrapper, (torch.zeros(1, 397),), str(onnx_path), input_names=["obs"],
                              output_names=["action"], opset_version=18, external_data=False, dynamo=True)
        onnx.checker.check_model(str(onnx_path))
        session = ort.InferenceSession(str(onnx_path), providers=["CPUExecutionProvider"])
        require(session.get_inputs()[0].shape == [1, 397] and session.get_outputs()[0].shape == [1, 29], "ONNX shape differs.")
        rng = np.random.default_rng(42)
        max_error = 0.0
        for scale in (0.0, 0.1, 1.0, 10.0):
            for _ in range(8):
                x = (rng.standard_normal((1, 397)) * scale).astype(np.float32)
                with torch.inference_mode():
                    expected = wrapper(torch.from_numpy(x)).numpy()
                actual = session.run(None, {"obs": x})[0]
                max_error = max(max_error, float(np.max(np.abs(expected - actual))))
        require(max_error < 1e-4, f"{job}: ONNX diverges from PyTorch ({max_error}).")
        motion_file = assets / "motions/g1" / motion_name
        with np.load(motion_file) as m:
            require(int(m["fps"].item()) == 50, "Reference motion must have 50 FPS.")
            fields = {
                "jointPosition": m["joint_pos"], "jointVelocity": m["joint_vel"],
                "rootPosition": m["body_pos_w"][:, 1], "rootQuaternion": m["body_quat_w"][:, 1],
                "rootLinearVelocity": m["body_lin_vel_w"][:, 1], "rootAngularVelocity": m["body_ang_vel_w"][:, 1],
                "trackedPosition": m["body_pos_w"][:, tracked_ids], "trackedQuaternion": m["body_quat_w"][:, tracked_ids],
            }
            frames = len(m["joint_pos"])
            offset, layout = 0, {}
            blocks = []
            for name, array in fields.items():
                array = array.reshape(frames, -1)
                layout[name] = {"offset": offset, "width": array.shape[1]}
                offset += array.shape[1]
                blocks.append(array)
            packet = np.concatenate(blocks, axis=1).astype("<f4")
            require(np.isfinite(packet).all(), "Motion contains NaN/Inf.")
            packet.tofile(dest / "motion.bin")
        record = {
            "policy": f"{job}/policy.onnx", "motion": f"{job}/motion.bin", "frames": frames,
            "fps": 50, "stride": offset, "layout": layout,
            "source": {"run": job, "checkpoint": checkpoint.name, "motion": motion_name,
                       "checkpointSha256": sha256(checkpoint), "motionSha256": sha256(motion_file),
                       "configSha256": sha256(config_path), "policySha256": sha256(onnx_path)},
            "validation": {"onnxMaxAbsError": max_error, "onnxTestInputs": 32},
        }
        manifest["demos"][job] = record
        # Website recordings are rendered separately from these exported policies.
        # Do not overwrite no-DR camera-follow videos with training playbacks.
        print(f"{job}: ONNX OK max_error={max_error:.2e}; {frames} motion frames", flush=True)
    (args.output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
