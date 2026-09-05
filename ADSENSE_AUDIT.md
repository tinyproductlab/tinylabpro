# TinyProductLab AdSense Audit

审核日期：2026-09-05  
审核范围：`tinylabpro.com` 主站源码、主站线上响应，以及首页链接的 8 个公开工具入口。子域工具属于独立部署，本报告只记录其线上可观察项，不假定其内部数据处理方式。

## P0：提交 AdSense 前必须处理

1. **地址生成器包含银行卡号、人物资料和账号资料生成能力。** 线上页面存在“银行卡号”等字段。申请前应单独审查该项目的全部文案和输出，明确其仅为软件开发、UI、表单和格式测试所用的模拟数据，不能用于交易、身份冒用、批量注册、欺骗或绕过平台规则。建议在完成专项审查前不要在该页面投放 AdSense 广告。
2. **NotebookLM 去水印属于版权敏感工具。** 当前首页没有使用“破解”等误导说法，但应在工具页显著说明仅处理用户拥有或有权编辑的文件。建议该页面在通过专项版权与广告政策审查前不放 AdSense 广告。

## P1：强烈建议处理

1. **各子域应分别提供自己的 `robots.txt` 和 `sitemap.xml`。** Sitemap 协议要求其中 URL 与 Sitemap 所在主机一致，因此主站 Sitemap 不应直接混入各子域。实测 KeyScan 的这两个地址均为 404，Google Search Console 也曾显示“Google 无法识别此网址”。
2. **补齐部分子域 canonical。** 线上抽查中，主站、UNMARK、教师工具箱、学生工具箱、KeyScan 和 OTP 未在返回 HTML 中发现明确 canonical；调查问卷、图片工坊和地址生成器已有 canonical。应在各自项目中补齐唯一 HTTPS canonical。
3. **逐个子域核对内容完整度和隐私表述。** 主站无法仅凭公开 HTML 确认所有工具是否完全本地处理、是否调用服务器、是否保存上传数据。不能把“本地处理”作为全站统一承诺。
4. **提交并跟踪 Search Console。** 主站已提交重新收录请求；KeyScan 实时测试显示可以编入索引，但首次请求出现 Google 临时错误。各子域 Sitemap 完成后应分别提交并观察覆盖率。
5. **申请前人工走查所有主要工具。** 需要分别完成上传、生成、下载、移动端表单和错误状态测试，确认没有空白页、无响应按钮或误导式下载入口。

## P2：后续优化

1. 为适合的工具页增加真实、独立的工具介绍、2～5 步使用方法、适用场景、实际数据流向和 2～5 条 FAQ，避免复制同一套 SEO 文案。
2. 为主站加入 `WebSite`，并按工具实际情况为子域加入 `WebApplication` 结构化数据；不要添加虚假评分、评论或组织信息。
3. 继续压缩较大的 Logo 与二维码资源，并在不影响首屏的图片上使用延迟加载。
4. 获得真实 AdSense Publisher ID 后，再配置 AdSense 脚本、`ads.txt` 和 Google 的隐私消息/CMP。当前 `ads.txt` 为 404，这是尚无 Publisher ID 时的正确做法，不应填写虚假 seller 记录。
5. 观察 Google 重新抓取后的 canonical 选择；历史记录曾把 `https://www.tinylabpro.com/` 选为规范网址，当前已统一到非 www。

## 已自动修复

