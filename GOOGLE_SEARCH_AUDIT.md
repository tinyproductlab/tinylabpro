# TinyProductLab 全站 Google 搜索与收录审计

审计时间：2026-09-05
审计范围：`tinylabpro.com` 及源码、导航、footer、工具卡片、sitemap 中能发现的全部 `*.tinylabpro.com` 子域
审计方式：以 Googlebot User-Agent 实际抓取 9 个域名 / 113 个 sitemap URL，并用 Chrome DevTools Protocol 在
375 / 390 / 430 / 768 四种真实移动视口下渲染验证

> **关于收录状态**：本报告**不判断**任何 URL 是否已被 Google 收录。
> Search Console 是站长私有数据，脚本无法访问。所有"是否已收录"必须由你在
> Search Console 人工确认，清单见 `SEARCH_CONSOLE_CHECKLIST.md`。
> 本报告只回答一件事：**技术上是否允许并便于 Google 发现、抓取、理解。**

---

## 1. 全站概况

- 域名数量：**9**（1 主站 + 8 工具子域）
- sitemap 声明的 URL 总数：**113**
- 抓取返回 200 的：**108**（其余 5 个见 P0-3，已修复）
- 被 `noindex` / `robots.txt` 阻止的公开页面：**0** ✅
- 发现问题：**P0 4 项 / P1 6 项 / P2 4 项**

### 网站清单

| 域名 | 页面名称 | 状态 | 是否公开 | 应否被收录 |
|---|---|---|---|---|
| tinylabpro.com | 主站（工具导航 + 关于/联系/隐私/条款/免责） | 200 | 是 | ✅ 应收录 |
| unmark.tinylabpro.com | NotebookLM 去水印 | 200 | 是 | ✅ 应收录（SEO 重点） |
| teach.tinylabpro.com | 教师工具箱（22 页） | 200 | 是 | ✅ 应收录 |
| study.tinylabpro.com | 学生工具箱（50 页） | 200 | 是 | ✅ 应收录 |
| keyscan.tinylabpro.com | 本地安全工具箱 | 200 | 是 | ✅ 应收录 |
| otp.tinylabpro.com | OTP 动态验证码 | 200 | 是 | ✅ 应收录 |
| survey.tinylabpro.com | 加密调查问卷（4 页） | 200 | 是 | ✅ 应收录 |
| image.tinylabpro.com | 图片工坊 | 200 | 是 | ✅ 应收录 |
| addressgen.tinylabpro.com | 全球地址与人物资料生成器（27 页） | 200 | 是 | ✅ 应收录 |

未发现任何仅存在于配置中、线上不可达的子域；也未凭空添加不存在的域名。

---

## 2. P0 — 必须修复

### P0-1　keyscan 的 HTTP 不跳 HTTPS，两个协议返回完全相同内容

```
http://keyscan.tinylabpro.com/   → 200（直接返回内容，没有跳转）
https://keyscan.tinylabpro.com/  → 200
两者 md5 完全一致：49a166fe2a0bf3de10e5d29fbd909a95
```

其余 8 个域名均为 `http → 301 → https`，只有 keyscan 例外。后果是同一份内容存在
http / https 两个可抓取版本，且页面**没有 canonical**（见 P1-1），Google 需要自行猜测
保留哪个。

**这一项改不了代码**——属于 Cloudflare 侧配置。请在 Cloudflare 该站点下开启
`SSL/TLS → Edge Certificates → Always Use HTTPS`。

**状态：未修复（需要你在 Cloudflare 后台操作）**

### P0-2　addressgen 软 404：任意不存在的 URL 返回 200 + 首页内容

```
https://addressgen.tinylabpro.com/this-page-does-not-exist-xyz123
→ 200，<title>全球地址与人物资料生成器 - 小产品实验室</title>
```

站点没有 `404.html`，Cloudflare Pages 于是把所有未匹配路径当作 SPA 回落，
返回 200 和首页内容。Google 会把**无限多的垃圾 URL**当成首页的重复页面收录，
既浪费抓取预算，也会稀释首页的信号。

对比：其余 8 个域名的不存在路径都正确返回 404。

**状态：已修复**，补了 `404.html`（`noindex,follow`），Pages 会用它返回真正的 404 状态码。**待部署验证**。

### P0-3　addressgen 的 sitemap 指向 308 重定向

