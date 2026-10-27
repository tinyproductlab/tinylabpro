# TinyProductLab UI / SEO 优化记录

本轮目标：`tinylabpro.com` 首页本身就是全部工具入口，不新增独立 `/tools` 页；统一各子域的品牌返回入口与 Footer，强化各工具的 Title / H1 / description 关键词。不重构工具原有视觉风格，不虚构用户数、评分、评论。

执行原则回顾：
1. 优化主站 Hero 文案与工具卡片层级；
2. 保留现有 8 个工具与 7 个分类筛选；
3. 工具卡片只保留 2 个标签；
4. 所有子域增加统一 TinyProductLab 返回入口 + Footer；
5. 不统一重做各工具视觉；
6. 加强功能型 Title / H1 / description；
7. 不生成大量 SEO 文案，不改变核心功能与数据处理逻辑。

---

## 一、主站 tinylabpro.com

文件：`tinylabpro/app/page.tsx`

### 1. Hero 文案

- 修改前
  - 徽标：`小工具集合 · 持续更新`
  - H1：`小工具，也能做的很好用。`
  - 副文案：`做一些简单、实用、打开就能用的小产品。`
  - 两个按钮：`浏览全部工具 ↓` + `最新：NotebookLM 去水印`
- 修改后
  - 徽标：`8 个小产品 · 持续更新`
  - H1：`把小需求，做成好用的小工具。`
  - 副文案：`简单、实用、专注解决一个具体问题。`
  - 单一按钮：`浏览全部工具 ↓`
- 原因：首屏更干净，下方紧邻工具区，无需再放“最新”按钮；副标题直接点出工具数量，比“无需安装”更准确（KeyScan 有 App）。

### 2. 工具卡片名称与标签（每张卡片最多 2 个标签）

| 产品 | 修改前显示名 | 修改后显示名 | 修改前标签 | 修改后标签 |
| --- | --- | --- | --- | --- |
| KEYSCAN | 本地安全工具箱 | 密码与 OTP 安全工具箱 | 隐私安全 / 本地优先 / 开源 | 隐私安全 / 本地优先 |
| TINY OTP | OTP 动态验证码 | OTP 动态验证码（不变） | 微信小程序 / 无需登录 / WebDAV | 无需登录 / WebDAV |
| SECURE SURVEY | 加密调查问卷 | 加密调查问卷（不变） | 隐私安全 / 无需安装 | 端到端加密 / 无需安装 |
| IMAGE | 图片工坊 | 在线图片工具箱 | 图片处理 / 浏览器本地处理 | 图片处理 / 浏览器本地处理 |
| ADDRESS GEN | 全球地址与人物资料生成器 | 全球地址与人物测试资料生成器 | 249 国 / 16 种语言 / 可离线 | 249 国 / 可离线 |

UNMARK / TEACH / STUDY 的中文功能名保持不变。

- 原因：让用户搜索的功能名称（如“密码与 OTP”“在线图片工具”“测试资料生成”）直接出现在卡片上；卡片只保留最核心的两个标签，详细信息进入工具页再看。

---

## 二、Unmark（unmark.tinylabpro.com）

文件：`unmark/site/index.html`

### 1. Title / OG Title

- 修改前：`unmark · 去掉 PDF 右下角的固定角标水印`
- 修改后：`unmark · NotebookLM 去水印：去掉 PDF/PPTX 右下角角标`
- 原因：目标词明确围绕「NotebookLM 去水印」。

### 2. 品牌返回入口

- 修改前：Header 内有按钮 `小产品实验室主页`
- 修改后：Header 上方新增轻量 topbar：`← TinyProductLab 小产品实验室` → `https://tinylabpro.com/`
- 原因：统一各子域顶部品牌返回入口。

### 3. Footer

