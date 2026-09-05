# Search Console 人工检查清单

生成时间：2026-09-05
配套报告：`GOOGLE_SEARCH_AUDIT.md`

> 脚本无法访问 Search Console 私有数据，因此**没有对任何 URL 的收录状态做猜测**。
> 下面的表格请你在 Search Console 里逐个填写。填完把文件发我，我再据此判断
> 是"没被发现"、"抓了没收"还是"收了但不排名"——这三种问题的解法完全不同。

---

## 1. URL 检查（对应任务 AD）— 9 个首页，最高优先级

在 Search Console 顶部搜索框粘贴 URL → 回车 → 记录结果。

| URL | 已收录？ | 实际网址测试 | Google 选择的 canonical | 最后抓取 | 是否允许抓取 |
|---|---|---|---|---|---|
| https://tinylabpro.com/ |  |  |  |  |  |
| https://unmark.tinylabpro.com/ |  |  |  |  |  |
| https://teach.tinylabpro.com/ |  |  |  |  |  |
| https://study.tinylabpro.com/ |  |  |  |  |  |
| https://keyscan.tinylabpro.com/ |  |  |  |  |  |
| https://otp.tinylabpro.com/ |  |  |  |  |  |
| https://survey.tinylabpro.com/ |  |  |  |  |  |
| https://image.tinylabpro.com/ |  |  |  |  |  |
| https://addressgen.tinylabpro.com/ |  |  |  |  |  |

**「已收录？」填写**：`网址已收录到 Google` / `网址未收录到 Google`
**未收录时**，请把 Google 给出的具体原因原样抄下来，常见有：

```
已发现 - 尚未编入索引
已抓取 - 尚未编入索引
被 noindex 标记排除了
重复网页，Google 选择了不同于用户指定的规范网页
通过重定向排除
未找到 (404)
被 robots.txt 阻止
服务器错误 (5xx)
```

---

## 2. 网页索引编制报告（对应任务 AE）

路径：`索引 → 网页`

| 状态 | 网页数量 | 备注 |
|---|---|---|
| 已编入索引 |  |  |
| 未编入索引 |  |  |

「未编入索引」按原因展开，把**受影响的 URL** 填进来：

| 原因 | 数量 | 受影响 URL（列几个代表） |
|---|---|---|
| 被 noindex 标记排除了 |  |  |
| 已抓取 - 尚未编入索引 |  |  |
| 已发现 - 尚未编入索引 |  |  |
| 重复网页，Google 选择了不同的规范网页 |  |  |
| 通过重定向排除 |  |  |
| 未找到 (404) |  |  |
| 软 404 |  |  |
| 被 robots.txt 阻止 |  |  |
| 服务器错误 (5xx) |  |  |

> 重点关注两项：
> **软 404** —— addressgen 此前任意 URL 都返回 200（P0-2），若这里数字很大就是它造成的；修复部署后应回落。
> **重复网页** —— keyscan 的 http/https 双版本（P0-1）可能出现在这里。

---

## 3. 站点地图（对应任务 AF）

路径：`索引 → 站点地图`

| Sitemap | 状态 | 发现的网页数 | 备注 |
|---|---|---|---|
| https://tinylabpro.com/sitemap.xml |  |  | 应含 6 个 URL |
| https://teach.tinylabpro.com/sitemap.xml |  |  | 应含 22 个 |
| https://study.tinylabpro.com/sitemap.xml |  |  | 应含 50 个 |
| https://survey.tinylabpro.com/sitemap.xml |  |  | 应含 4 个 |
| https://image.tinylabpro.com/sitemap.xml |  |  | 应含 1 个 |
| https://addressgen.tinylabpro.com/sitemap.xml |  |  | 应含 27 个 |
| https://unmark.tinylabpro.com/sitemap.xml |  |  | ⚠️ 目前 404，需先创建 |
| https://keyscan.tinylabpro.com/sitemap.xml |  |  | ⚠️ 目前 404，需先创建 |
| https://otp.tinylabpro.com/sitemap.xml |  |  | ⚠️ 目前 404，需先创建 |

「状态」填：`已成功` / `无法读取` / `有错误`

> 注意：每个子域在 Search Console 里是**独立的资源（Property）**，
> 需要分别添加验证，主站的资源看不到子域数据。

---

## 4. 效果报告（对应任务 AG / AH）

路径：`效果 → 搜索结果`，日期范围选**3 个月**

### 4.1 总体

| 指标 | 数值 |
|---|---|
| 总点击次数 |  |
| 总展示次数 |  |
| 平均 CTR |  |
| 平均排名 |  |

### 4.2 分页面（切到「网页」标签）