sitemap 里写的是 `/privacy.html`、`/terms.html`、`/about.html`、`/sources.html`，
而 Cloudflare Pages 会把它们 308 到无扩展名地址；页面自己的 canonical 也指向无扩展名版本。
sitemap 应当只包含**最终的 canonical URL**。

> 这一条是我在上一轮改 `build-pages.mjs` 时引入的——原来的 sitemap 写的就是无扩展名版本。

**状态：已修复**，sitemap 改为 `/privacy` 等无扩展名地址。**待部署验证**。

### P0-4　主站的修复尚未上线（部署阻塞）

主站是 **Cloudflare Worker**（worker 名 `sites-project`），仓库里既没有 GitHub Actions，
也没有 wrangler 配置文件——不像 addressgen / teach 那样 push 即自动部署。
上一轮的图片瘦身（1891KB → 27KB）、JSON-LD、`_headers` 已经提交到 GitHub，但**线上仍是旧版**。

部署命令：

```bash
cd ~/.x-repo/github.com/tinyproductlab/tinylabpro
npm run build && npx wrangler deploy --config dist/server/wrangler.json
```

**状态：代码已就绪，等待部署**

---

## 3. P1 — SEO 重点优化

### P1-1　80 个 URL 缺少 self-canonical

| 域名 | 缺 canonical 的 URL 数 |
|---|---:|
| study.tinylabpro.com | 50 |
| teach.tinylabpro.com | 22 |
| unmark.tinylabpro.com | 1（首页） |
| keyscan.tinylabpro.com | 1（首页） |
| otp.tinylabpro.com | 1（首页） |

已有 self-canonical 的：主站、survey、image、addressgen。

canonical 缺失本身不阻止收录，但在出现 `/page` 与 `/page/`、http 与 https、
带参数与不带参数等多版本时，Google 只能自行选择。**unmark 是 SEO 重点页却缺 canonical**，
优先补。keyscan 同时存在 P0-1 的 http/https 双版本，缺 canonical 会放大问题。

建议每页加：`<link rel="canonical" href="https://<域名>/<路径>">`

### P1-2　unmark 没有 sitemap；keyscan / otp 连 robots.txt 都没有

| 域名 | robots.txt | sitemap.xml | robots 里声明 Sitemap |
|---|---|---|---|
| unmark | 200 | **404** | ❌ |
| keyscan | **404** | **404** | ❌ |
| otp | **404** | **404** | ❌ |

robots.txt 返回 404 不等于禁止抓取（Google 会按"允许全部"处理），所以这**不是** P0。
但 unmark 作为主推的 SEO 落地页没有 sitemap，keyscan / otp 也缺少发现入口。
建议至少各加一个只含首页的 sitemap，并在 robots.txt 里声明。

### P1-3　image.tinylabpro.com 的正文完全依赖 JS 渲染

```
原始 HTML 正文：13 字符（只有 <div id="app"></div>）
JS 渲染后：962 字符，H1「把照片处理成刚刚好的样子」
```

Google 能渲染 JS，但渲染是**排在抓取之后的独立队列**，收录会明显变慢，
渲染失败时页面等于空白。该站是 9 个域名里唯一原始 HTML 近乎为空的。

不建议为此重构整个应用。低成本做法：在 `index.html` 里直接写入 H1、一句话介绍
和 9 个工具的名称与说明（SSG 或手写静态内容都可以），让首屏文本无需 JS 就存在。

对比参考：`unmark` 原始 HTML 就有 2598 字符正文，是这批站里做得最好的。

### P1-4　study 工具页正文过薄（Thin Content）

50 个工具页的原始 HTML 正文普遍只有 **232～240 字符**，JS 渲染后也只到约 318 字符。

```
study.tinylabpro.com/tools/flashcards/     原始 236 → 渲染后 318
study.tinylabpro.com/tools/periodic-table/ 原始 232
study.tinylabpro.com/tools/reading-timer/  原始 235
```

页面基本只有"标题 + 工具本体"。建议每页补：一句话介绍、使用步骤、适用场景、
数据处理说明、2～3 条常见问题、相关工具链接。不需要写长，重点是**真实且与工具一致**。

### P1-5　子站回链主站不完整

