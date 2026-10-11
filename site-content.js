/* 后续补素材主要修改这个文件。空路径保留占位；相对路径以网站根目录为基准。 */
window.FLASHMIMIC_CONTENT = {
  defaultLanguage: "en",
  links: {
    github: "https://github.com/flashmimic",
    paper: "", // 例：assets/flashmimic.pdf 或 https://arxiv.org/abs/...
    docs: ""
  },
  hero: {
    subtitle: { en: "Project details coming soon.", zh: "项目详情，即将公布。" },
    description: {
      en: "Discover FlashMimic. Our research, method, and demonstrations will be shared here.",
      zh: "探索 FlashMimic。我们将在这里分享研究工作、技术方法与项目演示。"
    },
    video: "", // 例：assets/videos/teaser.mp4
    poster: "", // 例：assets/images/teaser.webp；仅填封面也可以
    alt: { en: "FlashMimic project overview", zh: "FlashMimic 项目概览" }
  },
  stats: [
    { value: "—", label: { en: "Key result", zh: "核心结果" }, note: { en: "To be announced", zh: "即将公布" } },
    { value: "—", label: { en: "Evaluation", zh: "实验评估" }, note: { en: "To be announced", zh: "即将公布" } },
    { value: "—", label: { en: "Tasks", zh: "任务覆盖" }, note: { en: "To be announced", zh: "即将公布" } },
    { value: "—", label: { en: "Demonstrations", zh: "项目演示" }, note: { en: "To be announced", zh: "即将公布" } }
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
    { type: "video", title: { en: "Project demonstration", zh: "项目演示" }, description: { en: "A closer look at FlashMimic. Coming soon.", zh: "近距离了解 FlashMimic，即将上线。" }, src: "", poster: "", url: "" },
    { type: "video", title: { en: "More in motion", zh: "更多动态展示" }, description: { en: "Additional video demonstrations. Coming soon.", zh: "更多视频演示，即将上线。" }, src: "", poster: "", url: "" },
    { type: "image", title: { en: "Visual exploration", zh: "可视化展示" }, description: { en: "Visualizations and qualitative results. Coming soon.", zh: "可视化与定性结果，即将上线。" }, src: "", poster: "", url: "" }
  ],
  news: [
    { date: "2026-10-10", text: { en: "The FlashMimic project website is online. More details coming soon.", zh: "FlashMimic 项目主页已上线，更多内容即将公布。" } }
  ],
  authors: [], // 例：[{ name: "姓名", affiliation: "单位", url: "https://..." }]
  affiliations: [], // 例：[{ name: "单位名称", logo: "assets/logos/institution.svg", url: "https://..." }]
  citation: "", // 粘贴真实 BibTeX，支持反引号包裹的多行字符串；为空时不可复制
  // 页面固定文案与区块标题也集中在这里。
  ui: {
    skip: { en: "Skip to content", zh: "跳转到正文" },
    navHighlights: { en: "Highlights", zh: "亮点" }, navMethod: { en: "Method", zh: "方法" }, navResults: { en: "Results", zh: "结果" }, navDemos: { en: "Demos", zh: "演示" }, navAuthors: { en: "Authors", zh: "作者" },
    projectLabel: { en: "RESEARCH PROJECT", zh: "研究项目" }, projectStatus: { en: "More coming soon", zh: "更多内容即将公布" },
    exploreDemos: { en: "Explore demos", zh: "浏览演示" }, paper: { en: "Paper", zh: "论文" }, docs: { en: "Docs", zh: "文档" }, soon: { en: "Soon", zh: "待发布" },
    overview: { en: "OVERVIEW", zh: "项目概览" }, videoPending: { en: "VIDEO COMING SOON", zh: "演示视频待补充" }, teaserTitle: { en: "A first look at FlashMimic", zh: "初识 FlashMimic" }, teaserNote: { en: "Project film · Coming soon", zh: "项目视频 · 即将上线" }, teaserAccessible: { en: "Decorative motion illustration. The project video will be added later.", zh: "动作示意占位图，项目视频将在后续补充。" },
    contributionsLabel: { en: "01 / CONTRIBUTIONS", zh: "01 / 研究贡献" }, highlightsTitle: { en: "The ideas behind FlashMimic.", zh: "FlashMimic 背后的思考。" }, highlightsDescription: { en: "An overview of the key contributions. Full details will follow.", zh: "关键贡献一览，完整内容即将公布。" },
    methodLabel: { en: "02 / METHOD", zh: "02 / 技术方法" }, methodTitle: { en: "Inside the framework.", zh: "走进方法框架。" }, methodDescription: { en: "The complete method, from an overview to the details that make it work.", zh: "从整体架构到实现细节，在这里了解完整的技术方法。" }, methodFigure: { en: "Framework overview", zh: "方法框架概览" }, figurePending: { en: "Figure coming soon", zh: "图示待补充" }, input: { en: "Input", zh: "输入" }, output: { en: "Output", zh: "输出" }, methodCaption: { en: "Illustrative layout placeholder. The final architecture figure and caption will be added here.", zh: "当前为排版示意占位，正式架构图与图注将在这里补充。" },
    methodNoteOne: { en: "Method overview", zh: "方法概述" }, methodNoteOneText: { en: "A concise explanation of the approach and its main components will appear here.", zh: "这里将简要说明技术方案与核心组成部分。" }, methodNoteTwo: { en: "Implementation details", zh: "实现细节" }, methodNoteTwoText: { en: "Training setup, design choices, and technical details will be shared with the release.", zh: "训练设置、设计选择与技术细节将随项目发布公开。" },
    resultsLabel: { en: "03 / EVALUATION", zh: "03 / 实验评估" }, resultsTitle: { en: "Results, at a glance.", zh: "实验结果，一目了然。" }, resultsDescription: { en: "Quantitative comparisons and analysis will be available with the full project release.", zh: "定量对比与实验分析将随完整项目发布。" }, dataPending: { en: "Results coming soon", zh: "实验结果待补充" }, comparisonCaption: { en: "Quantitative comparison · Data to be announced", zh: "定量对比 · 数据待公布" }, tableMethod: { en: "Method", zh: "方法" }, metricOne: { en: "Metric 01", zh: "指标 01" }, metricTwo: { en: "Metric 02", zh: "指标 02" }, metricThree: { en: "Metric 03", zh: "指标 03" }, tableNote: { en: "— denotes results that have not yet been published.", zh: "— 表示尚未公布的实验结果。" },
    demosLabel: { en: "04 / SHOWCASE", zh: "04 / 项目展示" }, demosTitle: { en: "See FlashMimic in action.", zh: "看看 FlashMimic 的表现。" }, demosDescription: { en: "A space for project videos, visualizations, and more. Stay tuned.", zh: "项目视频、可视化与更多演示将在这里呈现，敬请期待。" }, filterAll: { en: "All", zh: "全部" }, filterVideos: { en: "Videos", zh: "视频" }, filterImages: { en: "Visualizations", zh: "可视化" }, galleryCount: { en: "{count} items", zh: "{count} 项展示" }, demoPending: { en: "COMING SOON", zh: "即将上线" }, videoType: { en: "VIDEO", zh: "视频演示" }, imageType: { en: "VISUALIZATION", zh: "可视化" }, openDemo: { en: "Open demo ↗", zh: "打开演示 ↗" },
    newsLabel: { en: "LATEST", zh: "最新动态" }, newsTitle: { en: "Project updates.", zh: "项目动态。" }, citationLabel: { en: "REFERENCE", zh: "引用信息" }, citationDescription: { en: "Citation information will be available when the paper is released.", zh: "论文发布后将在这里提供引用信息。" }, citationPending: { en: "Coming soon", zh: "待发布" }, citationPlaceholder: { en: "% FlashMimic\n% Citation will be added with the paper release.", zh: "% FlashMimic\n% 论文发布后将在这里补充正式引用。" }, copy: { en: "Copy", zh: "复制" }, copied: { en: "Copied", zh: "已复制" }, copyFailed: { en: "Please select and copy the citation below.", zh: "请选中下方引用文本并手动复制。" },
    authorsLabel: { en: "THE TEAM", zh: "研究团队" }, authorsTitle: { en: "People behind the project.", zh: "项目背后的研究者。" }, authorsPending: { en: "Authors and affiliations will be announced soon.", zh: "作者名单与所属单位即将公布。" }, affiliationPending: { en: "Affiliation to be announced", zh: "所属单位待公布" },
    footerTagline: { en: "Research. Motion. Possibility.", zh: "研究 · 动作 · 更多可能" }, backTop: { en: "Back to top ↑", zh: "返回顶部 ↑" }, footerNote: { en: "More to come. Stay curious.", zh: "更多内容，敬请期待。" }, menuOpen: { en: "Open navigation", zh: "打开导航" }, menuClose: { en: "Close navigation", zh: "关闭导航" }, mediaError: { en: "Media is unavailable. Please check back later.", zh: "素材暂时无法加载，请稍后再试。" }
  }
};
