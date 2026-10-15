/* 后续补素材主要修改这个文件。空路径保留占位；相对路径以网站根目录为基准。 */
window.FLASHMIMIC_CONTENT = {
  defaultLanguage: "en",
  links: {
    "github": "https://github.com/Motphys/FlashMimic",
    "paper": "",
    "docs": "#materials"
  },
  hero: {
    "subtitle": {
      "en": "Whole-body motion tracking with FlashSAC.",
      "zh": "基于 FlashSAC 的全身动作跟踪。"
    },
    "description": {
      "en": "A G1 motion-tracking framework built on UniLab, with off-policy learning and overlapping collection and optimization on a shared GPU. Explore the system, five-motion evaluations, and live robot demonstrations.",
      "zh": "基于 UniLab 的 G1 动作跟踪框架，通过离策略学习，在共享 GPU 上重叠执行数据采集与策略优化。了解系统架构、五动作评测，并体验实时机器人演示。"
    },
    "video": "",
    "poster": "assets/images/teaser-20261015.webp",
    "pdf": "assets/downloads/teaser-20261015.pdf",
    "width": 2200,
    "height": 839,
    "alt": {
      "en": "FlashMimic overview: five simulation motions, G1 dance and walking demonstrations, and dance training efficiency comparisons",
      "zh": "FlashMimic 概览：五个仿真动作、G1 舞蹈与行走演示，以及舞蹈训练效率对比"
    },
    "caption": {
      "en": "FlashMimic overview · Simulation, G1 demonstrations, and dance training efficiency",
      "zh": "FlashMimic 项目概览 · 仿真、G1 演示与舞蹈训练效率"
    }
  },
  stats: [
    {
      "value": "5 / 5",
      "label": {
        "en": "Evaluation motions completed",
        "zh": "评测动作完成数"
      },
      "note": {
        "en": "17.5k checkpoints · one deterministic run/task",
        "zh": "17.5k 权重 · 每动作一次确定性回放"
      }
    },
    {
      "value": "8.68 min",
      "label": {
        "en": "Mean checkpoint budget",
        "zh": "平均评测权重训练预算"
      },
      "note": {
        "en": "RTX 4090 logs · writer to 17.5k",
        "zh": "RTX 4090 日志 · writer 建立至 17.5k"
      }
    },
    {
      "value": "4",
      "label": {
        "en": "Repositories compared",
        "zh": "对比仓库"
      },
      "note": {
        "en": "BeyondMimic · MJLab · Holosoma · FlashMimic",
        "zh": "BeyondMimic · MJLab · Holosoma · FlashMimic"
      }
    },
    {
      "value": "29",
      "label": {
        "en": "Actuated joints",
        "zh": "驱动关节"
      },
      "note": {
        "en": "Unitree G1 · 50 Hz policy control",
        "zh": "Unitree G1 · 50 Hz 策略控制"
      }
    }
  ],
  highlights: [
    {
      "title": {
        "en": "Off-policy motion learning",
        "zh": "离策略动作学习"
      },
      "text": {
        "en": "Reference motion windows, proprioceptive state, tracking rewards, and randomized training resets feed FlashSAC. Device replay enables experience reuse across policy updates.",
        "zh": "参考动作窗口、本体状态、跟踪奖励与随机化训练重置共同驱动 FlashSAC，通过设备端 replay 在策略更新间复用经验。"
      }
    },
    {
      "title": {
        "en": "Collection meets optimization",
        "zh": "采集与优化协同运行"
      },
      "text": {
        "en": "MJWarp physics graphs and selective resets support the collector. Compiled objectives and graph execution drive learner updates, with CUDA MPS overlapping work on one shared GPU.",
        "zh": "采集端使用 MJWarp 物理图与选择性重置；学习端使用编译目标函数与图执行，通过 CUDA MPS 在同一块 GPU 上重叠调度。"
      }
    },
    {
      "title": {
        "en": "Evidence you can inspect",
        "zh": "可查阅的实验依据"
      },
      "text": {
        "en": "Compare checkpoint-level curves across four repositories and read measured five-task metrics with explicit success sets and timing sources. Try five browser policies and two real-robot videos.",
        "zh": "查看四仓库的逐权重训练曲线，以及注明成功动作集合、计时来源的五任务实测指标；体验五个浏览器策略与两段真机视频。"
      }
    }
  ],
  method: {
    "image": "assets/figures/system-framework-20261015.svg",
    "pdf": "assets/downloads/system-framework-20261015.pdf",
    "width": 2200,
    "height": 1279,
    "alt": {
      "en": "FlashMimic architecture: learning pipeline, collector and learner runtime, and CUDA MPS scheduling on a shared GPU.",
      "zh": "FlashMimic 系统框架：学习流程、采集与学习运行时，以及共享 GPU 上的 CUDA MPS 调度。"
    },
    "caption": {
      "en": "From motion reference to off-policy updates. The collector and learner exchange observations, actions, and transitions; CUDA MPS overlaps physics and optimization on one shared GPU.",
      "zh": "从参考动作到离策略更新：采集端与学习端交换观测、动作和转移数据，CUDA MPS 在共享 GPU 上重叠执行物理仿真与优化。"
    }
  },
  results: [],
  comparison: [
    {
      "name": "BeyondMimic (PPO)",
      "values": [
        "80% (4/5)",
        "54.16",
        "0.1155",
        "42.23",
        "0.1478",
        "144.97 D",
        {
          "en": "Dance · Walk · Run · Carry (n = 4)",
          "zh": "舞蹈 · 行走 · 跑步 · 搬箱（n = 4）"
        }
      ],
      "ours": false
    },
    {
      "name": "MJLab (PPO)",
      "values": [
        "100% (5/5)",
        "56.24",
        "0.1282",
        "48.15",
        "0.1548",
        "178.20 E/P",
        {
          "en": "All five (n = 5)",
          "zh": "全部五动作（n = 5）"
        }
      ],
      "ours": false
    },
    {
      "name": "Holosoma (FastSAC)",
      "values": [
        "60% (3/5)",
        "113.77",
        "0.1731",
        "61.70",
        "0.2212",
        "65.14 E/P",
        {
          "en": "Dance · Walk · Run (n = 3)",
          "zh": "舞蹈 · 行走 · 跑步（n = 3）"
        }
      ],
      "ours": false
    },
    {
      "name": {
        "en": "FlashMimic / FlashSAC (17.5k)",
        "zh": "FlashMimic / FlashSAC（17.5k）"
      },
      "values": [
        "100% (5/5)",
        "60.28",
        "0.1713",
        "61.09",
        "0.2218",
        "8.68 D",
        {
          "en": "All five (n = 5)",
          "zh": "全部五动作（n = 5）"
        }
      ],
      "ours": true
    }
  ],
  curves: [
    {
      "id": "dance",
      "title": {
        "en": "Dance",
        "zh": "舞蹈"
      },
      "image": "assets/figures/curves-dance.svg",
      "note": {
        "en": "Dance uses the 17.5k FlashMimic checkpoint as the three-metric target. Hollow endpoints for other methods are interpolated threshold crossings where available.",
        "zh": "舞蹈以 FlashMimic 17.5k 权重的三个指标作为目标；其他方法可达阈值处的空心端点为插值估计。"
      }
    },
    {
      "id": "walk",
      "title": {
        "en": "Walk",
        "zh": "行走"
      },
      "image": "assets/figures/curves-walk.svg",
      "note": {
        "en": "Full available checkpoint curves; no shared-accuracy cutoff. FlashMimic extends to checkpoint 70k.",
        "zh": "展示全部可用权重曲线，不按共同精度截断；FlashMimic 延伸至 70k 权重。"
      }
    },
    {
      "id": "run",
      "title": {
        "en": "Run",
        "zh": "跑步"
      },
      "image": "assets/figures/curves-run.svg",
      "note": {
        "en": "Full available checkpoint curves, including tracking failures and recoveries. FlashMimic extends to checkpoint 97.5k.",
        "zh": "保留全部可用权重点及跟踪失败、恢复波动；FlashMimic 延伸至 97.5k 权重。"
      }
    },
    {
      "id": "flip",
      "title": {
        "en": "Flip",
        "zh": "翻转"
      },
      "image": "assets/figures/curves-flip.svg",
      "note": {
        "en": "Full curves; MJLab includes the updated 56-checkpoint evaluation. FlashMimic extends to checkpoint 67.5k.",
        "zh": "展示完整曲线；MJLab 使用更新后的 56 权重点评估，FlashMimic 延伸至 67.5k 权重。"
      }
    },
    {
      "id": "carry",
      "title": {
        "en": "Box carry",
        "zh": "搬箱"
      },
      "image": "assets/figures/curves-carry.svg",
      "note": {
        "en": "The source figure labels this task “Box carrying” (box); the precision report calls it carry. FlashMimic extends to checkpoint 80k.",
        "zh": "原始曲线中的 Box carrying（box）对应精度报告中的 carry；FlashMimic 延伸至 80k 权重。"
      }
    }
  ],
  comparisonColumns: [
    {
      "en": "Method",
      "zh": "方法"
    },
    {
      "en": "Completed ↑",
      "zh": "完成 ↑"
    },
    {
      "en": "Torso pos. ↓\nmm",
      "zh": "Torso 位置 ↓\nmm"
    },
    {
      "en": "Body ori. ↓\nrad",
      "zh": "身体姿态 ↓\nrad"
    },
    {
      "en": "EE pos. ↓\nmm",
      "zh": "末端位置 ↓\nmm"
    },
    {
      "en": "EE ori. ↓\nrad",
      "zh": "末端姿态 ↓\nrad"
    },
    {
      "en": "Budget ↓\nmin · T₄₀₉₀",
      "zh": "训练预算 ↓\nmin · T₄₀₉₀"
    },
    {
      "en": "Averaged tasks",
      "zh": "均值参与动作"
    }
  ],
  evaluationNotes: [
    {
      "title": {
        "en": "One rollout per selected checkpoint",
        "zh": "每个所选权重一次回放"
      },
      "text": {
        "en": "Dance, walk, run, flip, and carry. Deterministic evaluation with DR, observation noise, random initial perturbations, and external pushes disabled; fixed control delay retained. Completion is a tracking criterion, not a multi-seed success probability.",
        "zh": "任务为舞蹈、行走、跑步、翻转与搬箱。确定性评测关闭 DR、观测噪声、随机初始扰动和外部推力，保留固定控制延迟。完成标记是跟踪判据，不代表多随机种子成功概率。"
      }
    },
    {
      "title": {
        "en": "Geometry and aggregation",
        "zh": "几何指标与汇总方式"
      },
      "text": {
        "en": "Torso position is world-space XYZ error. Local metrics align torso translation and relative yaw over 14 body links; orientation uses quaternion geodesic angles. EE includes both ankles and both wrists. Errors and budgets are action-equal means over each method’s successful tasks only. Native simulation backends and checkpoint-selection rules differ.",
        "zh": "Torso 位置为世界坐标 XYZ 误差。局部指标对齐 torso 平移及相对 yaw，姿态使用四元数测地角；身体集合含 14 个 link，末端含双踝与双腕。误差和预算仅在各方法成功动作上等权平均；原生仿真后端和权重选点规则存在差异。"
      }
    },
    {
      "title": {
        "en": "Read time with its source",
        "zh": "结合来源解读时间"
      },
      "text": {
        "en": "T₄₀₉₀ runs from the first TensorBoard writer to the selected checkpoint, excluding earlier startup. D: direct RTX 4090 logs; E: same-motion hardware conversion; P: cross-motion estimate. E/P denotes mixed sources. These budgets do not establish an equal-accuracy speedup.",
        "zh": "T₄₀₉₀ 从首次 TensorBoard writer 建立计至所选权重，排除此前启动时间。D：4090 直接日志；E：同动作硬件折算；P：跨动作估计；E/P 表示混合来源。这些预算不能直接用于宣称等精度加速比。"
      }
    }
  ],
  materials: [
    {
      "title": {
        "en": "System framework",
        "zh": "系统框架"
      },
      "description": {
        "en": "Original architecture diagram covering learning, runtime, and GPU scheduling.",
        "zh": "学习流程、运行时与 GPU 调度的原始系统框架图。"
      },
      "links": [
        {
          "label": "SVG",
          "url": "assets/figures/system-framework-20261015.svg"
        },
        {
          "label": "PDF",
          "url": "assets/downloads/system-framework-20261015.pdf"
        }
      ]
    },
    {
      "title": {
        "en": "Five-action comparison",
        "zh": "五动作四仓库对比"
      },
      "description": {
        "en": "Original full figure: RMSE, MPJPE, and PCK@50 mm for all five actions.",
        "zh": "原始完整主图：五动作的 RMSE、MPJPE 与 PCK@50 mm。"
      },
      "links": [
        {
          "label": "SVG",
          "url": "assets/figures/five-actions-overview.svg"
        },
        {
          "label": "PDF",
          "url": "assets/downloads/five-actions-overview.pdf"
        }
      ]
    },
    {
      "title": {
        "en": "Measured metrics",
        "zh": "实测指标"
      },
      "description": {
        "en": "Four measured method rows, recomputed from unrounded checkpoint records; includes the success sets and timing sources.",
        "zh": "从未取整的权重记录重算四行实测结果，附成功动作集合与计时来源。"
      },
      "links": [
        {
          "label": "CSV",
          "url": "assets/data/five-action-measured-summary.csv"
        },
        {
          "label": "JSON",
          "url": "assets/data/five-action-measured-summary.json"
        }
      ]
    },
    {
      "title": {
        "en": "Plotting & audit materials",
        "zh": "绘图与指标审阅材料"
      },
      "description": {
        "en": "Original plotted points, provenance, metric and plotting code, checkpoint hashes, and source report. Lightweight subset; excludes weights, trajectories, and a runnable environment.",
        "zh": "原始绘图点、来源、指标与绘图代码、权重哈希及原始报告的轻量子集；不含权重、轨迹和可运行环境。"
      },
      "links": [
        {
          "label": {
            "en": "Data ZIP · 101 KB",
            "zh": "数据 ZIP · 101 KB"
          },
          "url": "assets/downloads/research-data-20261015.zip"
        }
      ]
    }
  ],
  demos: [
    { id: "G1_dance_real", category: "real", type: "video", title: { en: "G1 · Real-world Dance", zh: "G1 · 真机舞蹈" }, description: { en: "Dance motion tracking on the physical G1 robot.", zh: "G1 机器人上的真机舞蹈动作跟踪。" }, src: "assets/videos/G1_dance_real.mp4", poster: "assets/images/G1_dance_real.webp" },
    { id: "G1_walk_real", category: "real", type: "video", title: { en: "G1 · Real-world Walk", zh: "G1 · 真机行走" }, description: { en: "Walking motion tracking on the physical G1 robot.", zh: "G1 机器人上的真机行走动作跟踪。" }, src: "assets/videos/G1_walk_real.mp4", poster: "assets/images/G1_walk_real.webp" },
    { id: "G01_dance", type: "interactive", title: { en: "G1 · Dance", zh: "G1 · 舞蹈" }, description: { en: "Coordinated full-body dance motion tracking.", zh: "协调全身关节，跟踪舞蹈参考动作。" }, poster: "assets/images/G01_dance.jpg", recording: "assets/videos/G01_dance.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G02_flip", type: "interactive", title: { en: "G1 · Flip", zh: "G1 · 翻转" }, description: { en: "A dynamic 360° flip reference motion.", zh: "跟踪动态 360° 翻转参考动作。" }, poster: "assets/images/G02_flip.jpg", recording: "assets/videos/G02_flip.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G03_run", type: "interactive", title: { en: "G1 · Run", zh: "G1 · 跑步" }, description: { en: "Whole-body coordination for a running gait.", zh: "通过全身协调，跟踪跑步步态。" }, poster: "assets/images/G03_run.jpg", recording: "assets/videos/G03_run.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G04_sprint", type: "interactive", title: { en: "G1 · Sprint", zh: "G1 · 冲刺" }, description: { en: "Track a fast-paced sprinting reference.", zh: "跟踪快节奏的冲刺参考动作。" }, poster: "assets/images/G04_sprint.jpg", recording: "assets/videos/G04_sprint.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G05_walk", type: "interactive", title: { en: "G1 · Walk", zh: "G1 · 行走" }, description: { en: "Track the reference walking motion.", zh: "跟踪参考行走动作。" }, poster: "assets/images/G05_walk.jpg", recording: "assets/videos/G05_walk.mp4?v=nodr-follow-motphys-20261015" }
  ],
  news: [
    {
      "date": "2026-10-15",
      "text": {
        "en": "System framework, five-action/four-repository curves, measured evaluation metrics, and lightweight audit materials are now available.",
        "zh": "更新系统框架、五动作四仓库曲线、实测精度指标与轻量审阅材料。"
      }
    },
    {
      "date": "2026-10-10",
      "text": {
        "en": "The FlashMimic project website is online. More details coming soon.",
        "zh": "FlashMimic 项目主页已上线，更多内容即将公布。"
      }
    }
  ],
  authors: [], // 例：[{ name: "姓名", affiliation: "单位", url: "https://..." }]
  affiliations: [], // 例：[{ name: "单位名称", logo: "assets/logos/institution.svg", url: "https://..." }]
  citation: "", // 粘贴真实 BibTeX，支持反引号包裹的多行字符串；为空时不可复制
  // 页面固定文案与区块标题也集中在这里。
  ui: {
    viewOriginalPdf: { en: "View original PDF ↗", zh: "查看原始 PDF ↗" },
    demoScope: {"en": "Browser policies: dance, flip, run, sprint, and walk (existing model60000 exports). The evaluation above includes carry instead of sprint and uses different checkpoints. Browser playback disables DR and observation noise; Push robot applies a user-triggered disturbance.", "zh": "浏览器策略为舞蹈、翻转、跑步、冲刺与行走，沿用现有 model60000 导出；上方评测以搬箱替代冲刺，所用权重也不同。浏览器运行关闭 DR 和观测噪声，推力扰动由用户主动触发。"},
    materialsNote: {"en": "The data ZIP is a plotting and audit subset, not a full reproduction environment. Large original archives containing weights, trajectories, and training logs are not hosted here.", "zh": "数据 ZIP 是绘图与审阅子集，不是完整复现环境；包含权重、轨迹和训练日志的大型原始归档暂未在此托管。"},
    materialsDescription: {"en": "Download the figures and a compact set of plotted data and metric evidence, dated October 15, 2026.", "zh": "下载 2026 年 10 月 15 日版图表，以及绘图数据与指标证据的轻量材料。"},
    materialsTitle: {"en": "Figures, data, and definitions.", "zh": "图表、数据与计算口径。"},
    materialsLabel: {"en": "04 / MATERIALS", "zh": "04 / 数据材料"},
    originalReport: {"en": "Original report · Markdown", "zh": "原始报告 · Markdown"},
    originalTableAlt: {"en": "Original five-action average reference table, including a manually adjusted extended-dance reference row.", "zh": "原始五动作平均参考表，包含手动调整 dance 数据的扩展参考行。"},
    originalTimingNote: {"en": "The supplied extended-row budget is displayed as D in the figure, but includes reconstructed E timings for walk/run/flip/carry. The source report also describes a different network/reward configuration for extended dance.", "zh": "原图将扩展行总预算标为 D，但 walk/run/flip/carry 实际包含续训重建 E 计时；原报告也注明扩展 dance 使用了不同网络／奖励配置。"},
    originalWarning: {"en": "Source note: the extended FlashSAC dance errors are manually adjusted, not measured errors of model_45000.pt; the fifth-row averages include that adjustment. Its success and time come from the reference run and do not measure time to the adjusted accuracy. The measured main table above excludes this row.", "zh": "来源说明：扩展 FlashSAC 的 dance 误差为手动调整值，并非 model_45000.pt 实测误差，第五行均值包含该调整。其完成标记和时间来自参考运行，不代表达到调整后精度的实测时间。上方实测主表不纳入该行。"},
    originalSummary: {"en": "Original supplied precision table & report (adjusted reference included)", "zh": "原始精度表与报告（含调整参考数据）"},
    protocolDifference: {"en": "The curve figure uses 13 links and post-integration states; this precision table uses 14 links including torso and pre-action states. Their numeric values are not interchangeable.", "zh": "曲线使用 13 个 link 与积分后状态；精度表使用包含 torso 的 14 个 link 与执行动作前状态，两者数值不能混用。"},
    successCriterion: {"en": "A rollout fails if any frame has aligned 14-link mean position error > 0.5 m, reference-minus-actual torso height > 0.5 m, or nonfinite position/orientation errors. No separate torso-angle failure threshold is used.", "zh": "任一帧的对齐后 14-link 平均位置误差 > 0.5 m、参考 torso 高度减实际高度 > 0.5 m，或位置／姿态误差非有限即失败；未另设 torso 姿态角失败阈值。"},
    protocolSummary: {"en": "Evaluation protocol & metric definitions", "zh": "评测条件与指标定义"},
    precisionScrollHint: {"en": "Scroll horizontally to view all metrics →", "zh": "横向滚动查看全部指标 →"},
    precisionIntro: {"en": "Success uses all five tasks. Errors and budgets average successful tasks only, with the actual task sets shown in the last column. FlashMimic is labeled UniLab/FlashSAC in the source report.", "zh": "完成比例以全部五任务为分母；误差和预算仅对成功动作等权平均，实际参与集合见末列。原报告将 FlashMimic 标为 UniLab/FlashSAC。"},
    precisionTitle: {"en": "Five-task checkpoint evaluation", "zh": "五任务权重精度评测"},
    downloadPdf: {"en": "Download PDF", "zh": "下载 PDF"},
    openSvg: {"en": "Open full-size SVG ↗", "zh": "查看完整 SVG ↗"},
    overviewSummary: {"en": "View the complete five-action figure", "zh": "展开五动作完整主图"},
    curveScrollHint: {"en": "On small screens, scroll the chart horizontally to read all three metrics.", "zh": "小屏可横向滚动图表，查看三个指标。"},
    curveCommonNote: {"en": "Curves connect evaluated checkpoints without smoothing. Metrics use 13 non-torso links, torso translation / relative-yaw alignment, and post-integration states. PCK@50 is the fraction of body-link samples within 50 mm, not task completion. Time is source logged time; Holosoma† GPU is unverified.", "zh": "曲线连接真实评估权重点，不做平滑。使用 13 个非 torso link，逐帧对齐 torso 平移与相对 yaw，采样积分后状态。PCK@50 是误差不超过 50 mm 的 link 样本比例，不是动作完成率。横轴为源日志计时；Holosoma† 的 GPU 未核验。"},
    curveAlt: {"en": "{action}: body position RMSE, body point MPJPE, and PCK@50 mm versus logged training time.", "zh": "{action}：身体位置 RMSE、身体点 MPJPE、PCK@50 mm 随训练日志时间的变化。"},
    curvesLegend: {"en": "Methods compared", "zh": "对比方法"},
    curvesSubtitle: {"en": "Five actions / Four repositories", "zh": "五动作 / 四仓库"},
    curvesTitle: {"en": "Tracking quality over training time", "zh": "随训练时间变化的跟踪质量"},
    methodDownload: {"en": "Open original framework ↗", "zh": "查看原始框架图 ↗"},
    navMaterials: {"en": "Materials", "zh": "材料"},
    realWorldTitle: { en: "On the real robot", zh: "真机演示" },
    simulationTitle: { en: "In simulation", zh: "仿真演示" },
    mediaTitle: { en: "More demonstrations", zh: "更多演示" },
    realVideoType: { en: "REAL ROBOT / G1", zh: "真机视频 / G1" },
    filterInteractive: { en: "Interactive", zh: "交互仿真" },
    interactiveType: { en: "INTERACTIVE / G1", zh: "交互仿真 / G1" },
    launchSim: { en: "Run simulation", zh: "运行仿真" },
    watchRecording: { en: "Watch recording ↗", zh: "观看录制视频 ↗" },
    loadingEngine: { en: "Loading physics engine…", zh: "正在加载物理引擎…" },
    loadingRobot: { en: "Loading G1 robot…", zh: "正在加载 G1 机器人…" },
    loadingPolicy: { en: "Loading motion & policy…", zh: "正在加载动作与策略…" },
    simLive: { en: "● Live policy simulation", zh: "● 策略实时仿真" },
    simPaused: { en: "Paused", zh: "已暂停" },
    simError: { en: "Simulation could not run. Retry or watch the recording below. See the console for details.", zh: "仿真运行失败，请重试或观看下方录制视频。详细信息见控制台。" },
    pauseSim: { en: "Pause", zh: "暂停" }, resumeSim: { en: "Resume", zh: "继续" },
    resetSim: { en: "Reset", zh: "重置" }, retrySim: { en: "Retry", zh: "重试" },
    pushSim: { en: "Push robot", zh: "施加扰动" },
    cameraFollow: { en: "Camera: Follow", zh: "镜头：跟随" },
    cameraFree: { en: "Camera: Free", zh: "镜头：自由" },
    cameraFreeHint: { en: "Switch to a free camera", zh: "切换到自由镜头" },
    cameraFollowHint: { en: "Follow and center the robot", zh: "跟随并居中机器人" },
    simHint: { en: "Drag to orbit · Scroll / pinch to zoom · Resets at clip end or tracking failure", zh: "拖动旋转 · 滚轮 / 双指缩放 · 动作结束或跟踪失败后自动重置" },
    noDemos: { en: "No demonstrations in this category yet.", zh: "该分类暂无展示。" },
    skip: { en: "Skip to content", zh: "跳转到正文" },
    navHighlights: { en: "Highlights", zh: "亮点" }, navMethod: { en: "Method", zh: "方法" }, navResults: { en: "Results", zh: "结果" }, navDemos: { en: "Demos", zh: "演示" }, navAuthors: { en: "Authors", zh: "作者" },
    projectLabel: { en: "RESEARCH PROJECT", zh: "研究项目" }, projectStatus: {"en": "Framework & results available", "zh": "框架与实验结果已更新"},
    exploreDemos: { en: "Explore demos", zh: "浏览演示" }, paper: { en: "Paper", zh: "论文" }, docs: {"en": "Materials", "zh": "数据材料"}, soon: { en: "Soon", zh: "待发布" },
    overview: { en: "OVERVIEW", zh: "项目概览" }, videoPending: { en: "VIDEO COMING SOON", zh: "演示视频待补充" }, teaserTitle: { en: "A first look at FlashMimic", zh: "初识 FlashMimic" }, teaserNote: { en: "Project film · Coming soon", zh: "项目视频 · 即将上线" }, teaserAccessible: { en: "Decorative motion illustration. The project video will be added later.", zh: "动作示意占位图，项目视频将在后续补充。" },
    contributionsLabel: { en: "01 / CONTRIBUTIONS", zh: "01 / 研究贡献" }, highlightsTitle: { en: "The ideas behind FlashMimic.", zh: "FlashMimic 背后的思考。" }, highlightsDescription: {"en": "Off-policy experience reuse, a shared-GPU runtime, and motion-tracking evidence.", "zh": "离策略经验复用、共享 GPU 运行时，以及动作跟踪评测依据。"},
    methodLabel: { en: "02 / METHOD", zh: "02 / 技术方法" }, methodTitle: { en: "Inside the framework.", zh: "走进方法框架。" }, methodDescription: {"en": "A learning pipeline backed by a collector–learner runtime, with physics and optimization sharing one GPU.", "zh": "以采集—学习运行时支撑动作学习，在一块 GPU 上协同调度物理仿真与优化。"}, methodFigure: { en: "Framework overview", zh: "方法框架概览" }, figurePending: { en: "Figure coming soon", zh: "图示待补充" }, input: { en: "Input", zh: "输入" }, output: { en: "Output", zh: "输出" }, methodCaption: { en: "Illustrative layout placeholder. The final architecture figure and caption will be added here.", zh: "当前为排版示意占位，正式架构图与图注将在这里补充。" },
    methodNoteOne: {"en": "Collector: physics, references, and managers", "zh": "采集端：物理、参考动作与管理器"}, methodNoteOneText: {"en": "MJWarp physics graphs and selective resets handle simulation. A scene read plan caches reference transforms, while action, observation, and reward managers organize each transition.", "zh": "MJWarp 物理图与选择性重置负责仿真；场景读取计划缓存参考变换，由动作、观测和奖励管理器组织每次转移。"}, methodNoteTwo: {"en": "Learner: replay, compiled updates, and inference", "zh": "学习端：replay、编译更新与推理"}, methodNoteTwoText: {"en": "Bounded ingress feeds a device replay buffer. FlashSAC updates use compiled objectives and graph execution, while an in-place actor runs inference between updates. CUDA MPS overlaps collection and optimization.", "zh": "通过有界入口向设备端 replay buffer 写入数据；FlashSAC 使用编译目标函数与图执行完成更新，原位 actor 在更新间推理，CUDA MPS 重叠调度采集与优化。"},
    resultsLabel: { en: "03 / EVALUATION", zh: "03 / 实验评估" }, resultsTitle: { en: "Results, at a glance.", zh: "实验结果，一目了然。" }, resultsDescription: {"en": "Five evaluation tasks: dance, walk, run, flip, and box carry. Curves and checkpoint-level precision use separate measurement protocols, documented below.", "zh": "五个评测任务：舞蹈、行走、跑步、翻转与搬箱。训练曲线与权重精度表采用不同测量口径，详见下方说明。"}, dataPending: { en: "Results coming soon", zh: "实验结果待补充" }, comparisonCaption: {"en": "Selected-checkpoint evaluation · measured tracking metrics", "zh": "所选权重评测 · 跟踪指标实测"}, tableMethod: { en: "Method", zh: "方法" }, metricOne: { en: "Metric 01", zh: "指标 01" }, metricTwo: { en: "Metric 02", zh: "指标 02" }, metricThree: { en: "Metric 03", zh: "指标 03" }, tableNote: {"en": "Different success sets, native backends, and checkpoint rules limit direct ranking. The main table excludes the manually adjusted extended-dance reference row.", "zh": "不同成功集合、原生后端与权重选点规则限制了直接排名。此实测主表不纳入含手动调整 dance 数据的扩展参考行。"},
    demosLabel: {"en": "05 / SHOWCASE", "zh": "05 / 项目展示"}, demosTitle: { en: "See FlashMimic in action.", zh: "看看 FlashMimic 的表现。" }, demosDescription: {"en": "Watch two real-world G1 videos and explore five browser policies with 50 Hz control and 150 Hz physics. Drag to orbit, switch Follow/Free camera, pause, reset, or push the robot.", "zh": "观看两段 G1 真机视频，并体验以 50 Hz 控制、150 Hz 物理步进运行的五个浏览器策略。支持旋转视角、跟随／自由镜头、暂停、重置与推力扰动。"}, filterAll: { en: "All", zh: "全部" }, filterVideos: { en: "Videos", zh: "视频" }, filterImages: { en: "Visualizations", zh: "可视化" }, galleryCount: { en: "{count} items", zh: "{count} 项展示" }, demoPending: { en: "COMING SOON", zh: "即将上线" }, videoType: { en: "VIDEO", zh: "视频演示" }, imageType: { en: "VISUALIZATION", zh: "可视化" }, openDemo: { en: "Open demo ↗", zh: "打开演示 ↗" },
    newsLabel: { en: "LATEST", zh: "最新动态" }, newsTitle: { en: "Project updates.", zh: "项目动态。" }, citationLabel: { en: "REFERENCE", zh: "引用信息" }, citationDescription: { en: "Citation information will be available when the paper is released.", zh: "论文发布后将在这里提供引用信息。" }, citationPending: { en: "Coming soon", zh: "待发布" }, citationPlaceholder: { en: "% FlashMimic\n% Citation will be added with the paper release.", zh: "% FlashMimic\n% 论文发布后将在这里补充正式引用。" }, copy: { en: "Copy", zh: "复制" }, copied: { en: "Copied", zh: "已复制" }, copyFailed: { en: "Please select and copy the citation below.", zh: "请选中下方引用文本并手动复制。" },
    authorsLabel: { en: "THE TEAM", zh: "研究团队" }, authorsTitle: { en: "People behind the project.", zh: "项目背后的研究者。" }, authorsPending: { en: "Authors and affiliations will be announced soon.", zh: "作者名单与所属单位即将公布。" }, affiliationPending: { en: "Affiliation to be announced", zh: "所属单位待公布" },
    footerTagline: { en: "Research. Motion. Possibility.", zh: "研究 · 动作 · 更多可能" }, backTop: { en: "Back to top ↑", zh: "返回顶部 ↑" }, footerNote: {"en": "Framework & evaluation materials · October 2026", "zh": "框架与评测材料 · 2026 年 10 月"}, menuOpen: { en: "Open navigation", zh: "打开导航" }, menuClose: { en: "Close navigation", zh: "关闭导航" }, mediaError: { en: "Media is unavailable. Please check back later.", zh: "素材暂时无法加载，请稍后再试。" }
  }
};
