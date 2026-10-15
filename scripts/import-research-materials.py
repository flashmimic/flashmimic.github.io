#!/usr/bin/env python3
"""Import the supplied October 15 figures and a small, auditable data subset.

Usage: python3 scripts/import-research-materials.py /path/to/source-materials
The multi-gigabyte input archives remain outside the website repository.
"""
import copy
import csv
import hashlib
import io
import json
from pathlib import Path
import shutil
import sys
import xml.etree.ElementTree as ET
import zipfile

SOURCE = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parents[1]
FIGURES = ROOT / "assets/figures"
DATA = ROOT / "assets/data"
DOWNLOADS = ROOT / "assets/downloads"
for folder in (FIGURES, DATA, DOWNLOADS):
    folder.mkdir(parents=True, exist_ok=True)

copies = {
    "20261015-121207.jpg": FIGURES / "system-framework.jpg",
    "five_actions_four_repositories_overview.svg": FIGURES / "five-actions-overview.svg",
    "five_actions_four_repositories_overview.pdf": DOWNLOADS / "five-actions-overview.pdf",
    "table_five_action_average_metrics.svg": FIGURES / "five-action-reference-table.svg",
    "table_five_action_average_metrics.pdf": DOWNLOADS / "five-action-reference-table.pdf",
    "five_motion_final_report.md": DOWNLOADS / "five-motion-original-report.md",
}
for source, destination in copies.items():
    shutil.copyfile(SOURCE / source, destination)

# Crop vector panels without changing any of the original plotted data.
# Matplotlib distributes shared font definitions among axes: hoist all of them
# before removing other panels, so every cropped row remains self-contained.
ns = "http://www.w3.org/2000/svg"
ET.register_namespace("", ns)
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")
original = ET.parse(FIGURES / "five-actions-overview.svg").getroot()
for index, motion in enumerate(("dance", "walk", "run", "flip", "carry")):
    image = copy.deepcopy(original)
    definitions = ET.Element(f"{{{ns}}}defs")
    for parent in list(image.iter()):
        for child in list(parent):
            if child.tag == f"{{{ns}}}defs":
                definitions.extend(copy.deepcopy(list(child)))
                parent.remove(child)
    image.insert(0, definitions)
    figure = image.find(f"{{{ns}}}g[@id='figure_1']")
    keep = {f"axes_{index * 3 + offset}" for offset in (1, 2, 3)}
    for child in list(figure):
        if child.get("id") not in keep:
            figure.remove(child)
    image.set("viewBox", f"0 {65 + index * 279.7392:.4f} 1368 280")
    image.set("width", "1368")
    image.set("height", "280")
    ET.ElementTree(image).write(FIGURES / f"curves-{motion}.svg", encoding="utf-8", xml_declaration=True)

