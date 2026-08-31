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
