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
