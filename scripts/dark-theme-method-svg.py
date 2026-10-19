#!/usr/bin/env python3
"""Recolor the paper architecture SVG (method figure) for the dark site theme.

The figure comes from the paper PDF via pdftocairo: fills/strokes are
`rgb(r%, g%, b%)` attributes, text is vector glyph paths, and the small
icons are embedded PNGs. This script maps the light-theme palette onto the
site's dark surface (#101828), following the dark figure style used on
unilabsim.github.io: dark panels, light text, saturated accent hues kept.

Usage: python3 scripts/dark-theme-method-svg.py assets/figures/method-architecture.svg
"""
from pathlib import Path
import re
import sys

# (r, g, b) 0-255 -> dark-theme hex.
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


def recolor(match):
    attr, r, g, b = match.group(1), float(match.group(2)), float(match.group(3)), float(match.group(4))
    key = (round(r / 100 * 255), round(g / 100 * 255), round(b / 100 * 255))
    return f'{attr}="{COLORS.get(key, f"rgb({r}%, {g}%, {b}%)")}"'


def main(path: Path) -> None:
    svg = path.read_text()
    svg = RGB_ATTR.sub(recolor, svg)
    # Icons are luminance masks over colored fills, so they follow the fill
    # recolor automatically; the embedded PNGs must stay unchanged.
    path.write_text(svg)
    print(f"recolored {path}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