| 子域 | 主站是否链接 | 子域是否回链主站 | 状态 |
|---|---|---|---|
| unmark | ✅ | ❌ **无** | 待补 |
| teach | ✅ | ✅（已修，见第 6 节） | ✅ |
| study | ✅ | ✅ | ✅ |
| keyscan | ✅ | ✅ | ✅ |
| otp | ✅ | ✅ | ✅ |
| survey | ✅ | ✅ | ✅ |
| image | ✅ | ⚠️ 仅 JS 渲染后存在 | 建议写进静态 HTML |
| addressgen | ✅ | ✅（已修，见第 6 节） | ✅ |

主站指向各工具的 anchor text 质量良好——整张卡片是链接，锚文本包含工具全名与说明
（如「NotebookLM 去水印 批量清理 PDF / PPTX 水印…」），不是"点击这里"。这一项无需改。

### P1-6　全站没有 HSTS

9 个域名均未返回 `Strict-Transport-Security`。这不影响收录，但属于 HTTPS 加固的常规项。
主站的 `_headers` 已经加上（待部署）；其余站点建议在 Cloudflare 侧统一开启 HSTS。

---

## 4. P2 — 后续优化

### P2-1　Open Graph 覆盖不全

| 域名 | og:title | og:image | og:url |
|---|---|---|---|
| tinylabpro.com | ✅ | ✅ | ✅ |
| survey | ✅ | ✅ | ✅ |
| addressgen | ✅ | ❌ | ✅ |
| unmark / teach / study / keyscan / otp / image | ❌ | ❌ | ❌ |

影响的是微信、X、Discord 里的分享卡片外观，与排名无关。**unmark 值得优先补**——
去水印类工具很依赖社群转发。

### P2-2　结构化数据几乎为空

抓取时只有 survey 与 addressgen 各有 1 个 JSON-LD 块。主站的 `WebSite + Organization +
ItemList + FAQPage` 已写好但**尚未部署**（P0-4）。

建议各工具站补 `WebApplication` 或 `SoftwareApplication`，只写真实信息。
**严禁**假评分、假评论、假用户量——这类结构化数据会直接招致人工处置。

### P2-3　图片 SEO

主站 9 张图全部有描述性 alt（"NotebookLM 去水印 Logo"等），无关键词堆砌。✅
已在上一轮补上 `width`/`height`（待部署）。

**遗留问题**：`teach-logo.png` 与 `study-logo.png` 是**像素级相同的同一张图**，
教师工具箱和学生工具箱在首页图标完全一样，加上其余几个也是同款蓝色立方体，
8 张卡片辨识度很低。这需要新图标资源，不是代码能解决的。

### P2-4　语言声明不一致

`unmark` 与 `keyscan` 用 `lang="zh-Hans"`，其余 7 个站用 `lang="zh-CN"`。
两者都合法，Google 都能理解，但建议统一。unmark 页面有中/EN 切换，
若英文版有独立 URL，应补 `hreflang`；当前未发现独立英文 URL。

---

## 5. 各子域单独报告

> 评分只针对**技术 SEO 与页面内容**，不代表实际排名。
> 「可发现 / 可抓取 / 可索引」= 技术上是否允许，**不等于**已经被收录。

### tinylabpro.com — 主站

```
HTTP → HTTPS：301 ✅        www → 无 www：301 ✅
robots.txt：200，声明 Sitemap ✅
sitemap.xml：200，6 个 URL，全部 200、无重定向、无 noindex ✅
canonical：self ✅          noindex：无 ✅
Title：TinyProductLab - 简单实用的在线工具集合 ✅
Description：有，准确 ✅     H1：小工具，也能做的很好用。⚠️ 未含品牌与品类词
正文完整度：1254 字符，含 8 个工具卡 + 关于 + FAQ ✅
内部链接：指向全部 8 个子域，anchor text 优秀 ✅
移动端：375/390/430/768 均无横向溢出 ✅
性能：HTML br 后 9.5KB ✅；但线上图片仍 1891KB ❌（修复待部署）
```

- Primary Keyword：在线工具集合 / 小工具
- Secondary：图片处理工具、教师工具、学生工具、隐私安全工具
- Brand：TinyProductLab、小产品实验室
- **SEO Score：78/100**（扣分：图片未部署、H1 偏文艺、结构化数据未上线）
- 风险：**P0-4（部署阻塞）**

### unmark.tinylabpro.com — NotebookLM 去水印（SEO 重点，见第 8 节专项）