- 修改前：`开源 MIT 协议 · GitHub · 反馈问题` + `请只用它处理你有权处理的文件。`
- 修改后：`TinyProductLab · 小产品实验室` + 链接（更多工具 / 关于我们 / 隐私政策 / 使用条款 / 联系我们）+ 保留 `请只用它处理你有权处理的文件。` + `© 2026 TinyProductLab`
- 原因：统一 Footer 结构，同时保留工具自身的重要使用提醒。

---

## 三、KeyScan（keyscan.tinylabpro.com）

文件：`keyscan/index.html`

### 1. Title / OG Title / Description

- 修改前 Title：`KeyScan — 本地优先的安全工具箱`
- 修改后 Title：`KeyScan — 本地优先的密码管理与 OTP 认证器`
- 修改后 description：`KeyScan：本地优先、纯离线可用的密码管理与 OTP 认证器。密码账本、TOTP 动态验证码、安全保险箱、自动填充与端到端加密备份。`
- 原因：让搜索引擎明确理解它是密码管理 + OTP 工具，而非泛化的“安全工具箱”。

### 2. 品牌返回入口

- 修改前：Footer 中有 `小产品实验室主页` 链接
- 修改后：Hero 上方新增 topbar：`← TinyProductLab 小产品实验室`
- 原因：统一顶部品牌入口。

### 3. Footer

- 修改前链接：小产品实验室主页 / OTP / 隐私政策 / 开源地址 / Telegram / 联系开发者 + `© 2026 KeyScan · 开发者 tulkun…`
- 修改后链接：更多工具 / 关于我们 / 隐私政策 / 使用条款 / 联系我们 / 开源地址 + `© 2026 TinyProductLab`
- 原因：统一 Footer 链接集与版权归属，保留开源地址与微信公众号二维码。

---

## 四、Tiny OTP（otp.tinylabpro.com）

文件：`otp/site/index.html`、`otp/site/style.css`

### 1. Title / OG Title / Description

- 修改前 Title：`小产品实验室 OTP · 本地优先的安全工具`
- 修改后 Title：`小产品实验室 OTP · TOTP 动态验证码与密码账本工具`
- 修改后 description：`小产品实验室 OTP：本地优先的 TOTP 动态验证码、密码账本与加密备份工具。无需登录，支持 WebDAV 同步。`
- 原因：明确“TOTP 动态验证码”这个功能关键词。

### 2. Hero 副标题

- 修改前：eyebrow 为 `WECHAT MINI PROGRAM · OPEN SOURCE`，H1 为 `验证码和备份，留在自己手里。`
- 修改后：eyebrow 改为 `OTP / TOTP 动态验证码工具`，H1 保持 `验证码和备份，留在自己手里。`
- 原因：在不破坏现有设计的前提下，让搜索引擎知道这是什么工具。

### 3. Footer

- 修改前：`小产品实验室 OTP · MIT License` + `tinylabpro.com`
- 修改后：`TinyProductLab · 小产品实验室` + 链接（更多工具 / 关于我们 / 隐私政策 / 使用条款 / 联系我们）+ `© 2026 TinyProductLab · MIT License`
- 原因：统一 Footer。

---

## 五、教师工具箱（teach.tinylabpro.com）

文件：`teacher-tools/scripts/build-pages.mjs`（模板源）、`teacher-tools/assets/css/base.css`，运行 `node scripts/build-pages.mjs` 重新生成全部页面。

### 1. 首页 Title

- 修改前：`教师工具箱 | tinyproductlab`
- 修改后：`教师工具箱｜课堂随机点名、分组、计时、座位表等在线教师工具`
- 原因：明确核心功能关键词，利于搜索落地。

### 2. 品牌返回入口（导航）

- 修改前：导航项 `小产品实验室` → `https://tinylabpro.com/`
- 修改后：导航项 `← TinyProductLab 小产品实验室` → `https://tinylabpro.com/`
- 原因：统一品牌返回入口文案。

### 3. Footer

