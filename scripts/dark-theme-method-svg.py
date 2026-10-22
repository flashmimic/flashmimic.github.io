#!/usr/bin/env python3
"""Recolor the paper method SVG for the dark site theme.

The current editable paper source uses hexadecimal SVG colors and text.
Older PDF-derived figures use `rgb(r%, g%, b%)` attributes and vector glyph
paths. Both forms are supported so the light paper palette can be mapped onto
the site's dark surface (#101828): dark panels, light text, and saturated
accent hues retained.

Usage: python3 scripts/dark-theme-method-svg.py assets/figures/method-architecture.svg
"""
from pathlib import Path
import re
import sys

# Current editable system.svg palette -> dark-theme hex.
HEX_COLORS = {
    "#fcfefe": "#101828",  # task panel background -> site surface
    "#f7fbfe": "#16202e",  # runtime panel background
    "#ffffff": "#1a2436",  # concurrent-execution panel
    "#effaf9": "#12262a",  # task cards
    "#ecf9f7": "#12262a",  # collector container
    "#f7fcfc": "#1a2436",  # collector cards
    "#ecf5ff": "#16202e",  # learner container
    "#f5faff": "#1a2436",  # learner cards
    "#eef4fa": "#141e30",  # CUDA MPS card
    "#fff2dc": "#2a2117",  # overlap cards
    "#fff8ec": "#29221a",
    "#172d48": "#ffffff",  # primary text
    "#597797": "#9fb2c8",  # secondary text
    "#59728f": "#9fb2c8",
    "#00848b": "#3ecbcf",  # collector label
    "#00878d": "#4fc9ca",  # teal arrows and borders
    "#58c1c7": "#4fc9ca",
    "#58bdc6": "#4fc9ca",
    "#95d9dd": "#4fc9ca",
    "#25b7ba": "#3ed6cf",  # concurrent collection bar
    "#147bd1": "#5fa8ef",  # learner label and transitions
    "#559dff": "#7fb3ec",
    "#087fff": "#7fb3ec",
    "#e78810": "#f5a94b",  # actor-update arrows
    "#f7a52a": "#f7b25c",  # overlap bars
    "#c8d7e5": "#3a4757",  # panel borders
    "#8ba2b8": "#8496ab",  # time axis
}

# Older pdftocairo output: (r, g, b) 0-255 -> dark-theme hex.
COLORS = {
    (252, 254, 254): "#101828",  # figure background -> site surface
    (255, 255, 255): "#1a2436",  # white inner cards -> dark panel
    (239, 250, 249): "#12262a",  # pastel teal panels
    (247, 253, 252): "#12262a",
    (237, 249, 247): "#12262a",
    (246, 250, 255): "#16202e",  # pastel blue panels
    (237, 245, 255): "#16202e",
    (239, 244, 249): "#161d29",
    (248, 251, 254): "#141e30",  # GPU runtime container panel
    (255, 242, 219): "#2a2117",  # pastel orange panels
    (255, 245, 229): "#2a2117",
    (255, 248, 235): "#29221a",
    (0, 0, 0): "#ffffff",        # text
    (20, 40, 65): "#ffffff",     # navy headings
    (88, 112, 139): "#9fb2c8",   # secondary text
    (8, 126, 131): "#3ecbcf",    # teal section headers
    (24, 120, 201): "#5fa8ef",   # blue section headers
    (216, 135, 34): "#f5a94b",   # orange accents
    (244, 163, 53): "#f7b25c",   # light orange bars
    (114, 191, 192): "#4fc9ca",  # teal icons
    (108, 186, 188): "#4fc9ca",
    (161, 212, 212): "#6fd8d8",  # side bracket
    (45, 189, 187): "#3ed6cf",   # CUDA MPS bar
    (93, 160, 223): "#7fb3ec",   # blue arrow
    (200, 215, 229): "#3a4757",  # panel borders
    (138, 160, 181): "#8496ab",  # muted marks
}

RGB_ATTR = re.compile(r'(fill|stroke)="rgb\(([\d.]+)%, ([\d.]+)%, ([\d.]+)%\)"')
HEX_ATTR = re.compile(r'(fill|stroke)="(#[0-9a-fA-F]{6})"')


def recolor(match):
    attr, r, g, b = match.group(1), float(match.group(2)), float(match.group(3)), float(match.group(4))
    key = (round(r / 100 * 255), round(g / 100 * 255), round(b / 100 * 255))
    return f'{attr}="{COLORS.get(key, f"rgb({r}%, {g}%, {b}%)")}"'


def recolor_hex(match):
    attr, color = match.group(1), match.group(2).lower()
    return f'{attr}="{HEX_COLORS.get(color, color)}"'


def main(path: Path) -> None:
    svg = path.read_text()
    svg = HEX_ATTR.sub(recolor_hex, svg)
    svg = RGB_ATTR.sub(recolor, svg)
    path.write_text(svg)
    print(f"recolored {path}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