```
HTTP → HTTPS：301 ✅        robots.txt：200（未声明 Sitemap ❌）
sitemap.xml：404 ❌         canonical：❌ 无
noindex：无 ✅              Title：unmark — NotebookLM 去水印 ⚠️ 品牌在前
H1：干净地去掉 NotebookLM 水印 ✅
正文：原始 HTML 2598 字符，无需 JS 即可读到 ✅（全站最佳）
关键词自然分布：NotebookLM×9、水印×17、去水印×6、PDF×11 ✅ 无堆砌
移动端：无横向溢出 ✅        og / 结构化数据：❌ 无
```

- **SEO Score：72/100**
- 风险：**P1**（缺 canonical + 缺 sitemap + 缺回链主站）

### teach.tinylabpro.com — 教师工具箱

```
HTTP → HTTPS：301 ✅        robots.txt：200，声明 Sitemap ✅
sitemap.xml：200，22 个 URL 全部 200 ✅
canonical：❌ 22 页全缺      noindex：无 ✅
Title：教师工具箱 | tinyproductlab ⚠️ 品牌小写不统一
H1：教师工具箱 · 让每一节课更轻松 ✅
正文：原始 471 字符，渲染后更多；工具列表由 JS 输出 ⚠️
回链主站：✅（本次修复）      移动端：无横向溢出 ✅
```

- **SEO Score：74/100**
- 风险：**P1**（canonical）

### study.tinylabpro.com — 学生工具箱

```
sitemap：200，50 个 URL 全部 200 ✅   canonical：❌ 50 页全缺
Title / H1：有且各页不同 ✅          正文：工具页 232～240 字符 ❌ Thin
移动端：无横向溢出 ✅
```

- **SEO Score：66/100**（页面数最多，但单页内容最薄）
- 风险：**P1**（Thin Content + canonical 全缺）

### keyscan.tinylabpro.com — 本地安全工具箱

```
HTTP → HTTPS：❌ 200 不跳转（P0-1）   robots.txt：404   sitemap：404
canonical：❌ 无                     Title：KeyScan — 本地优先的安全工具箱 ✅
H1：KeyScan ⚠️ 只有品牌名，不表达功能
正文：原始 1052 → 渲染后 3441 字符 ✅   移动端：无横向溢出 ✅
```

- **SEO Score：55/100**（全站最低）
- 风险：**P0**（http/https 双版本 + 无 canonical，重复内容风险最高）

### otp.tinylabpro.com — OTP 动态验证码

```
HTTP → HTTPS：301 ✅   robots.txt：404   sitemap：404   canonical：❌ 无
Title：小产品实验室 OTP · 本地优先的安全工具 ⚠️ 品牌在前，未含"动态验证码/2FA"
H1：有 ✅   正文：919 字符   移动端：无横向溢出 ✅
```

- **SEO Score：62/100**
- 风险：**P1**

### survey.tinylabpro.com — 加密调查问卷

```
全部基础项齐备：robots ✅ sitemap（4 URL）✅ canonical self ✅
og:title / og:image / og:url ✅   JSON-LD ×1 ✅
Title：端到端加密的在线问卷 · 扫码填写 · 免注册 - 加密调查问卷 ✅ 关键词清晰
正文：原始 308 → 渲染后 873 字符 ⚠️ 依赖 JS
移动端：无横向溢出 ✅
```

- **SEO Score：82/100**（这批站里技术 SEO 最完整）
- 风险：**P2**

### image.tinylabpro.com — 图片工坊

```
robots ✅ sitemap（1 URL）✅ canonical self ✅
Title：图片工坊 · 小产品实验室 ✅
H1：原始 HTML ❌ 无，渲染后才有
正文：原始 13 字符 ❌ 全靠 JS   移动端：无横向溢出 ✅
```

- **SEO Score：58/100**
- 风险：**P1**（首屏内容不可直接抓取）

### addressgen.tinylabpro.com — 全球地址与人物资料生成器

```
HTTP → HTTPS：301 ✅   robots ✅ 声明 Sitemap ✅   sitemap：27 URL
canonical：self ✅     noindex：仅 /u/ 与 404（正确）✅
Title / Description / H1：22 个国家页各自独立 ✅
正文：602 字符 + 22 个国家页各有独立说明 ✅
JSON-LD ×1 ✅   移动端：无横向溢出 ✅   PWA：可安装 ✅
软 404：❌ 已修待部署（P0-2）   sitemap 指向重定向：❌ 已修待部署（P0-3）
```