- 修改前：域名助记 + 微信公众号二维码 + `教学数据只保存在本机浏览器，不会上传服务器。`
- 修改后：保留原有域名助记与公众号二维码，新增品牌行：`TinyProductLab · 小产品实验室` + 链接（更多工具 / 关于我们 / 隐私政策 / 使用条款 / 联系我们）+ `© 2026 TinyProductLab`
- 原因：在保留工具自身特色（域名助记、隐私说明）的同时，统一品牌 Footer。

---

## 六、图片工坊 / 在线图片工具箱（image.tinylabpro.com）

文件：`photo/index.html`、`photo/src/main.js`、`photo/src/footer-compact.css`

### 1. Title / Description

- 修改前 Title：`图片工坊 · 小产品实验室`
- 修改后 Title：`图片工坊 · 在线图片工具箱：证件照、压缩、改尺寸、去背景`
- 修改后 description：`图片工坊：在线图片工具箱，含证件照制作、图片压缩、改尺寸、裁剪、去背景、加水印、拼图等 9 个工具，照片默认只在浏览器本地处理。`
- 原因：用功能词强化 SEO。

### 2. 品牌返回入口

- 修改前：导航按钮 `全部工具` → `https://tinylabpro.com/`
- 修改后：导航按钮 `← TinyProductLab 小产品实验室` → `https://tinylabpro.com/`
- 原因：统一品牌返回入口文案。

### 3. Footer

- 修改前：微信公众号联系卡片 + 域名助记
- 修改后：在原内容下方新增品牌行：`TinyProductLab · 小产品实验室` + 链接（更多工具 / 关于我们 / 隐私政策 / 使用条款 / 联系我们）+ `© 2026 TinyProductLab`
- 原因：统一 Footer。

---

## 七、本轮未覆盖（本地无对应仓库）

以下 3 个子域的本地仓库未在工作区找到，本轮未修改。需在拉取对应仓库后按同样原则处理：

1. **study.tinylabpro.com（学生工具箱）**
   - 建议：检查 43 个工具中重要项是否有独立可索引 URL（如 `/tools/gpa`、`/tools/math-formula`、`/tools/vocabulary`）。
   - 增加统一 TinyProductLab 返回入口 + Footer。

2. **survey.tinylabpro.com（加密调查问卷）**
   - 建议：补充使用说明（创建问卷 → 分享二维码 → 查看结果）、端到端加密原理、与普通问卷的区别、数据保存时长、适用场景、FAQ（约一屏半）。
   - 增加统一 TinyProductLab 返回入口 + Footer。
   - 强化 Title / H1 / description 围绕「端到端加密问卷 / 加密调查问卷」。

3. **addressgen.tinylabpro.com（全球地址与人物测试资料生成器）**
   - 建议（优先）：固定主 H1 为 `全球地址与人物测试资料生成器`，下方根据用户选择显示 `当前：日本 / 日本地址与人物资料`，避免 Google 因默认国家而把整站理解为“日本地址生成器”。
   - 增加统一 TinyProductLab 返回入口 + Footer。

---

## 八、统一的品牌识别元素（仅统一这 5 项）

1. TinyProductLab Logo / 品牌名
2. 字体体系（各站保留原有）
3. 圆角尺度（各站保留原有）
4. 返回主站入口：`← TinyProductLab 小产品实验室` → `https://tinylabpro.com/`
5. Footer 链接：更多工具 / 关于我们 / 隐私政策 / 使用条款 / 联系我们 + `© 2026 TinyProductLab`

各产品颜色与视觉风格保持独立，不做模板化统一。

---

## 九、验证

- tinylabpro：`npm run build` 构建通过（252 modules，406ms）。
- teacher-tools：`node scripts/build-pages.mjs` 成功重新生成全部页面。
- photo：`node --check src/main.js` 语法通过。
- 各站关键字（Title、品牌入口、Footer 链接）均已 grep 确认存在。

未修改任何核心功能与数据处理逻辑；未新增新闻、SEO 文章、用户评价、使用人数、排行榜或广告位。
