# Tiny Product Lab

TinyLabPro.com 是小产品实验室的 AI 工具入口，用于集中展示网页工具、微信小程序、App 与开源项目。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## WeatherKit

天气功能通过服务端接口访问 Apple WeatherKit。请在本地或部署环境中配置以下变量，私钥不得提交到 GitHub：

```text
WEATHERKIT_TEAM_ID=
WEATHERKIT_KEY_ID=
WEATHERKIT_SERVICE_ID=
WEATHERKIT_PRIVATE_KEY=
```

## 构建

```bash
npm run build
```

## 部署

主站由 Cloudflare Worker **`tinyproductlab-home`** 提供服务（`tinylabpro.com` 是它的自定义域）。

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json --name tinyproductlab-home
```

**`--name` 不能省。** `package.json` 里的 `name` 是 `sites-project`，vinext 会拿它生成
`dist/server/wrangler.json`；不加 `--name` 就会部署到 `sites-project` 这个 worker，
而它没有绑定任何域名，部署"成功"了线上却毫无变化。

这个仓库没有接 Git 自动部署，push 之后需要手动跑上面两条命令
（addressgen / teach 等子站是 Cloudflare Pages + Git 集成，push 即上线）。

WeatherKit 的 4 个 secret 存在 worker 上，`wrangler deploy` 不会覆盖它们。

### 响应头分工

| 位置 | 作用范围 |
|---|---|
| `public/_headers` | 静态资源（图片缓存、`_next/static` 长缓存） |
| `middleware.ts` | 服务端渲染的 HTML（HSTS 等安全头） |

`next.config.ts` 的 `headers()` 在 vinext 下**不生效**，不要往那里加。

## 匿名留言与版主回复

- 首页页脚的「匿名留言板」进入 `/messages`，展示最近 30 条留言。
- 在页面右上角打开「版主管理」，输入 `MESSAGE_BOARD_ADMIN_KEY` 对应的管理密钥；验证后可回复或修改回复。
- 密钥仅保存在当前页面内存中，刷新页面后需要重新输入。不要将密钥写入源码或公开链接。
- 服务器未配置密钥时，回复接口默认拒绝访问。使用 `wrangler secret put MESSAGE_BOARD_ADMIN_KEY --name tinyproductlab-home` 设置至少 32 字符的随机密钥。
- 初次部署回复功能前执行 `db/message-replies.sql`，新增回复表，不修改原有留言。
- 回复权限与内容校验：`node --test tests/message-admin.test.mjs`。