- **SEO Score：80/100**（修复部署后可达 88）
- 风险：**P0-2 / P0-3（已修，待部署）**

---

## 6. 本次自动修复清单

只修复了**明确属于技术错误**的项，未做主观改写。

| 仓库 / 文件 | 修改内容 | 原因 |
|---|---|---|
| address-generator `404.html` | 新增真正的 404 页（noindex,follow） | 消除软 404：此前任意 URL 返回 200 + 首页 |
| address-generator `scripts/build-pages.mjs` | sitemap 改为 `/privacy` 等无扩展名地址 | sitemap 不应指向 308 重定向；此错误由我上一轮引入 |
| address-generator `scripts/check-release.mjs` | 允许无扩展名 sitemap 项；noindex 页不要求 canonical | 配合上面两项 |
| address-generator 22 个国家页 + 404 | 同步主站链接 | `3c2ef69` 只改了模板 index.html，生成页需重新生成才有 |
| teacher-tools `scripts/build-pages.mjs` | NAV 加入「小产品实验室」主站链接 | `927b89d` 手工加在生成产物里，被我上一轮的 build 覆盖（我引入的回归） |
| teacher-tools `scripts/check-acceptance.mjs` | 导航检查从「写死 7 项」改为「各页一致 + 必须含主站链接」 | 写死的数字既挡不住上面那种漏改，改导航时还会误报 |
| tinylabpro `app/layout.tsx` | JSON-LD：WebSite + Organization + ItemList + FAQPage | 全站此前 0 个结构化数据 |
| tinylabpro `public/_headers` | HSTS 等安全头 + 图片缓存 | 此前无任何安全头，图片 `max-age=0` |
| tinylabpro `app/sitemap.xml/route.ts` | 首页 loc 与 canonical 统一 | 一个带尾斜杠一个不带 |

**未自动修改**（属于判断题或需后台操作，留给你决定）：

- keyscan 的 Always Use HTTPS（Cloudflare 后台）
- unmark / keyscan / otp 的 canonical、sitemap、robots.txt
- image 的首屏静态化
- study 工具页补内容
- 各站 Title / H1 的措辞调整（见第 7 节建议）
- teach / study 重复图标

---

## 7. Title / H1 建议

不做自动修改——标题措辞属于你的品牌决定。以下为建议：

| URL | 当前 Title | 建议 Title | 建议理由 |
|---|---|---|---|
| unmark | `unmark — NotebookLM 去水印` | `NotebookLM 去水印工具 - PDF / PPTX 角标清理 \| TinyProductLab` | 品牌 `unmark` 无搜索量，应把功能词放最前 |
| keyscan | `KeyScan — 本地优先的安全工具箱` | `本地密码管理与 OTP 工具箱 - KeyScan \| TinyProductLab` | 同上；H1 目前只有「KeyScan」，不表达功能 |
| otp | `小产品实验室 OTP · 本地优先的安全工具` | `OTP 动态验证码管理 - 2FA 备份与 WebDAV 同步 \| TinyProductLab` | 补「2FA」「动态验证码」等实际搜索词 |
| teach | `教师工具箱 \| tinyproductlab` | `教师课堂工具箱 - 随机点名 / 分组 / 计时 \| TinyProductLab` | 品牌大小写不统一；可补具体工具名 |
| tinylabpro.com H1 | `小工具，也能做的很好用。` | 保留，但在其下方加一句含品类词的说明 | H1 有品牌调性，不必为 SEO 牺牲；靠副标题补关键词即可 |

**不要**为此在页面里重复堆砌关键词。目标是让 Google 明白页面解决什么问题。

---

## 8. Unmark 专项检查（对应任务 AB）

目标关键词：`NotebookLM 去水印` / `NotebookLM 水印` / `NotebookLM 水印去除` / `NotebookLM 去除水印`

| 检查项 | 结果 |
|---|---|
| title 含 NotebookLM + 去水印 | ✅ `unmark — NotebookLM 去水印`（但品牌在最前，建议调序） |
| H1 明确 | ✅ `干净地去掉 NotebookLM 水印` |
| description | ✅ `去掉 NotebookLM 导出的 PDF / PPTX 右下角那个固定角标。只动水印那一小块，原件不改动。` |
| 正文前 200～300 字 | ✅ 首段即出现 NotebookLM、PDF、PPTX、去水印，自然不堆砌 |
| 页面是否纯 JS | ✅ **否**，原始 HTML 就有 2598 字符正文，Googlebot 无需渲染即可读到 |
| FAQ | ❌ 无 |
| 主站 anchor text | ✅ 「NotebookLM 去水印」+ 完整描述 |
| sitemap | ❌ **404** |
| canonical | ❌ **无** |
| robots / noindex | ✅ 允许抓取，无 noindex |
| og / 结构化数据 | ❌ 无 |

