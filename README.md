# FlashMimic 项目主页

参考 [UniLab](https://unilabsim.github.io/) 的深色科研项目长页排版，搭建 FlashMimic 网页框架。纯 HTML / CSS / JavaScript，无需安装依赖或构建，兼容 GitHub Pages。

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
| 结果图与图注 | `results` | `assets/images/` 下的 SVG、PNG、WebP |
| 对比表格 | `comparison` | 每行 `values` 对应三个指标 |
| 视频 / 图片展示 | `demos` | `type` 为 `video` 或 `image`；`src` 为素材路径 |
| 演示跳转链接 | `demos[].url` | 可选，填写后出现“打开演示”链接 |
| 项目动态 | `news` | 日期格式 `YYYY-MM-DD`，自动倒序 |
| 作者与单位 | `authors`、`affiliations` | 标志放 `assets/logos/` |
| 引用信息 | `citation` | 粘贴真实 BibTeX 多行字符串 |
| 各区块标题、固定文案 | `ui` | 中英文分别填写 |

空媒体路径保留占位，不请求不存在的文件。未提供的论文、文档和引用显示待发布状态。当前指标、方法示意与图表均为明确标注的占位，不代表真实实验结论。视频使用浏览器原生控件，默认不自动播放。

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

`hero.video` 留空但填写 `hero.poster` 时，首屏显示静态封面。修改表头名称请编辑 `ui.metricOne`、`ui.metricTwo`、`ui.metricThree`。正式数据发布后，也请同步修改 `ui.comparisonCaption` 和 `ui.tableNote`。

## 文件说明

- `index.html`：语义结构、导航、区块和默认占位。
- `styles.css`：主题、排版和响应式样式；主要颜色在 `:root` 中。
- `site-content.js`：可维护内容、素材路径和双语文案。
- `app.js`：内容渲染、语言切换、移动导航、展示筛选与引用复制。
- `assets/`：项目素材。

语言选择会保存在浏览器中。页面支持键盘导航、焦点提示、减少动态效果偏好和手机端菜单。提交到仓库的 GitHub Pages 发布分支后，可沿用仓库原有发布设置。
