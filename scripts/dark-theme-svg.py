#!/usr/bin/env python3
"""Recolor the paper Fig. 3 SVG for the dark site theme.

The v9 vector figure is drawn for white paper. For the website the figure
sits directly on the dark card surface (as on unilabsim.github.io), so this
script makes the background transparent and moves ink/grid/target/series
colors to dark-theme values. Marker white rings are kept.

Usage: python3 scripts/dark-theme-svg.py assets/figures/time-target-overview.svg
"""
from pathlib import Path
import sys

# Paper color -> site dark-theme color.
COLORS = {
    "#000000": "#ffffff",  # ink: text, axes, ticks, zigzag
    "#e3e3e3": "#36404d",  # horizontal grid
    "#707070": "#9aa7b4",  # target dashed lines
    "#4230bf": "#8b82f2",  # FlashMimic indigo (line, band, marker, label)
    "#24b85e": "#35d07f",  # Holosoma green
    "#3580d5": "#5fa8ef",  # BeyondMimic blue
    "#f0830a": "#f59a2e",  # MJLab orange
    "#2b77cb": "#8fbef2",  # BeyondMimic end label
    "#0a8841": "#4ade96",  # Holosoma end label
    "#b3610b": "#f5a94b",  # MJLab end label
}


def main(path: Path) -> None:
    svg = path.read_text()
    # Transparent figure/axes backgrounds; white marker rings stay untouched.
    svg = svg.replace("fill: #ffffff", "fill: none")
    for old, new in COLORS.items():
        svg = svg.replace(old, new)
    path.write_text(svg)
    print(f"recolored {path}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