**结论**：unmark 的内容侧是这批站里做得最好的（正文可直接抓取、关键词自然）。
短板全在技术配置：**canonical、sitemap、FAQ、og** 四项。这四项补齐后，
它是最有希望先跑出排名的页面。

**建议优先级**：canonical > sitemap > FAQ（3～5 条真实问题）> og:image

---

## 9. Google Search Essentials 风险扫描（对应任务 Z）

| 风险项 | 结果 |
|---|---|
| 隐藏关键词 / 隐藏文本 | ✅ 未发现 |
| 关键词堆砌 | ✅ 未发现（unmark 关键词密度自然） |
| Doorway pages | ✅ 未发现 |
| 自动生成的近似重复页面 | ⚠️ addressgen 的 22 个国家页由模板生成，但**每页有独立的 title、description、H1 与本国地址格式/城市数据**，属于合理的模板化内容，非 doorway |
| Cloaking | ✅ 未发现（Googlebot 与浏览器 UA 返回内容一致） |
| 误导性跳转 | ✅ 未发现 |
| 抄袭内容 | ✅ 未发现 |
| 大量无价值 AI 页面 | ✅ 未发现 |

无需为"防 SEO 惩罚"做额外处理。

---

## 10. AdSense 准备度复核（对应任务 AP）

| 检查项 | 结果 |
|---|---|
| About | ✅ tinylabpro.com/about 200 |
| Contact | ✅ /contact 200 |
| Privacy | ✅ /privacy 200 |
| Terms | ✅ /terms 200 |
| Disclaimer | ✅ /disclaimer 200 |
| Footer / 导航 | ✅ 齐全 |
| 工具真实可用 | ✅ 8 个子站全部可达，功能真实 |
| 大量空页面 | ⚠️ study 的 50 个工具页内容偏薄（P1-4） |
| 误导内容 / 恶意下载 / 隐藏内容 | ✅ 未发现 |
| 测试模板残留 | ✅ 未发现 |

**子站政策页缺失情况**（主站齐全，子站不一致）：

| 子域 | privacy | about |
|---|---|---|
| teach / study | ✅ | ✅ |
| addressgen | ✅ | ✅ |
| survey | ✅ | ❌ |
| unmark / keyscan / otp / image | ❌ | ❌ |

若打算让子域也投放广告，建议各子站至少有隐私说明页。若只在主站投放，当前已满足。

---

## 11. 最终评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 技术 SEO | **68/100** | 扣分：80 个 URL 缺 canonical、3 站缺 sitemap、keyscan 双协议 |
| Google 可抓取性 | **90/100** | 无 robots 阻止、无 noindex 误用、无 403/5xx；扣分在软 404 |
| Google 可索引性 | **75/100** | 技术上允许索引；扣分：image 纯 JS、软 404、canonical 缺失 |
| 页面内容 SEO | **70/100** | unmark 优秀；study 工具页与 image 偏薄 |
| 内部链接 | **85/100** | 主站 anchor text 优秀；扣分：unmark/image 回链不足 |
| 移动端 | **100/100** | 9 站 × 4 种视口全部无横向溢出 |
| AdSense 准备度 | **88/100** | 主站五类页面齐全；扣分：study 薄页面、子站政策页不全 |

**下一步优先级**

1. 部署主站（P0-4）与 addressgen（P0-2、P0-3）的已修项
2. Cloudflare 开启 keyscan 的 Always Use HTTPS（P0-1）
3. unmark 补 canonical + sitemap（P1，投入最小、收益最直接）
4. image 首屏静态化（P1）
5. study 工具页补内容（P1，工作量最大）

---

## 12. 需要你在 Search Console 人工确认

见 `SEARCH_CONSOLE_CHECKLIST.md`。

再次强调：**本报告没有、也无法判断任何页面是否已被 Google 收录。**
如果某页面已收录但目标词无展示，不要用"重新提交 sitemap"当唯一解法——
应先检查 Title、H1、正文、内部链接与页面主题是否让 Google 明白它解决什么问题。
