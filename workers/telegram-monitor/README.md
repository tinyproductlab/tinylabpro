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
