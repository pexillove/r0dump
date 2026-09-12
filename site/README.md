# r0dump-fusion — 官方静态站

介绍 r0dump-fusion(ART 集成脱壳系统)的官网:特性、原理、Manager、下载、致谢、免责说明、GitHub。
**React + Vite + MUI v6 + framer-motion + react-i18next**,暗色/亮色双主题,配色取自 R0dump Manager 的 Material 3 方案
(暗色 bg `#121318`/primary `#afc6ff`,亮色 bg `#FAF8FF`/primary `#465D91`)。渐变仅在暗色启用,亮色自动切纯色。

## 开发 / 构建

```bash
cd ~/Project/sites/r0dump
npm install
npm run dev       # 本地预览 http://localhost:5173
npm run build     # 产出静态站到 dist/(已分包:mui/motion/i18n/index)
npm run preview   # 预览构建产物
```

`dist/` 为纯静态文件,可托管到 GitHub Pages / Netlify / 任意静态服务器。`vite.config.js` 里 `base: './'` 为相对路径。

## 发布前需替换

1. `src/config.js` 的 `CONFIG`:`github` / `releaseNoGapps` / `releaseGapps` / `patches`(现为 `your-org/...` 占位)。
2. **域名**(SEO 用):把 `your-domain.example` 换成真实域名 ——
   - `index.html` 的 `<link rel="canonical">`、`og:url`、`og:image`、`twitter:image`
   - `public/robots.txt` 的 `Sitemap:`
   - `public/sitemap.xml` 的 `<loc>`

刷机包本体不入库(体积大),建议作为 GitHub Release 资产。

## 特性

- **双主题**:右上角太阳/月亮切换,`class` 策略 + localStorage 持久化 + 跟随系统;切换同步 `<meta theme-color>`。
- **i18n**:中/英一键切换(localStorage 记忆),切换同步 `<html lang>`、`<title>` 与 OG 描述。所有文案在 `src/i18n.js`。
- **动画**:framer-motion 滚动进场、终端逐行、卡片/手机卡悬停、滚动进度条;`<MotionConfig reducedMotion="user">` 尊重系统减少动效偏好。
- **无障碍**:唯一 `<h1>`、图标控件 `aria-label`、锚点 `scroll-padding-top`、亮色对比达 AA。
- **SEO**:description/keywords/author/robots/canonical、Open Graph、Twitter Card、JSON-LD(SoftwareApplication)、`og-image.png`(1200×630)、`apple-touch-icon.png`、`robots.txt`、`sitemap.xml`。

## 结构

```
index.html            入口 + SEO 头
src/main.jsx          挂载(字体 latin 子集 + i18n + MUI 主题桥接)
src/App.jsx           组合 + 语言/SEO 副作用 + 背景/滚动条
src/muiTheme.js       MUI 双主题工厂(Manager M3 配色,无渐变底)
src/theme.jsx         mode Provider(localStorage + theme-color)
src/i18n.js           中英全文案
src/config.js         GitHub / Release 占位 URL
src/index.css         极简全局(网格线 + reduced-motion)
src/components/*.jsx  Nav/Hero/Features/Pipeline/Manager/Download/Thanks/Disclaimer/Footer/ui
public/               favicon.svg / og-image.png / apple-touch-icon.png / robots.txt / sitemap.xml
```
