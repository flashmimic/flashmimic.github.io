# FlashMimic 项目主页

参考 [UniLab](https://unilabsim.github.io/) 的深色科研项目长页排版，展示 FlashMimic 的系统框架、实验结果与机器人演示。纯 HTML / CSS / JavaScript，无需安装依赖或构建，兼容 GitHub Pages。

当前 `main` 已接入 FlashMimic 项目 `logs/g1_batch_v1` 的五个 G1 策略，
以及 `g1_fightAndSports_10s_20261022_60k` 的格斗与运动策略，共六个交互演示。
在 `#demos` 中点击卡片即可加载浏览器物理仿真，支持旋转、缩放、暂停、重置与扰动。
实现方法、模型更新和验证见 [交互 demo 文档](docs/WEB_DEMOS.md)。npm / Python 只用于更新导出素材，预览和部署不需要构建。

## 本地查看

在项目目录运行 `python3 -m http.server 8000`，访问 `http://localhost:8000`。也可直接打开 `index.html`；复制引用建议使用 localhost 或 HTTPS。

## 后续补充素材

主要编辑 `site-content.js`，文字支持 `{ en: "English", zh: "中文" }`，也可以直接填写字符串，两种语言将共用该文本。

| 内容 | 配置位置 | 建议素材位置 |
| --- | --- | --- |
| 副标题、简介 | `hero.subtitle`、`hero.description` | 直接填写文案 |
| 论文、代码、文档链接 | `links` | PDF 可放 `assets/`，或填完整网址 |
| 首屏视频 / 封面 | `hero.video`、`hero.poster` | `assets/videos/teaser.mp4`、`assets/images/teaser.webp` |
| 概览指标 | `stats` | 填写真实数值、名称和说明 |
| 贡献亮点 | `highlights` | 可增减条目 |
| 方法架构图 | `method.image`、`method.caption` | `assets/images/architecture.svg` |
| 训练效率主图与图注 | `timeTarget`、`ui` | 展示学习进展，使用总结性说明 |
| 对比表格 | `comparisonColumns`、`comparison` | 每行 `values` 对应方法名之外的表头 |
| 结果说明 | `ui.tableNote` | 简要保留计时来源与参考数据的必要说明 |
| 视频 / 图片展示 | `demos` | `type` 为 `video` 或 `image`；`src` 为素材路径 |
| 交互仿真 | `demos` | `type: "interactive"`，`id` 对应 `assets/sim/manifest.json`；`poster` 为封面 |
| 演示跳转链接 | `demos[].url` | 可选，填写后出现“打开演示”链接 |
| 作者与单位 | `authors`、`affiliations` | 标志放 `assets/logos/` |
| 引用信息 | `citation` | 粘贴真实 BibTeX 多行字符串 |
| 各区块标题、固定文案 | `ui` | 中英文分别填写 |

展示页保留方法框架、结果对比、训练效率与机器人演示。方法图使用独立深色画布，页面不显示原始 SVG/PDF/CSV/ZIP 下载入口及详细审阅面板；原始材料仍可用于仓库内维护。未提供的论文、作者与引用仍显示待发布状态。视频使用浏览器原生控件，默认不自动播放。

### 研究材料与统计口径

运行 `python3 scripts/import-research-materials.py /path/to/source-materials` 可从本次原始 JPG/SVG/PDF/Markdown 及两个 ZIP 更新图表和轻量数据包。脚本仅复制指定文件、按原始 SVG 裁出单动作视图，并从 `SELECTED_CHECKPOINTS.json` 的未取整实测数据重算四方法均值。网页表格文案位于 `site-content.js`，数据更新后需同步核对。

- 主表任务为 dance、walk、run、flip、carry；现有交互演示为 dance、flip、run、sprint、walk、fight & sports，权重也不同。
- 完成比例以五任务为分母；误差与时间仅在各方法成功动作中等权平均（BeyondMimic 4、Holosoma 3、其余 5）。每个所选权重仅一次确定性回放，不代表多种子成功概率。
- 表中的 Extended† 为参考行，均值包含手动调整的 dance 误差，不作为实测精度比较。其余误差与时间按成功动作汇总；计时混有直接记录、折算与估计，页面以简短注释说明。
- 曲线指标为 13 个非 torso link、积分后状态；精度表为 14 个 link、动作前状态，不混用数值。
- `assets/downloads/research-data-20261015.zip` 是约 101 KB 的绘图与审阅子集，不包含权重、轨迹和可运行环境。原始大型 ZIP 留在网站仓库之外。

### 示例：添加演示视频

```js
{
  type: "video",
  title: { en: "Demo title", zh: "演示标题" },
  description: { en: "Demo description", zh: "演示说明" },
  src: "assets/videos/demo-01.mp4",
  poster: "assets/images/demo-01.webp",
  url: ""
}
```

`hero.video` 留空但填写 `hero.poster` 时，首屏显示静态封面。修改表头名称请编辑 `comparisonColumns`，同时同步 `comparison`、`ui.comparisonCaption` 和 `ui.tableNote`。

## 文件说明

- `index.html`：语义结构、导航、区块和默认占位。
- `styles.css`：主题、排版和响应式样式；主要颜色在 `:root` 中。
- `site-content.js`：可维护内容、素材路径和双语文案。
- `app.js`：内容渲染、语言切换、移动导航、展示筛选与引用复制。
- `assets/`：项目素材。

语言选择会保存在浏览器中。页面支持键盘导航、焦点提示、减少动态效果偏好和手机端菜单。提交到仓库的 GitHub Pages 发布分支后，可沿用仓库原有发布设置。
