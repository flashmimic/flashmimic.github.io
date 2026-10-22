#!/usr/bin/env python3
"""Compose the tight showcase images from the bordered source grids.

- simulation_motion_tracking.png is a 4x4 grid of 640x480 tiles separated by
  black borders (8 px outer/pair gaps, 2 px inside each reference-policy pair).
  The web version drops every border and packs all 16 tiles tightly, keeping
  the original row-major order (each row: reference | policy | reference |
  policy).
- G1_dance_real_frames.webp / G1_walk_real_frames.webp are 2x2 grids of
  357x637 frames split by 6 px separators. The web strip lays all eight frames
  (dance then walk, reading order) side by side at their native scale.

Usage: python3 scripts/compose-demo-strips.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "assets" / "images"

SIM_SRC = IMAGES / "simulation_motion_tracking.png"
SIM_OUT = IMAGES / "simulation_motion_tracking_compact.webp"
SIM_COLS = [8, 650, 1298, 1940]
SIM_ROWS = [8, 496, 984, 1472]
SIM_TILE = (640, 480)

REAL_SOURCES = ["G1_dance_real_frames.webp", "G1_walk_real_frames.webp"]
REAL_OUT = IMAGES / "G1_real_motion_strip.webp"
REAL_COLS = [0, 363]
REAL_ROWS = [0, 643]
REAL_TILE = (357, 637)


def compose_simulation() -> None:
    src = Image.open(SIM_SRC).convert("RGB")
    tw, th = SIM_TILE
    strip = Image.new("RGB", (tw * len(SIM_COLS), th * len(SIM_ROWS)))
    for row, y in enumerate(SIM_ROWS):
        for col, x in enumerate(SIM_COLS):
            strip.paste(src.crop((x, y, x + tw, y + th)), (col * tw, row * th))
    strip.save(SIM_OUT, "WEBP", quality=92, method=6)
    print(f"{SIM_OUT.name}: {strip.size[0]}x{strip.size[1]}")


def compose_real_strip() -> None:
    tw, th = REAL_TILE
    frames_per_source = len(REAL_ROWS) * len(REAL_COLS)
    strip = Image.new("RGB", (tw * frames_per_source * len(REAL_SOURCES), th))
    offset = 0
    for name in REAL_SOURCES:
        src = Image.open(IMAGES / name).convert("RGB")
        for y in REAL_ROWS:
            for x in REAL_COLS:
                strip.paste(src.crop((x, y, x + tw, y + th)), (offset, 0))
                offset += tw
    strip.save(REAL_OUT, "WEBP", quality=92, method=6)
    print(f"{REAL_OUT.name}: {strip.size[0]}x{strip.size[1]}")


if __name__ == "__main__":
    compose_simulation()
    compose_real_strip()
