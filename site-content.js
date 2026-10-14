/* 后续补素材主要修改这个文件。空路径保留占位；相对路径以网站根目录为基准。 */
window.FLASHMIMIC_CONTENT = {
  defaultLanguage: "en",
  links: {
    github: "https://github.com/Motphys/FlashMimic",
    paper: "", // 例：assets/flashmimic.pdf 或 https://arxiv.org/abs/...
    docs: ""
  },
  hero: {
    subtitle: { en: "Whole-body motion tracking with FlashSAC.", zh: "基于 FlashSAC 的全身动作跟踪。" },
    description: {
      en: "G1 motion tracking built on UniLab. Explore five trained policies, from expressive dance to dynamic locomotion, in an interactive physics simulation.",
      zh: "基于 UniLab 的 G1 动作跟踪。在交互式物理仿真中体验五个已训练策略，探索舞蹈、翻转与动态移动。"
    },
    video: "", // 例：assets/videos/teaser.mp4
    poster: "", // 例：assets/images/teaser.webp；仅填封面也可以
    alt: { en: "FlashMimic project overview", zh: "FlashMimic 项目概览" }
  },
  stats: [
    { value: "29", label: { en: "Actuated joints", zh: "驱动关节" }, note: { en: "Unitree G1", zh: "Unitree G1" } },
    { value: "5", label: { en: "Motion policies", zh: "动作策略" }, note: { en: "Dance · Flip · Run · Sprint · Walk", zh: "舞蹈 · 翻转 · 跑步 · 冲刺 · 行走" } },
    { value: "50 Hz", label: { en: "Policy control", zh: "策略控制频率" }, note: { en: "One-step action delay", zh: "一步动作延迟" } },
    { value: "150 Hz", label: { en: "Physics simulation", zh: "物理仿真频率" }, note: { en: "MuJoCo", zh: "MuJoCo" } }
  ],
  highlights: [
    { title: { en: "Core contribution", zh: "核心贡献" }, text: { en: "The central idea and research contribution of FlashMimic will be introduced here.", zh: "这里将介绍 FlashMimic 的核心思路与主要研究贡献。" } },
    { title: { en: "Method & design", zh: "方法与设计" }, text: { en: "An overview of the method and the design choices behind it. Details coming soon.", zh: "这里将概述技术方法及其背后的设计思考，详细内容即将补充。" } },
    { title: { en: "Experiments & insights", zh: "实验与发现" }, text: { en: "Key findings, evaluation results, and insights will accompany the project release.", zh: "主要发现、评估结果与实验分析将随项目发布一同公开。" } }
  ],
  method: {
    image: "", // 例：assets/images/architecture.svg
    alt: { en: "FlashMimic architecture", zh: "FlashMimic 方法架构" },
    caption: "" // 有图时填写真实图注，支持 { en: "...", zh: "..." }
  },
  results: [
    { title: { en: "Quantitative evaluation", zh: "定量评估" }, image: "", caption: { en: "Main experimental results will be presented here.", zh: "这里将展示主要实验结果。" } },
    { title: { en: "Analysis & ablations", zh: "分析与消融实验" }, image: "", caption: { en: "Detailed analysis and ablation studies will be presented here.", zh: "这里将展示详细分析与消融实验。" } }
  ],
  comparison: [
    { name: { en: "Baseline 01 (to be added)", zh: "基线方法 01（待补充）" }, values: ["—", "—", "—"] },
    { name: { en: "Baseline 02 (to be added)", zh: "基线方法 02（待补充）" }, values: ["—", "—", "—"] },
    { name: "FlashMimic", values: ["—", "—", "—"], ours: true }
  ],
  demos: [
    { id: "G1_dance_real", category: "real", type: "video", title: { en: "G1 · Real-world Dance", zh: "G1 · 真机舞蹈" }, description: { en: "Dance motion tracking on the physical G1 robot.", zh: "G1 机器人上的真机舞蹈动作跟踪。" }, src: "assets/videos/G1_dance_real.mp4", poster: "assets/images/G1_dance_real.webp" },
    { id: "G1_walk_real", category: "real", type: "video", title: { en: "G1 · Real-world Walk", zh: "G1 · 真机行走" }, description: { en: "Walking motion tracking on the physical G1 robot.", zh: "G1 机器人上的真机行走动作跟踪。" }, src: "assets/videos/G1_walk_real.mp4", poster: "assets/images/G1_walk_real.webp" },
    { id: "G01_dance", type: "interactive", title: { en: "G1 · Dance", zh: "G1 · 舞蹈" }, description: { en: "Coordinated full-body dance motion tracking.", zh: "协调全身关节，跟踪舞蹈参考动作。" }, poster: "assets/images/G01_dance.jpg", recording: "assets/videos/G01_dance.mp4?v=nodr-follow-white-floor-20261014" },
    { id: "G02_flip", type: "interactive", title: { en: "G1 · Flip", zh: "G1 · 翻转" }, description: { en: "A dynamic 360° flip reference motion.", zh: "跟踪动态 360° 翻转参考动作。" }, poster: "assets/images/G02_flip.jpg", recording: "assets/videos/G02_flip.mp4?v=nodr-follow-white-floor-20261014" },
    { id: "G03_run", type: "interactive", title: { en: "G1 · Run", zh: "G1 · 跑步" }, description: { en: "Whole-body coordination for a running gait.", zh: "通过全身协调，跟踪跑步步态。" }, poster: "assets/images/G03_run.jpg", recording: "assets/videos/G03_run.mp4?v=nodr-follow-white-floor-20261014" },
    { id: "G04_sprint", type: "interactive", title: { en: "G1 · Sprint", zh: "G1 · 冲刺" }, description: { en: "Track a fast-paced sprinting reference.", zh: "跟踪快节奏的冲刺参考动作。" }, poster: "assets/images/G04_sprint.jpg", recording: "assets/videos/G04_sprint.mp4?v=nodr-follow-white-floor-20261014" },
    { id: "G05_walk", type: "interactive", title: { en: "G1 · Walk", zh: "G1 · 行走" }, description: { en: "Track the reference walking motion.", zh: "跟踪参考行走动作。" }, poster: "assets/images/G05_walk.jpg", recording: "assets/videos/G05_walk.mp4?v=nodr-follow-white-floor-20261014" }
  ],
  news: [
    { date: "2026-10-10", text: { en: "The FlashMimic project website is online. More details coming soon.", zh: "FlashMimic 项目主页已上线，更多内容即将公布。" } }
  ],
  authors: [], // 例：[{ name: "姓名", affiliation: "单位", url: "https://..." }]
  affiliations: [], // 例：[{ name: "单位名称", logo: "assets/logos/institution.svg", url: "https://..." }]
  citation: "", // 粘贴真实 BibTeX，支持反引号包裹的多行字符串；为空时不可复制
  // 页面固定文案与区块标题也集中在这里。
  ui: {
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
    projectLabel: { en: "RESEARCH PROJECT", zh: "研究项目" }, projectStatus: { en: "More coming soon", zh: "更多内容即将公布" },
    exploreDemos: { en: "Explore demos", zh: "浏览演示" }, paper: { en: "Paper", zh: "论文" }, docs: { en: "Docs", zh: "文档" }, soon: { en: "Soon", zh: "待发布" },
    overview: { en: "OVERVIEW", zh: "项目概览" }, videoPending: { en: "VIDEO COMING SOON", zh: "演示视频待补充" }, teaserTitle: { en: "A first look at FlashMimic", zh: "初识 FlashMimic" }, teaserNote: { en: "Project film · Coming soon", zh: "项目视频 · 即将上线" }, teaserAccessible: { en: "Decorative motion illustration. The project video will be added later.", zh: "动作示意占位图，项目视频将在后续补充。" },
    contributionsLabel: { en: "01 / CONTRIBUTIONS", zh: "01 / 研究贡献" }, highlightsTitle: { en: "The ideas behind FlashMimic.", zh: "FlashMimic 背后的思考。" }, highlightsDescription: { en: "An overview of the key contributions. Full details will follow.", zh: "关键贡献一览，完整内容即将公布。" },
    methodLabel: { en: "02 / METHOD", zh: "02 / 技术方法" }, methodTitle: { en: "Inside the framework.", zh: "走进方法框架。" }, methodDescription: { en: "The complete method, from an overview to the details that make it work.", zh: "从整体架构到实现细节，在这里了解完整的技术方法。" }, methodFigure: { en: "Framework overview", zh: "方法框架概览" }, figurePending: { en: "Figure coming soon", zh: "图示待补充" }, input: { en: "Input", zh: "输入" }, output: { en: "Output", zh: "输出" }, methodCaption: { en: "Illustrative layout placeholder. The final architecture figure and caption will be added here.", zh: "当前为排版示意占位，正式架构图与图注将在这里补充。" },
    methodNoteOne: { en: "Method overview", zh: "方法概述" }, methodNoteOneText: { en: "A concise explanation of the approach and its main components will appear here.", zh: "这里将简要说明技术方案与核心组成部分。" }, methodNoteTwo: { en: "Implementation details", zh: "实现细节" }, methodNoteTwoText: { en: "Training setup, design choices, and technical details will be shared with the release.", zh: "训练设置、设计选择与技术细节将随项目发布公开。" },
    resultsLabel: { en: "03 / EVALUATION", zh: "03 / 实验评估" }, resultsTitle: { en: "Results, at a glance.", zh: "实验结果，一目了然。" }, resultsDescription: { en: "Quantitative comparisons and analysis will be available with the full project release.", zh: "定量对比与实验分析将随完整项目发布。" }, dataPending: { en: "Results coming soon", zh: "实验结果待补充" }, comparisonCaption: { en: "Quantitative comparison · Data to be announced", zh: "定量对比 · 数据待公布" }, tableMethod: { en: "Method", zh: "方法" }, metricOne: { en: "Metric 01", zh: "指标 01" }, metricTwo: { en: "Metric 02", zh: "指标 02" }, metricThree: { en: "Metric 03", zh: "指标 03" }, tableNote: { en: "— denotes results that have not yet been published.", zh: "— 表示尚未公布的实验结果。" },
    demosLabel: { en: "04 / SHOWCASE", zh: "04 / 项目展示" }, demosTitle: { en: "See FlashMimic in action.", zh: "看看 FlashMimic 的表现。" }, demosDescription: { en: "Watch real-world G1 demonstrations, then explore five trained policies in interactive simulation. Drag to rotate, pause, reset, or push the robot.", zh: "观看 G1 真机演示，并在交互式仿真中体验五个已训练策略。可旋转视角、暂停、重置或施加扰动。" }, filterAll: { en: "All", zh: "全部" }, filterVideos: { en: "Videos", zh: "视频" }, filterImages: { en: "Visualizations", zh: "可视化" }, galleryCount: { en: "{count} items", zh: "{count} 项展示" }, demoPending: { en: "COMING SOON", zh: "即将上线" }, videoType: { en: "VIDEO", zh: "视频演示" }, imageType: { en: "VISUALIZATION", zh: "可视化" }, openDemo: { en: "Open demo ↗", zh: "打开演示 ↗" },
    newsLabel: { en: "LATEST", zh: "最新动态" }, newsTitle: { en: "Project updates.", zh: "项目动态。" }, citationLabel: { en: "REFERENCE", zh: "引用信息" }, citationDescription: { en: "Citation information will be available when the paper is released.", zh: "论文发布后将在这里提供引用信息。" }, citationPending: { en: "Coming soon", zh: "待发布" }, citationPlaceholder: { en: "% FlashMimic\n% Citation will be added with the paper release.", zh: "% FlashMimic\n% 论文发布后将在这里补充正式引用。" }, copy: { en: "Copy", zh: "复制" }, copied: { en: "Copied", zh: "已复制" }, copyFailed: { en: "Please select and copy the citation below.", zh: "请选中下方引用文本并手动复制。" },
    authorsLabel: { en: "THE TEAM", zh: "研究团队" }, authorsTitle: { en: "People behind the project.", zh: "项目背后的研究者。" }, authorsPending: { en: "Authors and affiliations will be announced soon.", zh: "作者名单与所属单位即将公布。" }, affiliationPending: { en: "Affiliation to be announced", zh: "所属单位待公布" },
    footerTagline: { en: "Research. Motion. Possibility.", zh: "研究 · 动作 · 更多可能" }, backTop: { en: "Back to top ↑", zh: "返回顶部 ↑" }, footerNote: { en: "More to come. Stay curious.", zh: "更多内容，敬请期待。" }, menuOpen: { en: "Open navigation", zh: "打开导航" }, menuClose: { en: "Close navigation", zh: "关闭导航" }, mediaError: { en: "Media is unavailable. Please check back later.", zh: "素材暂时无法加载，请稍后再试。" }
  }
};