with zipfile.ZipFile(SOURCE / "fivemotion_evidence_20261015.zip") as evidence:
    prefix = "five_motion_evidence_20261015/"
    records = json.loads(evidence.read(prefix + "SELECTED_CHECKPOINTS.json"))
    methods = ("BeyondMimic (PPO)", "MJLab (PPO)", "Holosoma (FastSAC)", "UniLab/FlashSAC")
    motions = ("dance", "walk", "run", "flip", "carry")
    metric_names = ("Root_Ref_global_anchor_pos_mm", "Body_Ori_r_rad", "EE_Wrist_Pos_r_mm", "EE_Wrist_Ori_r_rad")
    rows = []
    for method in methods:
        selected = [r for r in records if r["method"] == method and r["motion"] in motions]
        assert len(selected) == 5
        successes = [r for r in selected if r["measured_metrics"]["succ_pct"] == 100]
        row = {
            "method": method,
            "success_pct": 100 * len(successes) / 5,
            "success_count": len(successes),
            "task_count": 5,
            "averaged_motions": [r["motion"] for r in successes],
            **{key: sum(r["measured_metrics"][key] for r in successes) / len(successes) for key in metric_names},
            "mean_checkpoint_minutes_4090": sum(r["timing"]["seconds_4090"] for r in successes) / len(successes) / 60,
            "timing_sources": sorted({r["timing"]["status"] for r in successes}),
            "checkpoints": [{"motion": r["motion"], "iteration": r["checkpoint_iteration"], "sha256": r["checkpoint_sha256"]} for r in selected],
        }
        rows.append(row)
    summary = {
        "date": "2026-10-15",
        "source": "fivemotion_evidence_20261015.zip / SELECTED_CHECKPOINTS.json",
        "tasks": list(motions),
        "aggregation": "Action-equal means of successful motions only; success denominator is all five tasks. One deterministic rollout per selected checkpoint; not a multi-seed probability.",
        "time_semantics": "TensorBoard writer creation to selected checkpoint; excludes pre-writer startup. D=direct RTX4090; E=same-motion hardware-rate conversion; P=cross-motion proxy estimate. Not an equal-accuracy speed comparison.",
        "extended_reference_warning": "The supplied original table/report includes manually adjusted extended-dance errors. That row is excluded from this measured summary. Its time and success derive from the reference run, not from achieving adjusted precision.",
        "rows": rows,
    }
    (DATA / "five-action-measured-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    output = io.StringIO()
    columns = ["method", "success_pct", "success_count", "task_count", "averaged_motions", *metric_names, "mean_checkpoint_minutes_4090", "timing_sources"]
    writer = csv.DictWriter(output, fieldnames=columns)
    writer.writeheader()
    for row in rows:
        values = {key: row[key] for key in columns}
        for key in ("averaged_motions", "timing_sources"):
            values[key] = "|".join(values[key])
        writer.writerow(values)
    (DATA / "five-action-measured-summary.csv").write_text(output.getvalue())

    with zipfile.ZipFile(SOURCE / "five_actions_plot_data_20261015.zip") as plots, zipfile.ZipFile(DOWNLOADS / "research-data-20261015.zip", "w", zipfile.ZIP_DEFLATED) as bundle:
        # Explicit small-file selection; never extract arbitrary archive paths.
        for name in plots.namelist():
            include = name.startswith("overview/") and name.endswith((".md", ".json", ".csv"))
            include |= name.startswith("reproduction_code/") and name.endswith((".py", ".md"))
            if include:
                bundle.writestr("plot-data/" + name, plots.read(name))
        for name in ("README.md", "SELECTED_CHECKPOINTS.json", "evidence/motion_tracking_6run/extended_precision/selected_results.json", "evidence/motion_tracking_6run/extended_precision/dance_manual_adjustment_report_data.json", "evidence/motion_tracking_6run/final_unified_metrics/metrics.py"):
            bundle.writestr("precision-evidence/" + name, evidence.read(prefix + name))
        bundle.write(DATA / "five-action-measured-summary.json", "five-action-measured-summary.json")
        bundle.write(DATA / "five-action-measured-summary.csv", "five-action-measured-summary.csv")
        bundle.write(SOURCE / "five_motion_final_report.md", "five-motion-original-report.md")
        bundle.writestr("READ-ME-FIRST.txt", """FlashMimic research data / 2026-10-15

This is a lightweight plotting and metric-audit subset of the supplied archives.
Includes original plotted CSV points, provenance, metric definitions, plotting
scripts, selected checkpoint index (with SHA256), precision metric code, measured
summary, and the original report. Original scripts retain source-machine paths
and require adaptation. Does NOT include weights, trajectories, TensorBoard,
four-repository source code, robot assets, or a runnable evaluation environment.
It is not a standalone full reproduction package.

IMPORTANT: The original precision table/report's extended FlashSAC dance errors
were manually adjusted and are not measured checkpoint errors. Their average
includes the adjustment. The website's main table and measured summary EXCLUDE
that reference row. See the original evidence README, selected_results.json and
dance_manual_adjustment_report_data.json. Do not infer time-to-adjusted-accuracy.

Curve metrics use 13 non-torso links and post-integration states. Precision table
metrics use 14 links including torso and pre-action states; do not mix the two.
Curve x axes are source logged time (Holosoma GPU unverified). Precision budgets
use RTX4090 direct / converted / proxy timings as individually documented.
All main-table errors and time are conditional on each method's successful
motions, with different denominators. Success uses one deterministic run/task.

本包为轻量绘图与指标审阅材料，不含权重、轨迹、完整代码和运行环境。
原始精度参考行含手动调整的 dance 误差，网页实测主表不纳入该行。
完整原始归档保留在材料提供方本地；本包不能独立复现全部实验。
""")

manifest = {"date": "2026-10-15", "source_sha256": {name: hashlib.sha256((SOURCE / name).read_bytes()).hexdigest() for name in copies}, "archive_policy": "Only a lightweight auditable subset is published; full input archives remain external."}
(DATA / "research-materials-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(json.dumps({"measured_rows": rows, "download_bytes": (DOWNLOADS / "research-data-20261015.zip").stat().st_size}, ensure_ascii=False, indent=2))
