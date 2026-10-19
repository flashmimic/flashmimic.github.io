#!/usr/bin/env python3
"""Build the dark-theme vector teaser for the hero from the paper teaser PDF.

Converts the paper's teaser.pdf with pdftocairo to SVG (text and chart
elements become vector paths; photo panels stay embedded raster), recolors
the light-theme palette onto the site surface (#101828), and recompresses
the opaque embedded photos as JPEG so the hero asset stays small.

Usage: python3 scripts/build-dark-teaser.py [teaser.pdf] [out.svg]
"""
from pathlib import Path
import base64
import io
import re
import subprocess
import sys
import tempfile

PAPER_PDF = Path("/home/user/latex_flashmimic/FlashMimic/Assets/Figures/images/teaser.pdf")
OUT = Path(__file__).resolve().parent.parent / "assets/figures/teaser-overview.svg"

# (r, g, b) 0-255 -> dark-theme hex. Accent colors (red arrows/bars, blue,
# purple, teal, pink, yellow, green) are kept unchanged.
COLORS = {
    (0, 0, 0): "#ffffff",        # text
    (89, 89, 89): "#b9c6d6",     # dark gray axis text
    (132, 151, 176): "#8496ab",  # muted marks
    (227, 231, 237): "#3a4757",  # chart gridlines
    (244, 248, 253): "#101828",  # chart panel / figure background
    (251, 253, 248): "#101828",
    (241, 252, 251): "#101828",
    (255, 255, 255): "#101828",
    (255, 248, 251): "#161d29",  # photo panel chips
    (244, 243, 250): "#161d29",
    (255, 251, 235): "#161d29",
}

RGB_ATTR = re.compile(r'(fill|stroke)="rgb\(([\d.]+)%, ([\d.]+)%, ([\d.]+)%\)"')
PNG_URI = re.compile(r'(<image id="(source-\d+)"[^>]*xlink:href=")data:image/png;base64,([^"]+)"')


def recolor(match):
    attr, r, g, b = match.groups()
    key = (round(float(r) / 100 * 255), round(float(g) / 100 * 255), round(float(b) / 100 * 255))
    return f'{attr}="{COLORS.get(key, f"rgb({r}%, {g}%, {b}%)")}"'


def recompress(svg: str) -> str:
    """Opaque embedded photos -> JPEG; tiny PNGs with real alpha stay PNG.
    Images are downscaled to twice their largest display size (retina)."""
    from PIL import Image
    import numpy as np

    scales = {}
    for m in re.finditer(r'<use xlink:href="#(source-\d+)"([^>]*)>', svg):
        tm = re.search(r'matrix\(([^)]*)\)', m.group(2))
        if tm:
            a = abs(float(tm.group(1).split(",")[0]))
            scales[m.group(1)] = max(scales.get(m.group(1), 0), a)

    def convert(match):
        prefix, src, b64 = match.group(1), match.group(2), match.group(3)
        im = Image.open(io.BytesIO(base64.b64decode(b64)))
        a = np.asarray(im.convert("RGBA")).copy()
        if a[..., 3].min() < 250:
            # Alpha carries the shape. Rasterized chart text is black on
            # transparent; turn it white so it reads on the dark theme.
            opaque = a[a[..., 3] > 30]
            if len(opaque) and opaque[..., :3].mean() < 40:
                a[..., 0] = a[..., 1] = a[..., 2] = 255
                out = io.BytesIO()
                Image.fromarray(a).save(out, "PNG", optimize=True)
                return f'{prefix}data:image/png;base64,{base64.b64encode(out.getvalue()).decode()}"'
            return match.group(0)
        scale = scales.get(src, 1.0)
        need = (int(im.width * scale * 2), int(im.height * scale * 2))
        if need[0] < im.width or need[1] < im.height:
            im = im.resize((max(1, need[0]), max(1, need[1])), Image.LANCZOS)
            a = np.asarray(im.convert("RGBA")).copy()
        rgb = a[..., :3].astype(int)
        lum = rgb.mean(-1)
        sat = (rgb.max(-1) - rgb.min(-1)) / np.maximum(rgb.max(-1), 1)
        black_frac = (lum < 30).mean()
        bright_sat_frac = ((sat > 0.35) & (lum > 80)).mean()
        if black_frac > 0.5 and bright_sat_frac > 0.1:
            # The masked bar-chart panel: black background is hidden by the
            # mask, but its legend/axis text is black too. Whiten dark
            # gray pixels; brighten colored text (colored pixels touching
            # the dark background); the saturated bar interiors stay.
            from PIL import ImageFilter
            a[(lum < 90) & (sat < 0.25), :3] = (232, 238, 245)
            dark = Image.fromarray(((lum < 40) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
            near_dark = np.asarray(dark) > 0
            boost = (sat >= 0.25) & (lum >= 30) & (lum < 170) & near_dark
            a[boost, :3] = np.clip(rgb[boost] * 1.9, 0, 255).astype(np.uint8)
            out = io.BytesIO()
            Image.fromarray(a[..., :3].astype(np.uint8)).save(out, "JPEG", quality=92, optimize=True)
            return f'{prefix}data:image/jpeg;base64,{base64.b64encode(out.getvalue()).decode()}"'
        out = io.BytesIO()
        im.convert("RGB").save(out, "JPEG", quality=84, optimize=True)
        return f'{prefix}data:image/jpeg;base64,{base64.b64encode(out.getvalue()).decode()}"'

    return PNG_URI.sub(convert, svg)


def main() -> None:
    pdf = Path(sys.argv[1]) if len(sys.argv) > 1 else PAPER_PDF
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else OUT
    with tempfile.TemporaryDirectory() as tmp:
        svg_path = Path(tmp) / "teaser.svg"
        subprocess.run(["pdftocairo", "-svg", str(pdf), str(svg_path)], check=True)
        svg = svg_path.read_text()
    svg = RGB_ATTR.sub(recolor, svg)
    svg = recompress(svg)
    out.write_text(svg)
    print(f"wrote {out} ({out.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