- `app/layout.tsx`：增加 `metadataBase`、统一首页标题与描述、HTTPS canonical、可索引 robots 元数据、Open Graph，并把页面语言修正为 `zh-CN`。
- `app/about/page.tsx`：新增真实、简洁的关于页面。
- `app/contact/page.tsx`：新增联系页面，使用项目现有邮箱 `userfeedback@zohomail.com`，并提醒不要发送敏感数据。
- `app/privacy/page.tsx`：新增与当前代码相符的隐私政策，覆盖必要日志、天气定位、工具数据差异、Cookie、未来 AdSense、外链、儿童隐私与更新方式。
- `app/terms/page.tsx`：新增使用条款。
- `app/disclaimer/page.tsx`：新增工具输出、测试数据、版权和第三方品牌免责声明。
- `components/site-footer.tsx`：新增统一页脚及 About、Privacy、Terms、Contact、Disclaimer 入口和版权信息。
- `components/info-page.tsx`：新增法律与说明页面的统一布局。
- `app/not-found.tsx`：新增明确的 404 页面和返回首页入口。
- `app/page.tsx`：在不改变工具站定位的前提下增加网站定位、创建原因、特点和 FAQ；把 KeyScan 链接由 GitHub Pages 地址改为规范子域；外链增加安全属性；非首屏工具图标启用延迟加载。
- `app/page.tsx`：修复 375px 宽度下顶部操作区和工具卡片的横向溢出，390px 与 430px 使用相同响应式规则。
- `app/sitemap.xml/route.ts`：在主站 Sitemap 中加入 5 个同域公开说明页面，不混入跨主机 URL。
- `app/robots.txt/route.ts`：确认允许公开页面抓取，并声明主站 Sitemap。
- Cloudflare：已开启 **Always Use HTTPS**。实测 `http://tinylabpro.com/` 现在返回 301 到 `https://tinylabpro.com/`。

## 未自动修改

- 未修改 8 个独立子域工具的源码，因为它们不在当前 `tinylabpro.com` 主站项目中。
- 未删除或隐藏地址生成器与去水印工具，只记录其政策风险并建议暂不在对应页面投放广告。
- 未添加批量文章、虚假用户数、评论、评分、公司、团队或合作关系。
- 未添加 AdSense 脚本、广告占位和 `ads.txt`，因为项目中没有可确认的真实 Publisher ID。
- 未虚构所有工具“完全本地处理”的承诺；每个工具必须依据实际实现单独说明。

## 需要站长手动完成

1. 提供并确认真实 AdSense Publisher ID，完成 AdSense 网站验证后再接入脚本和 `ads.txt`。
2. 在 AdSense 后台配置适用地区的 Privacy & Messaging/CMP；这需要根据实际投放地区和广告模式选择。
3. 对地址生成器和去水印项目作专项政策决定：完善用途与版权提醒，并决定是否永久不在这些页面放广告。
4. 为每个独立工具子域补充并提交自己的 Sitemap、robots、canonical 和 Search Console 检查。
5. 在正式申请前，用真实手机完成一遍所有核心流程和下载行为测试。

## 验证记录

- `https://tinylabpro.com/`：200。
- `http://tinylabpro.com/`：修复后 301 到 HTTPS。
- `http://www.tinylabpro.com/`：301 到 `https://tinylabpro.com/`。
- 首页链接的 8 个工具入口：抽查均返回 200。
- 主站 `/about`、`/contact`、`/privacy`、`/terms`、`/disclaimer`：本地生产构建与响应均成功。
- 主站 `/robots.txt`、`/sitemap.xml`：本地生产构建与响应均为 200。
- 不存在的测试路径：返回 404，并由自定义 404 页面提供返回首页入口。
- 代码扫描未发现公开页面 `noindex`、硬编码 AdSense ID、Google Analytics、危险 `innerHTML`、前端私钥或 API Key。
- 生产构建成功，所有新增路由均被构建系统识别。

## 最终判断

**建议修复 P0 后申请**

主要原因：

1. 地址生成器的银行卡号与人物资料能力需要先完成专项政策审查。
2. 去水印工具属于版权敏感类别，建议先明确权利边界并避免在该页投放广告。
3. 主站此前缺少法律与信任页面，现已补齐，但仍需上线后由 Google 重新抓取。
4. 多个工具子域还没有独立 Sitemap、robots 或 canonical，搜索引擎发现能力不完整。
5. 尚未提供真实 AdSense Publisher ID，因此广告脚本、`ads.txt` 和 CMP 不能完成最终配置。
