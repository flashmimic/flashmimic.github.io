"""Render website policy rollouts with a fixed camera offset following root XY.

Uses the exact browser controller to generate states, then MuJoCo 3.11.0 only
for offscreen rendering. No training environment, DR, noise or random resets.
"""
import argparse
import json
import math
import os
from pathlib import Path
import subprocess
import tempfile

os.environ.setdefault("MUJOCO_GL", "egl")
import mujoco
import numpy as np

ROOT = Path(__file__).resolve().parents[1]


def visual_setup(model, width, height):
    model.vis.global_.offwidth = width
    model.vis.global_.offheight = height
    model.vis.global_.fovy = 42
    model.vis.global_.ipd = 0
    model.vis.quality.shadowsize = 2048
    model.vis.headlight.ambient[:] = [.3, .3, .3]
    model.vis.headlight.diffuse[:] = [.7, .7, .7]
    model.vis.rgba.haze[:] = [19 / 255, 32 / 255, 44 / 255, 1]
    if model.nlight:
        model.light_castshadow[0] = True
        model.light_pos[0] = [3, -4, 6]
        model.light_dir[0] = np.array([-3, 4, -6]) / math.sqrt(61)
    floor = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "floor")
    model.geom_matid[floor] = -1
    model.geom_rgba[floor] = [0.145, 0.215, 0.266, 1]
    # Sky pixels only: leave every physical parameter untouched.
    for tex in range(model.ntex):
        if model.tex_type[tex] == mujoco.mjtTexture.mjTEXTURE_SKYBOX:
            start = model.tex_adr[tex]
            count = model.tex_width[tex] * model.tex_height[tex] * model.tex_nchannel[tex]
            pixels = model.tex_data[start:start + count].reshape(-1, model.tex_nchannel[tex])
            pixels[:, :3] = [19, 32, 44]


def add_grid(scene):
    for axis in range(2):
        for line in range(-25, 26):
            geom = scene.geoms[scene.ngeom]
            mujoco.mjv_initGeom(geom, mujoco.mjtGeom.mjGEOM_LINE,
                               np.zeros(3), np.zeros(3), np.eye(3).ravel(),
                               np.array([.23, .32, .37, .45], dtype=np.float32))
            a, b = [-25., -25., .001], [25., 25., .001]
            a[axis] = b[axis] = line
            mujoco.mjv_connector(geom, mujoco.mjtGeom.mjGEOM_LINE, 1, a, b)
            scene.ngeom += 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--width", type=int, default=1280)
    parser.add_argument("--height", type=int, default=720)
    parser.add_argument("--output", type=Path, default=ROOT / "assets/videos")
    parser.add_argument("--preview", type=Path, help="Render only one JPEG for visual inspection")
    args = parser.parse_args()
    if mujoco.__version__ != "3.11.0":
        raise RuntimeError("Use the FlashMimic Python environment with MuJoCo 3.11.0")
    config = json.loads((ROOT / "assets/sim/manifest.json").read_text())
    model = mujoco.MjModel.from_xml_path(str(ROOT / "assets/sim" / config["scene"]))
    visual_setup(model, args.width, args.height)
    data = mujoco.MjData(model)
    camera = mujoco.MjvCamera()
    camera.distance = math.sqrt(2.4**2 + 2.9**2 + 1**2)
    camera.azimuth = math.degrees(math.atan2(-2.9, 2.4)) + 180
    camera.elevation = -math.degrees(math.atan2(1, math.hypot(2.4, 2.9)))
    option = mujoco.MjvOption()
    option.geomgroup[:] = 0
    option.geomgroup[0] = option.geomgroup[2] = 1
    option.sitegroup[:] = 0
    renderer = mujoco.Renderer(model, height=args.height, width=args.width)
    args.output.mkdir(parents=True, exist_ok=True)
    try:
        with tempfile.TemporaryDirectory(prefix="flashmimic-recordings-") as tmp:
            subprocess.run(["node", str(ROOT / "scripts/export-recording-states.mjs"), tmp], check=True)
            metadata = json.loads((Path(tmp) / "recordings.json").read_text())
            for id, spec in metadata["demos"].items():
                states = np.fromfile(Path(tmp) / f"{id}.f64", dtype="<f8").reshape(spec["frames"], spec["stride"])
                destination = args.output / f"{id}.mp4"
                pending = args.output / f".{id}.rendering.mp4"
                encoder = None
                if not args.preview:
                    encoder = subprocess.Popen([
                        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                        "-f", "rawvideo", "-pixel_format", "rgb24", "-video_size", f"{args.width}x{args.height}",
                        "-framerate", str(metadata["fps"]), "-i", "pipe:0", "-an",
                        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
                        "-movflags", "+faststart", str(pending)], stdin=subprocess.PIPE)
                try:
                    for frame, state in enumerate(states):
                        data.qpos[:] = state[:model.nq]
                        data.qvel[:] = state[model.nq:]
                        data.time = frame / metadata["fps"]
                        mujoco.mj_forward(model, data)
                        camera.lookat[:] = [data.qpos[0], data.qpos[1], .65]
                        renderer.update_scene(data, camera=camera, scene_option=option)
                        add_grid(renderer.scene)
                        pixels = renderer.render()
                        if args.preview:
                            from PIL import Image
                            Image.fromarray(pixels).save(args.preview)
                            return
                        encoder.stdin.write(pixels.tobytes())
                        if frame % 100 == 0:
                            print(f"{id}: rendered {frame}/{len(states)}", flush=True)
                    encoder.stdin.close()
                    if encoder.wait() != 0:
                        raise RuntimeError(f"ffmpeg failed: {id}")
                    pending.replace(destination)
                finally:
                    if encoder and encoder.poll() is None:
                        encoder.stdin.close()
                        encoder.terminate()
                        encoder.wait()
                print(f"{id}: saved {destination}", flush=True)
            metadata["rendering"] = {"width": args.width, "height": args.height,
                "codec": "H.264", "camera": "root XY follow; fixed world Z and heading",
                "cameraOffset": [2.4, -2.9, 1.65], "targetZ": .65, "fovy": 42,
                "renderer": "MuJoCo offscreen (visual changes only)"}
            (ROOT / "docs/recordings-2026-10-14.json").write_text(json.dumps(metadata, indent=2) + "\n")
    finally:
        renderer.close()


if __name__ == "__main__":
    main()
