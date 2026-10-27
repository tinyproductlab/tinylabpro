# Tiny Product Lab · Telegram 监控通知

这个 Worker 做两件事：

1. 每 5 分钟检查小产品实验室的主要网站；异常和恢复时发送 Telegram。
2. 接收 Cloudflare Notifications 的通用 Webhook，并转发一条精简通知到 Telegram。

它不收集访客内容，也不会把 Telegram Token、Chat ID 或 Webhook 密钥提交到 GitHub。

## 部署前准备

在 Cloudflare Dashboard 创建一个 Worker，名称建议使用 `tinyproductlab-monitor`。部署这份目录后，在 **Settings → Variables and Secrets** 中添加为加密 Secret：

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `WEBHOOK_SECRET`（自行生成一串随机字符，用于识别来自 Cloudflare 的 Webhook）

可选：创建一个 KV 命名空间，绑定名为 `MONITOR_STATE`。这样只会在异常首次出现、以及恢复时通知，不会重复刷屏。把命名空间 ID 填回 `wrangler.toml` 后重新部署。

## Cloudflare 通知入口

Worker 发布后的地址为：

`https://tinyproductlab-monitor.<你的子域>.workers.dev/cloudflare-alert`

在 Cloudflare **Notifications → Destinations → Webhooks** 创建 Generic Webhook，填入上述地址，并把 `WEBHOOK_SECRET` 填入 Secret 字段。随后可将这个目的地关联到源站异常或安全类通知策略。

Cloudflare 通用 Webhook 需要相应套餐支持；即使没有，该 Worker 的定时健康检查仍可独立工作。

## 服务器中文通知（2026-09-24）

支持 `oracle-host`（后端服务器）和 `account-host`（账号服务器）的上报。
通知逐行展示主机、状态、资源与服务信息，将 healthy/running 等状态译为中文。
首次上报通知启动；后续仅在异常原因变化或恢复时通知，资源数值变化不会触发重复通知。
两台服务器分别记录状态；发送成功后才更新状态，发送失败由下一次上报重试。
状态不设置过期时间，避免长期正常时重复发送启动提醒。

验证：`node --test workers/telegram-monitor/report.test.mjs`。
此测试使用模拟 Telegram 和 KV，不发送真实消息。

此处是服务器主动上报监控；整台服务器离线、无法上报时的心跳缺失告警尚未实现。

公网定时检查已包含账号首页 `https://account.tinylabpro.com/` 与
`https://account.tinylabpro.com/health`，每 5 分钟检查 HTTP 状态及连接超时。
首次正常不单独发送恢复提醒；异常和恢复各通知一次，发送成功后更新状态。
服务器离线导致公网网址无法访问时，可通过这些外部检查告警。
此检查不执行真实注册、登录或邮件投递，也不单独验证健康接口 JSON 内容。

## 邮件通知（2026-09-24）

账号服务器与后端服务器、所有公网网址检查共用邮件通知渠道，同时保留 Telegram。
Worker 直接调用现有 OquMail HTTPS 邮件接口，不依赖账号服务器在线转发。
通过 Wrangler Secret 配置 `OQUMAIL_API_KEY`、`ALERT_EMAIL_TO`，密钥不写入源码。
邮件内容包含通知标题、主机、故障原因及资源状态；不包含账号密码或验证码。

邮件与 Telegram 使用独立状态键。渠道并行发送，只有成功发送的渠道才更新状态；
失败渠道会在下一次相同状态上报时重试，成功渠道不会因另一个渠道失败而重复发送。
新增邮箱后首次服务器上报会发一封启动邮件，后续正常上报静默。
邮件接口返回成功代表服务商已接受请求，最终是否进入收件箱需收件人确认。
