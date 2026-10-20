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
      "en": "Learn expressive and dynamic humanoid motions with FlashSAC. Explore G1 demonstrations and try the trained policies in your browser.",
      "zh": "通过 FlashSAC 高效学习丰富、动态的人形机器人动作，观看 G1 真机演示，并在浏览器中体验训练后的策略。"
    },
    "video": "",
    "poster": "assets/figures/teaser-overview.svg?v=20261019-teaser",
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
        "en": "Minutes",
        "zh": "分钟级"
      },
      "label": {
        "en": "Motion learning",
        "zh": "动作学习"
      },
      "note": {
        "en": "Efficient off-policy training",
        "zh": "高效离策略训练"
      }
    },
    {
      "value": "G1",
      "label": {
        "en": "Whole-body control",
        "zh": "全身动作控制"
      },
      "note": {
        "en": "Expressive and dynamic motions",
        "zh": "丰富表达与动态动作"
      }
    },
    {
      "value": "Sim2Real",
      "label": {
        "en": "Real-robot demonstrations",
        "zh": "真机动作展示"
      },
      "note": {
        "en": "Dance and walking",
        "zh": "舞蹈与行走"
      }
    },
    {
      "value": "Live",
      "label": {
        "en": "Interactive simulation",
        "zh": "交互仿真"
      },
      "note": {
        "en": "Explore policies in your browser",
        "zh": "在浏览器中体验动作策略"
      }
    }
  ],
  highlights: [
    {
      "title": {
        "en": "Learning from experience",
        "zh": "从经验中学习"
      },
      "text": {
        "en": "Reuse experience to learn reference motions efficiently, from expressive dance to dynamic locomotion.",
        "zh": "通过经验复用高效学习参考动作，覆盖富有表现力的舞蹈与动态移动。"
      }
    },
    {
      "title": {
        "en": "Collection and learning, together",
        "zh": "采集与学习协同运行"
      },
      "text": {
        "en": "Simulation and policy optimization work together on a shared GPU to make better use of training resources.",
        "zh": "让仿真采集与策略优化在共享 GPU 上协同运行，提高训练资源利用效率。"
      }
    },
    {
      "title": {
        "en": "From simulation to G1",
        "zh": "从仿真走向真机"
      },
      "text": {
        "en": "See motion tracking on the real G1 robot and explore trained behaviors through interactive demonstrations.",
        "zh": "观看真实 G1 机器人的动作跟踪，并通过交互演示探索训练后的动作表现。"
      }
    }
  ],
  method: {
    "image": "assets/figures/method-architecture.svg?v=20261019-showcase",
    "width": 1819,
    "height": 805,
    "alt": {
      "en": "FlashMimic framework: motion learning, a shared-GPU collector and learner, and overlapping execution.",
      "zh": "FlashMimic 框架：动作学习、共享 GPU 上的采集与学习，以及并发执行。"
    },
    "caption": {
      "en": "Reference motions guide learning, while collection and optimization run together on a shared GPU.",
      "zh": "以参考动作引导学习，让数据采集与策略优化在共享 GPU 上协同运行。"
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
      "en": "The curves summarize dance, walking, and box carrying to compare progress toward accurate motion tracking.",
      "zh": "曲线汇总舞蹈、行走与搬箱，展示不同方法逼近动作跟踪目标的学习进展。"
    }
  },
  comparisonColumns: [
    {
      "en": "Method",
      "zh": "方法"
    },
    {
      "en": "Succ. (%) ↑",
      "zh": "成功率 (%) ↑"
    },
    {
      "en": "Torso global pos. ↓\nmm",
      "zh": "Torso 全局位置 ↓\nmm"
    },
    {
      "en": "Body ori.-r ↓\nrad",
      "zh": "身体姿态-r ↓\nrad"
    },
    {
      "en": "EE pos.-r ↓\nmm",
      "zh": "末端位置-r ↓\nmm"
    },
    {
      "en": "EE ori.-r ↓\nrad",
      "zh": "末端姿态-r ↓\nrad"
    },
    {
      "en": "T₄₀₉₀ ↓\nmin",
      "zh": "T₄₀₉₀ ↓\nmin"
    }
  ],
  demos: [
    { id: "G1_dance_real", category: "real", type: "image", title: { en: "G1 · Real-world Dance", zh: "G1 · 真机舞蹈" }, description: { en: "Dance motion tracking on the physical G1 robot — four frames from one run.", zh: "G1 机器人真机舞蹈动作跟踪 —— 单次运行的四帧快照。" }, src: "assets/images/G1_dance_real_frames.webp?v=20261020-frames2", poster: "" },
    { id: "G1_walk_real", category: "real", type: "image", title: { en: "G1 · Real-world Walk", zh: "G1 · 真机行走" }, description: { en: "Walking motion tracking on the physical G1 robot — four frames from one run.", zh: "G1 机器人真机行走动作跟踪 —— 单次运行的四帧快照。" }, src: "assets/images/G1_walk_real_frames.webp?v=20261020-frames2", poster: "" },
    { id: "G01_dance", type: "interactive", title: { en: "G1 · Dance", zh: "G1 · 舞蹈" }, description: { en: "Coordinated full-body dance motion tracking.", zh: "协调全身关节，跟踪舞蹈参考动作。" }, poster: "assets/images/G01_dance.jpg", recording: "assets/videos/G01_dance.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G02_flip", type: "interactive", title: { en: "G1 · Flip", zh: "G1 · 翻转" }, description: { en: "A dynamic 360° flip reference motion.", zh: "跟踪动态 360° 翻转参考动作。" }, poster: "assets/images/G02_flip.jpg", recording: "assets/videos/G02_flip.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G03_run", type: "interactive", title: { en: "G1 · Run", zh: "G1 · 跑步" }, description: { en: "Whole-body coordination for a running gait.", zh: "通过全身协调，跟踪跑步步态。" }, poster: "assets/images/G03_run.jpg", recording: "assets/videos/G03_run.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G04_sprint", type: "interactive", title: { en: "G1 · Sprint", zh: "G1 · 冲刺" }, description: { en: "Track a fast-paced sprinting reference.", zh: "跟踪快节奏的冲刺参考动作。" }, poster: "assets/images/G04_sprint.jpg", recording: "assets/videos/G04_sprint.mp4?v=nodr-follow-motphys-20261015" },
    { id: "G05_walk", type: "interactive", title: { en: "G1 · Walk", zh: "G1 · 行走" }, description: { en: "Track the reference walking motion.", zh: "跟踪参考行走动作。" }, poster: "assets/images/G05_walk.jpg", recording: "assets/videos/G05_walk.mp4?v=nodr-follow-motphys-20261015" }
  ],
  news: [
    {
      "date": "2026-10-17",
      "text": {
        "en": "New training-efficiency comparisons and an updated framework overview.",
        "zh": "更新训练效率对比与方法框架。"
      }
    },
    {
      "date": "2026-10-15",
      "text": {
        "en": "System framework and motion-tracking results are now available.",
        "zh": "上线系统框架与动作跟踪结果。"
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
    efficiencyDescription: {"en": "Follow how tracking quality improves as training progresses.", "zh": "通过训练曲线，观察动作跟踪精度随学习推进的变化。"},
    efficiencyTitle: {"en": "Learning motion, faster.", "zh": "更快学会动作。"},
    efficiencyLabel: {"en": "04 / TRAINING EFFICIENCY", "zh": "04 / 训练效率"},
    navEfficiency: {"en": "Efficiency", "zh": "效率"},
    demoScope: {"en": "Drag to orbit, switch between Follow and Free camera, or push the robot to explore its response.", "zh": "拖动旋转视角、切换跟随或自由镜头，也可以施加推力，观察机器人的响应。"},
    precisionScrollHint: {"en": "Scroll horizontally to view all metrics →", "zh": "横向滚动查看全部指标 →"},
    precisionIntro: {"en": "Tracking quality and training budgets across a range of reference motions.", "zh": "从多种参考动作出发，比较跟踪精度与训练预算。"},
    precisionTitle: {"en": "Motion-tracking performance", "zh": "动作跟踪表现"},
    downloadPdf: {"en": "Download PDF", "zh": "下载 PDF"},
    openSvg: {"en": "Open full-size SVG ↗", "zh": "查看完整 SVG ↗"},
    curveScrollHint: {"en": "On small screens, scroll the chart horizontally to read all three metrics.", "zh": "小屏可横向滚动图表，查看三个指标。"},
    curveCommonNote: {"en": "Shading shows variation across motions. Some timings and curve endpoints use estimates or last-value continuation; the later time axis is compressed.", "zh": "阴影表示动作间差异；部分计时与末段曲线使用估算或延续，横轴后段已压缩。"},
    curveAlt: {"en": "Training walltime versus mean tracking accuracy (RMSE, MPJPE, PCK@50 mm) on three motions for four repositories.", "zh": "四仓库在三动作上的训练时间与平均跟踪精度（RMSE、MPJPE、PCK@50 mm）。"},
    curvesLegend: {"en": "Methods compared", "zh": "对比方法"},
    curvesSubtitle: {"en": "Training progress", "zh": "学习进展"},
    curvesTitle: {"en": "Progress toward accurate tracking", "zh": "逐步逼近目标动作"},
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
    methodLabel: { en: "02 / METHOD", zh: "02 / 技术方法" }, methodTitle: { en: "Inside the framework.", zh: "走进方法框架。" }, methodDescription: {"en": "A shared-GPU framework that brings motion tracking, experience collection, and policy learning together.", "zh": "在共享 GPU 上，将动作跟踪、经验采集与策略学习连成一个高效流程。"}, methodFigure: { en: "Framework overview", zh: "方法框架概览" }, figurePending: { en: "Figure coming soon", zh: "图示待补充" }, input: { en: "Input", zh: "输入" }, output: { en: "Output", zh: "输出" }, methodCaption: { en: "Illustrative layout placeholder. The final architecture figure and caption will be added here.", zh: "当前为排版示意占位，正式架构图与图注将在这里补充。" },
    methodNoteOne: {"en": "Efficient collection", "zh": "高效采集"}, methodNoteOneText: {"en": "Physics simulation and reference motions provide the experience needed to learn coordinated whole-body movement.", "zh": "结合物理仿真与参考动作，为协调的全身动作学习提供经验。"}, methodNoteTwo: {"en": "Learning through reuse", "zh": "复用经验，持续学习"}, methodNoteTwoText: {"en": "FlashSAC reuses collected experience, while parallel execution keeps collection and policy learning working together.", "zh": "FlashSAC 复用采集经验，通过并行执行让仿真与策略学习紧密协作。"},
    resultsLabel: { en: "03 / EVALUATION", zh: "03 / 实验评估" }, resultsTitle: { en: "Results, at a glance.", zh: "实验结果，一目了然。" }, resultsDescription: {"en": "Compare motion-tracking performance and training efficiency across methods.", "zh": "对比不同方法的动作跟踪表现与训练效率。"}, dataPending: { en: "Results coming soon", zh: "实验结果待补充" }, comparisonCaption: {"en": "Tracking accuracy and training budget", "zh": "跟踪精度与训练预算"}, tableMethod: { en: "Method", zh: "方法" }, metricOne: { en: "Metric 01", zh: "指标 01" }, metricTwo: { en: "Metric 02", zh: "指标 02" }, metricThree: { en: "Metric 03", zh: "指标 03" }, tableNote: {"en": "Completion is based on single reference rollouts; errors and budgets average successful motions, and some times are estimated. Extended† includes adjusted reference data and is not a measured-accuracy comparison.", "zh": "完成比例来自单次参考回放，误差与预算仅汇总成功动作，部分时间为估算。Extended† 含调整参考数据，不作为实测精度比较。"},
    demosLabel: {"en": "05 / SHOWCASE", "zh": "05 / 项目展示"}, demosTitle: { en: "See FlashMimic in action.", zh: "看看 FlashMimic 的表现。" }, demosDescription: {"en": "View four-frame snapshots of G1 dance and walking on the real robot, then explore more motions in interactive simulation.", "zh": "查看 G1 真机舞蹈与行走的四帧快照，并在交互仿真中体验更多动作。"}, filterAll: { en: "All", zh: "全部" }, filterVideos: { en: "Videos", zh: "视频" }, filterImages: { en: "Visualizations", zh: "可视化" }, galleryCount: { en: "{count} items", zh: "{count} 项展示" }, demoPending: { en: "COMING SOON", zh: "即将上线" }, videoType: { en: "VIDEO", zh: "视频演示" }, imageType: { en: "VISUALIZATION", zh: "可视化" }, openDemo: { en: "Open demo ↗", zh: "打开演示 ↗" },
    newsLabel: { en: "LATEST", zh: "最新动态" }, newsTitle: { en: "Project updates.", zh: "项目动态。" }, citationLabel: { en: "REFERENCE", zh: "引用信息" }, citationDescription: { en: "Citation information will be available when the paper is released.", zh: "论文发布后将在这里提供引用信息。" }, citationPending: { en: "Coming soon", zh: "待发布" }, citationPlaceholder: { en: "% FlashMimic\n% Citation will be added with the paper release.", zh: "% FlashMimic\n% 论文发布后将在这里补充正式引用。" }, copy: { en: "Copy", zh: "复制" }, copied: { en: "Copied", zh: "已复制" }, copyFailed: { en: "Please select and copy the citation below.", zh: "请选中下方引用文本并手动复制。" },
    authorsLabel: { en: "THE TEAM", zh: "研究团队" }, authorsTitle: { en: "People behind the project.", zh: "项目背后的研究者。" }, authorsPending: { en: "Authors and affiliations will be announced soon.", zh: "作者名单与所属单位即将公布。" }, affiliationPending: { en: "Affiliation to be announced", zh: "所属单位待公布" },
    footerTagline: { en: "Research. Motion. Possibility.", zh: "研究 · 动作 · 更多可能" }, backTop: { en: "Back to top ↑", zh: "返回顶部 ↑" }, footerNote: {"en": "Learning motion. Exploring possibilities.", "zh": "学习动作，探索更多可能。"}, menuOpen: { en: "Open navigation", zh: "打开导航" }, menuClose: { en: "Close navigation", zh: "关闭导航" }, mediaError: { en: "Media is unavailable. Please check back later.", zh: "素材暂时无法加载，请稍后再试。" }
  }
};