| URL | 展示 | 点击 | CTR | 平均排名 |
|---|---|---|---|---|
| https://tinylabpro.com/ |  |  |  |  |
| https://unmark.tinylabpro.com/ |  |  |  |  |
| https://teach.tinylabpro.com/ |  |  |  |  |
| https://study.tinylabpro.com/ |  |  |  |  |
| https://keyscan.tinylabpro.com/ |  |  |  |  |
| https://otp.tinylabpro.com/ |  |  |  |  |
| https://survey.tinylabpro.com/ |  |  |  |  |
| https://image.tinylabpro.com/ |  |  |  |  |
| https://addressgen.tinylabpro.com/ |  |  |  |  |

### 4.3 Unmark 关键词专项（对应任务 AH）

切到「查询」标签，筛选页面为 `unmark.tinylabpro.com`：

| 目标关键词 | 展示 | 点击 | CTR | 平均排名 | 有无展示 |
|---|---|---|---|---|---|
| NotebookLM 去水印 |  |  |  |  |  |
| NotebookLM 水印 |  |  |  |  |  |
| NotebookLM 水印去除 |  |  |  |  |  |
| NotebookLM 去除水印 |  |  |  |  |  |

Google 实际带来展示的查询词（抄前 10 个，不用改写）：

```
1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
```

> 填完后的判断逻辑（对应任务 AI）：
> - 已收录 + 目标词零展示 → 关键词关联不足 / 站点权重不足 / 页面内容不足，
>   先查 Title、H1、正文、内部链接，**不要**只反复提交 sitemap
> - 展示多、点击少 → 改 Title 和 Description，检查是否匹配搜索意图
> - 平均排名 10～30 → 已在竞争区间，重点补内容与内部链接

---

## 5. 体验与安全（对应任务 AJ / AK / AL / AM）

| 检查项 | 路径 | 结果 |
|---|---|---|
| HTTPS | 体验 → HTTPS |  |
| 核心网页指标（移动设备） | 体验 → 核心网页指标 |  |
| 核心网页指标（桌面） | 同上 |  |
| 人工处置措施 | 安全问题和人工处置措施 |  |
| 安全问题 | 同上 |  |

> 核心网页指标若显示「数据不足」，如实填「数据不足」即可，**这不是错误**——
> 流量还没到 CrUX 的采样门槛而已。
> 人工处置措施或安全问题若**不是**「无」，那是 P0，请立刻告诉我。

---

## 6. 链接（对应任务 AN）

路径：`链接`

| 项目 | 数值 / 内容 |
|---|---|
| 外部链接总数 |  |
| 内部链接总数 |  |
| 被链接最多的页面（前 3） |  |
| 内部链接数极少的重要工具页 |  |

> 若某个重要工具的内部链接数接近 0，说明它在站内是孤岛，
> 需要从主站或相关工具页增加入口。

---

## 7. site: 搜索粗查（对应任务 AO，仅作参考）

在 Google 搜索框执行，记录大致条数：

| 查询 | 大致结果数 |
|---|---|
| `site:tinylabpro.com` |  |
| `site:unmark.tinylabpro.com` |  |
| `site:teach.tinylabpro.com` |  |
| `site:study.tinylabpro.com` |  |
| `site:keyscan.tinylabpro.com` |  |
| `site:otp.tinylabpro.com` |  |
| `site:survey.tinylabpro.com` |  |
| `site:image.tinylabpro.com` |  |
| `site:addressgen.tinylabpro.com` |  |

> `site:` 的结果数是估算值，**不能**当作索引数据库的准确反映。
> 最终以第 1 节的 URL 检查为准。

---

## 8. 其余 104 个 sitemap URL（次优先，抽查即可）

首页确认完再看这些。建议每个子站抽查 2～3 个代表性页面，不必逐个填。

<details>
<summary>展开完整 URL 列表</summary>

