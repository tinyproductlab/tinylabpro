# 收录检查步骤（可交给任意 AI / 他人执行）

本文件自包含，不需要了解此前的对话背景。

## 背景

`tinylabpro.com` 旗下 9 个站点中，**otp / keyscan / image** 三个未被 Google 收录
（站长 2026-09-05 在 Search Console 人工确认），其余 6 个已收录。

诊断出两类病因，并已于 **2026-09-05 22:10（UTC+8）** 修复上线：

| 站点 | 病因 | 已做的修复 |
|---|---|---|
| otp.tinylabpro.com | 无 sitemap / robots.txt / canonical，Google 没有发现入口 | 三样全部补上 |
| keyscan.tinylabpro.com | 同上 | 三样全部补上 |
| image.tinylabpro.com | 入口齐全，但原始 HTML 正文只有 13 字符（纯 JS 渲染），无可索引内容 | 首屏静态化，正文增至 540 字符 |

**现在要确认两件事：**
1. 技术修复是否仍然生效（机器可验证）
2. Google 是否已重新抓取并收录（需要 Search Console，机器无法验证）

---

## 第一部分：技术检查（任何 AI 都能跑，纯 curl）

逐条执行，对照"期望"判断。全部通过说明站点侧没问题，剩下的只是等 Google。

### 1. sitemap 可访问且内容正确

```bash
for d in otp keyscan image; do
  echo "── $d"
  curl -s -o /dev/null -w "   HTTP %{http_code}  %{content_type}\n" https://$d.tinylabpro.com/sitemap.xml
  curl -s https://$d.tinylabpro.com/sitemap.xml | grep -o '<loc>[^<]*</loc>'
done
```

**期望**：三个都是 `HTTP 200`，content-type 含 `xml`，`<loc>` 里是 `https://` 开头的自身域名。
**失败含义**：sitemap 掉了，Google 无法发现页面 —— 需要修复后重新提交。

### 2. robots.txt 允许抓取且声明 sitemap

```bash
for d in otp keyscan image; do
  echo "── $d"
  curl -s https://$d.tinylabpro.com/robots.txt | grep -iE "disallow|sitemap|user-agent"
done
```

**期望**：不能出现 `User-agent: *` 紧跟 `Disallow: /`（那是全站禁止抓取）；应含 `Sitemap:` 行。
**注意**：输出里可能有一大段 `content signals` 注释，那是 Cloudflare 自动注入的，正常。

### 3. canonical 指向自身

```bash
for d in otp keyscan image; do
  printf "%-10s " $d
  curl -s https://$d.tinylabpro.com/ | grep -o 'rel="canonical" href="[^"]*"' | head -1
done
```

**期望**：每个都指向自己的首页地址（如 `https://otp.tinylabpro.com/`）。
**失败含义**：canonical 指向别处会让 Google 把收录权重算到别的页面上。

### 4. 页面没有 noindex（关键）

```bash
for d in otp keyscan image; do
  printf "%-10s meta: " $d
  curl -s https://$d.tinylabpro.com/ | grep -c 'name="robots"[^>]*noindex'
  printf "%-10s header: " $d
  curl -s -o /dev/null -D - https://$d.tinylabpro.com/ | grep -i "x-robots-tag" || echo "无"
done
```

**期望**：meta 计数为 `0`，X-Robots-Tag 为"无"。
**失败含义**：任何一处出现 noindex，Google 都会拒绝收录 —— 这是最高优先级问题。

### 5. image 站的正文必须出现在原始 HTML 里（不执行 JS）

```bash
curl -s https://image.tinylabpro.com/ | python3 -c "
import sys,re
from html import unescape
h=sys.stdin.read()
t=re.sub(r'<(script|style)[^>]*>.*?</\1>','',h,flags=re.S|re.I)
txt=' '.join(unescape(re.sub(r'<[^>]+>',' ',t)).split())
print('正文字数:', len(txt))
m=re.search(r'<h1[^>]*>(.*?)</h1>',h,re.S)
print('H1:', unescape(re.sub(r'<[^>]+>','',m.group(1))).strip() if m else '❌ 没有 H1')
print('前 100 字:', txt[:100])
"
```

**期望**：正文 **≥ 400 字符**，有 H1，能看到"图片工坊""证件照制作"等真实文案。
**失败含义**：若正文回落到 13 字符左右且无 H1，说明首屏静态化被某次改动覆盖了 —— 这是本次修复的核心，必须恢复。

### 6. HTTP 跳转与状态码

```bash
for d in otp keyscan image; do
  printf "%-10s http→ %s   https→ %s   404页→ %s\n" $d \
    "$(curl -s -o /dev/null -w '%{http_code}' http://$d.tinylabpro.com/)" \
    "$(curl -s -o /dev/null -w '%{http_code}' https://$d.tinylabpro.com/)" \
    "$(curl -s -o /dev/null -w '%{http_code}' https://$d.tinylabpro.com/no-such-page-xyz123)"
done
```

**期望**：http 为 `301`，https 为 `200`，不存在的页面为 `404`。
**失败含义**：http 返回 200 = 同一内容有两个可抓取版本（重复内容）；404 页返回 200 = 软 404，Google 会收录无限垃圾 URL。

---

## 第二部分：收录状态（机器查不了，必须人工）

> **重要**：不要让 AI 猜测收录状态，也不要把"搜不到"当成"未收录"的结论。
> - 多数 AI 的搜索工具**不支持 `site:` 操作符**（会静默忽略并返回无关结果）
> - 直接抓取 `google.com/search` 会被 Google 拦截
> - 因此**唯一可靠来源是 Search Console**

### 7. 由人在浏览器里执行

打开 https://search.google.com/search-console，切到对应资源：

| 检查项 | 路径 | 记录什么 |
|---|---|---|
| 是否收录 | 顶部搜索框粘 URL → 回车 | 「网址已收录到 Google」或「未收录」+ 下方原因原文 |
| sitemap 是否被读取 | 索引 → 站点地图 | 状态（成功 / 无法读取 / 有错误）+ 发现的网页数 |
| 是否被抓取过 | 网址检查 → 展开「网页抓取」 | 「上次抓取时间」的日期 |

要检查的三个 URL：

```
https://otp.tinylabpro.com/
https://keyscan.tinylabpro.com/
https://image.tinylabpro.com/
```

### 8. 若尚未提交，需要先做这两步

1. **索引 → 站点地图** → 输入 `sitemap.xml` → 提交
2. **网址检查**粘 URL → 点「请求编入索引」（每天有配额，不要重复点）

---

## 结果判读

把第一部分和第二部分的结果组合起来看：

| 技术检查 | 收录状态 | 结论 | 下一步 |
|---|---|---|---|
| 全通过 | 未收录，原因「已发现-尚未编入索引」 | Google 知道但还没排上抓取 | 提交 sitemap + 请求编入索引，然后等 |
| 全通过 | 未收录，原因「已抓取-尚未编入索引」 | Google 抓了但认为内容价值不足 | **补内容**：使用说明、步骤、场景、FAQ；增加站内外链接 |
| 全通过 | 未收录，原因「重复网页」 | canonical 或多版本 URL 问题 | 检查是否同内容有多个可访问地址 |
| 有失败项 | 任意 | 站点侧回归了 | 先修第一部分的失败项，再谈收录 |
| 全通过 | 已收录 | 完成 | 转向关键词与内容优化 |

**时间预期**（从提交请求算起）：sitemap 状态几小时～1 天；「上次抓取」2～7 天；「已收录」1～3 周。
`site:` 搜索是最后才会变的信号，不要用它做早期判断。
