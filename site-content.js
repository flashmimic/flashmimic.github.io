/* 后续补素材主要修改这个文件。空路径保留占位；相对路径以网站根目录为基准。 */
window.FLASHMIMIC_CONTENT = {
  defaultLanguage: "en",
  links: {
    "github": "https://github.com/Motphys/FlashMimic",
    "paper": ""
  },
  hero: {
    "subtitle": {
      "en": "Learning Humanoid Motion Tracking in Minutes.",
      "zh": "分钟级学习人形机器人动作跟踪。"
    },
    "description": {
      "en": "FlashMimic pairs FlashSAC with concurrent collection and learning on one GPU to train deployable whole-body tracking policies for Unitree G1.",
      "zh": "FlashMimic 将 FlashSAC 与单 GPU 上的采集—学习并发结合，训练可部署的 Unitree G1 全身动作跟踪策略。"
    },
    "video": "",
    "poster": "assets/figures/teaser-overview.svg?v=20261022-paper-teaser",
    "width": 1080,
    "height": 413,
    "alt": {
      "en": "FlashMimic overview: five simulation motions, G1 dance and walking demonstrations, and dance training efficiency comparisons",
      "zh": "FlashMimic 概览：五个仿真动作、G1 舞蹈与行走演示，以及舞蹈训练效率对比"
    },
    "caption": {
      "en": "From simulation to G1 · Learning humanoid motion",
      "zh": "从仿真到 G1 · 学习人形机器人动作"
    }
  },
  stats: [
    {
      "value": {
        "en": "8.68 min",
        "zh": "8.68 分钟"
      },
      "label": {
        "en": "Average per motion",
        "zh": "平均每个动作"
      },
      "note": {
        "en": "Five-motion G1 benchmark",
        "zh": "G1 五动作基准"
      }
    },
    {
      "value": "G1",
      "label": {
        "en": "Whole-body tracking",
        "zh": "全身动作跟踪"
      },
      "note": {
        "en": "Dance · walk · run · flip · carry",
        "zh": "舞蹈 · 行走 · 跑步 · 翻转 · 搬箱"
      }
    },
    {
      "value": "Sim2Real",
      "label": {
        "en": "Sim-to-real transfer",
        "zh": "仿真到真机"
      },
      "note": {
        "en": "G1 dance · walk",
        "zh": "G1 舞蹈 · 行走"
      }
    },
    {
      "value": "Live",
      "label": {
        "en": "Browser demos",
        "zh": "浏览器演示"
      },
      "note": {
        "en": "Five trained policies",
        "zh": "五个训练策略"
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
        "en": "FlashSAC reuses experience across collection rounds to learn expressive whole-body reference motions efficiently.",
        "zh": "FlashSAC 跨采集轮次复用经验，高效学习富有表现力的全身参考动作。"
      }
    },
    {
      "title": {
        "en": "One GPU, two processes",
        "zh": "单 GPU 并发采集与学习"
      },
      "text": {
        "en": "CUDA MPS overlaps MJWarp physics collection and policy optimization on a shared GPU.",
        "zh": "CUDA MPS 让 MJWarp 物理采集与策略优化在同一张 GPU 上重叠执行。"
      }
    },
    {
      "title": {
        "en": "Minutes to deployable motion",
        "zh": "分钟级学会可部署动作"
      },
      "text": {
        "en": "All five motions pass deterministic replay at an average budget of 8.68 min per motion; dance and walk transfer to the real G1.",
        "zh": "五个动作均在平均每个 8.68 分钟内通过确定性回放，舞蹈与行走策略迁移至真实 G1。"
      }
    }
  ],
  method: {
    "image": "assets/figures/method-architecture.svg?v=20261022-system",
    "width": 1820,
    "height": 806,
    "alt": {
      "en": "FlashMimic learning formulation, GPU runtime, and concurrent execution with CUDA MPS.",
      "zh": "FlashMimic 的学习构成、GPU 运行时，以及基于 CUDA MPS 的并发执行。"
    },
    "caption": {
      "en": "Learning formulation, GPU runtime, and concurrent execution: task ingredients with FlashSAC reuse, a collector–learner runtime on one shared GPU, and CUDA MPS overlap.",
      "zh": "学习构成、GPU 运行时与并发执行：含 FlashSAC 复用的任务构成、共享 GPU 上的采集器—学习器运行时，以及 CUDA MPS 并发重叠。"
    }
  },
  results: [],
  comparison: [
    {
      "name": "BeyondMimic (PPO)",
      "values": [
        "80.0",
        "54.16",
        "0.1155",
        "42.23",
        "0.1478",
        "144.97"
      ],
      "ours": false
    },
    {
      "name": "MJLab (PPO)",
      "values": [
        "100.0",
        "56.24",
        "0.1282",
        "48.15",
        "0.1548",
        "178.20"
      ],
      "ours": false
    },
    {
      "name": "Holosoma (FastSAC)",
      "values": [
        "60.0",
        "113.77",
        "0.1731",
        "61.70",
        "0.2212",
        "65.14"
      ],
      "ours": false
    },
    {
      "name": {
        "en": "FlashMimic (FlashSAC, Fast)",
        "zh": "FlashMimic（FlashSAC，Fast）"
      },
      "values": [
        "100.0",
        "60.28",
        "0.1713",
        "61.09",
        "0.2218",
        "8.68"
      ],
      "ours": true
    },
    {
      "name": {
        "en": "FlashMimic (FlashSAC, Extended)†",
        "zh": "FlashMimic（FlashSAC，Extended）†"
      },
      "values": [
        "100.0",
        "48.76",
        "0.1201",
        "42.56",
        "0.1564",
        "29.47"
      ],
      "ours": true
    }
  ],
  curves: [],
  timeTarget: {
    "image": "assets/figures/time-target-overview.svg?v=20261017-textfix",
    "width": 1368,
    "height": 401,
    "alt": {
      "en": "Training progress toward tracking targets across different methods.",
      "zh": "不同方法逼近动作跟踪目标的训练进展。"
    },
    "note": {
      "en": "Under a common 180-min budget, FlashMimic first reaches the RMSE, MPJPE, and PCK@50 mm targets in 22.05, 11.00, and 20.31 min.",
      "zh": "在统一的 180 分钟预算下，FlashMimic 首次达到 RMSE、MPJPE 与 PCK@50 mm 目标的时间分别为 22.05、11.00 与 20.31 分钟。"
    }
  },
  comparisonColumns: [
    {
      "en": "Method",
      "zh": "方法"
    },
    {
      "en": "Succ. (%)",
      "zh": "成功率 (%)"
    },
    {
      "en": "Torso global pos.\nmm",
      "zh": "Torso 全局位置\nmm"
    },
    {
      "en": "Body ori.-r\nrad",
      "zh": "身体姿态-r\nrad"
    },
    {
      "en": "EE pos.-r\nmm",
      "zh": "末端位置-r\nmm"
    },
    {
      "en": "EE ori.-r\nrad",
      "zh": "末端姿态-r\nrad"
    },
    {
      "en": "T₄₀₉₀\nmin",
      "zh": "T₄₀₉₀\nmin"
    }
  ],
  demos: [
    { id: "simulation_motion_tracking", category: "simulation", type: "image", width: 3840, height: 960, title: { en: "Simulation · Motion Tracking", zh: "仿真 · 动作跟踪" }, description: { en: "Each pair shows the reference replay on the left and the FlashMimic policy rollout at the same reference frame on the right, providing a qualitative view of tracking in simulation.", zh: "每组相邻画面左侧为参考动作回放，右侧为 FlashMimic 在相同参考帧的策略执行结果，用于直观展示仿真中的动作跟踪效果。" }, src: "assets/images/simulation_motion_tracking_compact.webp?v=20261022-compact", poster: "" },
    { id: "G01_dance", type: "interactive", title: { en: "G1 · Dance", zh: "G1 · 舞蹈" }, description: { en: "Coordinated full-body dance motion tracking.", zh: "协调全身关节，跟踪舞蹈参考动作。" }, poster: "assets/images/G01_dance.jpg", recording: "assets/videos/G01_dance.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G02_flip", type: "interactive", title: { en: "G1 · Flip", zh: "G1 · 翻转" }, description: { en: "A dynamic 360° flip reference motion.", zh: "跟踪动态 360° 翻转参考动作。" }, poster: "assets/images/G02_flip.jpg", recording: "assets/videos/G02_flip.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G03_run", type: "interactive", title: { en: "G1 · Run", zh: "G1 · 跑步" }, description: { en: "Whole-body coordination for a running gait.", zh: "通过全身协调，跟踪跑步步态。" }, poster: "assets/images/G03_run.jpg", recording: "assets/videos/G03_run.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G04_sprint", type: "interactive", title: { en: "G1 · Sprint", zh: "G1 · 冲刺" }, description: { en: "Track a fast-paced sprinting reference.", zh: "跟踪快节奏的冲刺参考动作。" }, poster: "assets/images/G04_sprint.jpg", recording: "assets/videos/G04_sprint.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G05_walk", type: "interactive", title: { en: "G1 · Walk", zh: "G1 · 行走" }, description: { en: "Track the reference walking motion.", zh: "跟踪参考行走动作。" }, poster: "assets/images/G05_walk.jpg", recording: "assets/videos/G05_walk.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G1_real_motion_strip", category: "real", type: "image", width: 2880, height: 640, title: { en: "G1 · Real-world Dance & Walk", zh: "G1 · 真机舞蹈与行走" }, description: { en: "Dance and walking motion-tracking snapshots on the physical G1 robot.", zh: "G1 机器人真机舞蹈与行走动作跟踪快照。" }, src: "assets/images/G1_real_motion_strip.webp?v=20261022-compact", poster: "" }
  ],
  authors: [], // 例：[{ name: "姓名", affiliation: "单位", url: "https://..." }]
  affiliations: [], // 例：[{ name: "单位名称", logo: "assets/logos/institution.svg", url: "https://..." }]
  citation: "", // 粘贴真实 BibTeX，支持反引号包裹的多行字符串；为空时不可复制
  // 页面固定文案与区块标题也集中在这里。
  ui: {
    efficiencyDescription: {"en": "Time to matched tracking targets across dance, walk, and box carrying.", "zh": "比较舞蹈、行走与搬箱达到统一跟踪目标所需的时间。"},
    efficiencyTitle: {"en": "Reach tracking targets faster.", "zh": "更快达到跟踪目标。"},
    efficiencyLabel: {"en": "04 / TRAINING EFFICIENCY", "zh": "04 / 训练效率"},
    navEfficiency: {"en": "Efficiency", "zh": "效率"},
    demoScope: {"en": "Drag to orbit, switch between Follow and Free camera, or push the robot to explore its response.", "zh": "拖动旋转视角、切换跟随或自由镜头，也可以施加推力，观察机器人的响应。"},
    precisionScrollHint: {"en": "Scroll horizontally to view all metrics →", "zh": "横向滚动查看全部指标 →"},
    precisionIntro: {"en": "Five-motion Unitree G1 benchmark: deterministic replay success, tracking error, and training budget.", "zh": "Unitree G1 五动作基准：确定性回放成功率、跟踪误差与训练预算。"},
    precisionTitle: {"en": "Five-motion benchmark", "zh": "五动作基准"},
    downloadPdf: {"en": "Download PDF", "zh": "下载 PDF"},
    openSvg: {"en": "Open full-size SVG ↗", "zh": "查看完整 SVG ↗"},
    curveScrollHint: {"en": "On small screens, scroll the chart horizontally to read all three metrics.", "zh": "小屏可横向滚动图表，查看三个指标。"},
    curveCommonNote: {"en": "Shading shows variation across motions; the time axis is compressed after 60 min.", "zh": "阴影表示动作间差异；60 分钟后横轴压缩显示。"},
    curveAlt: {"en": "Training walltime versus mean tracking accuracy (RMSE, MPJPE, PCK@50 mm) on three motions for four repositories.", "zh": "四仓库在三动作上的训练时间与平均跟踪精度（RMSE、MPJPE、PCK@50 mm）。"},
    curvesLegend: {"en": "Methods compared", "zh": "对比方法"},
    curvesSubtitle: {"en": "Training progress", "zh": "学习进展"},
    curvesTitle: {"en": "Time to matched accuracy targets", "zh": "达到统一精度目标的时间"},
    methodDownload: {"en": "Open original framework ↗", "zh": "查看原始框架图 ↗"},
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
    projectLabel: { en: "RESEARCH PROJECT", zh: "研究项目" }, projectStatus: {"en": "Framework · Results · Demos", "zh": "框架 · 结果 · 演示"},
    exploreDemos: { en: "Explore demos", zh: "浏览演示" }, paper: { en: "Paper", zh: "论文" }, docs: {"en": "Materials", "zh": "数据材料"}, soon: { en: "Soon", zh: "待发布" },
    overview: { en: "OVERVIEW", zh: "项目概览" }, videoPending: { en: "VIDEO COMING SOON", zh: "演示视频待补充" }, teaserTitle: { en: "A first look at FlashMimic", zh: "初识 FlashMimic" }, teaserNote: { en: "Project film · Coming soon", zh: "项目视频 · 即将上线" }, teaserAccessible: { en: "Decorative motion illustration. The project video will be added later.", zh: "动作示意占位图，项目视频将在后续补充。" },
    contributionsLabel: { en: "01 / CONTRIBUTIONS", zh: "01 / 研究贡献" }, highlightsTitle: { en: "The ideas behind FlashMimic.", zh: "FlashMimic 背后的思考。" }, highlightsDescription: {"en": "Off-policy experience reuse, a shared-GPU runtime, and motion-tracking evidence.", "zh": "离策略经验复用、共享 GPU 运行时，以及动作跟踪评测依据。"},
    methodLabel: { en: "02 / METHOD", zh: "02 / 技术方法" }, methodTitle: { en: "Inside the framework.", zh: "走进方法框架。" }, methodDescription: {"en": "Reference windows and rewards feed FlashSAC while MJWarp collection and policy updates overlap on one GPU.", "zh": "参考窗口与奖励驱动 FlashSAC，MJWarp 采集与策略更新在单 GPU 上重叠执行。"}, methodFigure: { en: "FlashMimic co-design", zh: "FlashMimic 协同设计" }, figurePending: { en: "Architecture", zh: "系统架构" }, input: { en: "Input", zh: "输入" }, output: { en: "Output", zh: "输出" }, methodCaption: { en: "Learning formulation, GPU runtime, and concurrent execution from the paper.", zh: "论文中的学习构成、GPU 运行时与并发执行。" },
    methodNoteOne: {"en": "Task and learner", "zh": "任务与学习器"}, methodNoteOneText: {"en": "Whole-body observations, exponential tracking rewards, adaptive resets, and domain randomization are paired with FlashSAC.", "zh": "全身观测、指数跟踪奖励、自适应重置与域随机化和 FlashSAC 结合。"}, methodNoteTwo: {"en": "Concurrent runtime", "zh": "并发运行时"}, methodNoteTwoText: {"en": "A learner-owned actor serves rollout inference while CUDA MPS overlaps collection and optimization on the shared GPU.", "zh": "学习器持有的 actor 服务 rollout 推理，CUDA MPS 让采集与优化在共享 GPU 上重叠。"},
    resultsLabel: { en: "03 / EVALUATION", zh: "03 / 实验评估" }, resultsTitle: { en: "Five motions. One benchmark.", zh: "五个动作，一套基准。" }, resultsDescription: {"en": "FlashMimic passes all five deterministic replays at 8.68 min per motion on average; extended training lowers error further.", "zh": "FlashMimic 平均每个动作 8.68 分钟通过五个确定性回放，延长训练可进一步降低误差。"}, dataPending: { en: "Results", zh: "实验结果" }, comparisonCaption: {"en": "Tracking accuracy and training budget on five G1 motions", "zh": "G1 五动作的跟踪精度与训练预算"}, tableMethod: { en: "Method", zh: "方法" }, metricOne: { en: "Metric 01", zh: "指标 01" }, metricTwo: { en: "Metric 02", zh: "指标 02" }, metricThree: { en: "Metric 03", zh: "指标 03" }, tableNote: {"en": "Success is the fraction of motions passed by one deterministic replay. Errors and budgets are conditional means over passed motions; Extended† uses selected extended-training checkpoints.", "zh": "成功率为一次确定性回放通过的动作比例。误差与预算仅统计通过动作的均值；Extended† 使用延长训练后筛选的检查点。"},
    demosLabel: {"en": "05 / SHOWCASE", "zh": "05 / 项目展示"}, demosTitle: { en: "From simulation to G1.", zh: "从仿真到 G1。" }, demosDescription: {"en": "Reference-motion tracking in simulation, real-robot dance and walking snapshots, plus interactive policies.", "zh": "仿真参考动作跟踪、真实 G1 舞蹈与行走快照，以及交互策略演示。"}, filterAll: { en: "All", zh: "全部" }, filterVideos: { en: "Videos", zh: "视频" }, filterImages: { en: "Visualizations", zh: "可视化" }, galleryCount: { en: "{count} items", zh: "{count} 项展示" }, demoPending: { en: "COMING SOON", zh: "即将上线" }, videoType: { en: "VIDEO", zh: "视频演示" }, imageType: { en: "VISUALIZATION", zh: "可视化" }, openDemo: { en: "Open demo ↗", zh: "打开演示 ↗" },
    citationLabel: { en: "REFERENCE", zh: "引用信息" }, citationDescription: { en: "Citation information will be available when the paper is released.", zh: "论文发布后将在这里提供引用信息。" }, citationPending: { en: "Coming soon", zh: "待发布" }, citationPlaceholder: { en: "% FlashMimic\n% Citation will be added with the paper release.", zh: "% FlashMimic\n% 论文发布后将在这里补充正式引用。" }, copy: { en: "Copy", zh: "复制" }, copied: { en: "Copied", zh: "已复制" }, copyFailed: { en: "Please select and copy the citation below.", zh: "请选中下方引用文本并手动复制。" },
    authorsLabel: { en: "THE TEAM", zh: "研究团队" }, authorsTitle: { en: "People behind the project.", zh: "项目背后的研究者。" }, authorsPending: { en: "Authors and affiliations will be announced soon.", zh: "作者名单与所属单位即将公布。" }, affiliationPending: { en: "Affiliation to be announced", zh: "所属单位待公布" },
    footerTagline: { en: "Research. Motion. Possibility.", zh: "研究 · 动作 · 更多可能" }, backTop: { en: "Back to top ↑", zh: "返回顶部 ↑" }, footerNote: {"en": "Learning motion. Exploring possibilities.", "zh": "学习动作，探索更多可能。"}, menuOpen: { en: "Open navigation", zh: "打开导航" }, menuClose: { en: "Close navigation", zh: "关闭导航" }, mediaError: { en: "Media is unavailable. Please check back later.", zh: "素材暂时无法加载，请稍后再试。" }
  }
};