- https://addressgen.tinylabpro.com/about.html
- https://addressgen.tinylabpro.com/ar-address-generator/
- https://addressgen.tinylabpro.com/au-address-generator/
- https://addressgen.tinylabpro.com/br-address-generator/
- https://addressgen.tinylabpro.com/ca-address-generator/
- https://addressgen.tinylabpro.com/cn-address-generator/
- https://addressgen.tinylabpro.com/de-address-generator/
- https://addressgen.tinylabpro.com/es-address-generator/
- https://addressgen.tinylabpro.com/fr-address-generator/
- https://addressgen.tinylabpro.com/hk-address-generator/
- https://addressgen.tinylabpro.com/it-address-generator/
- https://addressgen.tinylabpro.com/jp-address-generator/
- https://addressgen.tinylabpro.com/kr-address-generator/
- https://addressgen.tinylabpro.com/my-address-generator/
- https://addressgen.tinylabpro.com/nl-address-generator/
- https://addressgen.tinylabpro.com/ph-address-generator/
- https://addressgen.tinylabpro.com/privacy.html
- https://addressgen.tinylabpro.com/ru-address-generator/
- https://addressgen.tinylabpro.com/sg-address-generator/
- https://addressgen.tinylabpro.com/sources.html
- https://addressgen.tinylabpro.com/terms.html
- https://addressgen.tinylabpro.com/th-address-generator/
- https://addressgen.tinylabpro.com/tr-address-generator/
- https://addressgen.tinylabpro.com/tw-address-generator/
- https://addressgen.tinylabpro.com/uk-address-generator/
- https://addressgen.tinylabpro.com/us-address-generator/
- https://study.tinylabpro.com/about/
- https://study.tinylabpro.com/primary/
- https://study.tinylabpro.com/privacy/
- https://study.tinylabpro.com/secondary/
- https://study.tinylabpro.com/tools/
- https://study.tinylabpro.com/tools/chem-equations/
- https://study.tinylabpro.com/tools/citation/
- https://study.tinylabpro.com/tools/clock/
- https://study.tinylabpro.com/tools/collector/
- https://study.tinylabpro.com/tools/countdown/
- https://study.tinylabpro.com/tools/daily-plan/
- https://study.tinylabpro.com/tools/dashboard/
- https://study.tinylabpro.com/tools/dictation/
- https://study.tinylabpro.com/tools/english-grammar/
- https://study.tinylabpro.com/tools/error-book/
- https://study.tinylabpro.com/tools/exam-plan/
- https://study.tinylabpro.com/tools/flashcards/
- https://study.tinylabpro.com/tools/fractions/
- https://study.tinylabpro.com/tools/function-plot/
- https://study.tinylabpro.com/tools/gaokao-japanese/
- https://study.tinylabpro.com/tools/geometry/
- https://study.tinylabpro.com/tools/gpa/
- https://study.tinylabpro.com/tools/grade-analyzer/
- https://study.tinylabpro.com/tools/habits/
- https://study.tinylabpro.com/tools/japanese-kana/
- https://study.tinylabpro.com/tools/math-formulas/
- https://study.tinylabpro.com/tools/mental-math/
- https://study.tinylabpro.com/tools/mindmap/
- https://study.tinylabpro.com/tools/multiplication/
- https://study.tinylabpro.com/tools/periodic-table/
- https://study.tinylabpro.com/tools/physics-formulas/
- https://study.tinylabpro.com/tools/pinyin/
- https://study.tinylabpro.com/tools/poems/
- https://study.tinylabpro.com/tools/pomodoro/
- https://study.tinylabpro.com/tools/presentation-timer/
- https://study.tinylabpro.com/tools/progress/
- https://study.tinylabpro.com/tools/random-quiz/
- https://study.tinylabpro.com/tools/reading-notes/
- https://study.tinylabpro.com/tools/reading-speed/
- https://study.tinylabpro.com/tools/reading-timer/
- https://study.tinylabpro.com/tools/recite/
- https://study.tinylabpro.com/tools/research-plan/
- https://study.tinylabpro.com/tools/schedule/
- https://study.tinylabpro.com/tools/units/
- https://study.tinylabpro.com/tools/vocabulary/
- https://study.tinylabpro.com/tools/writing-cards/
- https://study.tinylabpro.com/tools/writing-check/
- https://study.tinylabpro.com/tools/writing-grid/
- https://study.tinylabpro.com/university/
- https://survey.tinylabpro.com/en/
- https://survey.tinylabpro.com/en/privacy/
- https://survey.tinylabpro.com/privacy/
- https://teach.tinylabpro.com/about/
- https://teach.tinylabpro.com/classes/
- https://teach.tinylabpro.com/download/
- https://teach.tinylabpro.com/privacy/
- https://teach.tinylabpro.com/tools/
- https://teach.tinylabpro.com/tools/dictation/
- https://teach.tinylabpro.com/tools/grade/
- https://teach.tinylabpro.com/tools/group/
- https://teach.tinylabpro.com/tools/ppt-outline/
- https://teach.tinylabpro.com/tools/qrcode/
- https://teach.tinylabpro.com/tools/question/
- https://teach.tinylabpro.com/tools/quiz/
- https://teach.tinylabpro.com/tools/random-order/
- https://teach.tinylabpro.com/tools/random-picker/
- https://teach.tinylabpro.com/tools/schedule/
- https://teach.tinylabpro.com/tools/scoreboard/
- https://teach.tinylabpro.com/tools/seating/
- https://teach.tinylabpro.com/tools/survey/
- https://teach.tinylabpro.com/tools/text-effect/
- https://teach.tinylabpro.com/tools/timer/
- https://teach.tinylabpro.com/tools/wheel/
- https://tinylabpro.com/about
- https://tinylabpro.com/contact
- https://tinylabpro.com/disclaimer
- https://tinylabpro.com/privacy
- https://tinylabpro.com/terms

</details>
