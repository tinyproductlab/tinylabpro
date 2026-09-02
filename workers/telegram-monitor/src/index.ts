interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  WEBHOOK_SECRET?: string;
  MONITOR_URLS?: string;
  MONITOR_STATE?: KVNamespace;
}

const DEFAULT_URLS = [
  "https://tinylabpro.com/",
  "https://unmark.tinylabpro.com/healthz",
  "https://teach.tinylabpro.com/",
  "https://study.tinylabpro.com/",
  "https://survey.tinylabpro.com/",
];

function urls(env: Env) {
  return (env.MONITOR_URLS || DEFAULT_URLS.join(","))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function sendTelegram(env: Env, text: string) {
  const response = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    },
  );
  if (!response.ok) throw new Error(`Telegram returned ${response.status}`);
}

async function check(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(url, { signal: controller.signal, redirect: "follow" });
    if (!response.ok) return `HTTP ${response.status}`;
    return null;
  } catch {
    return "无法连接或超时";
  } finally {
    clearTimeout(timer);
  }
}

async function notifyIfChanged(env: Env, key: string, text: string | null) {
  // KV 可用时只在状态变化时通知，避免每五分钟重复刷屏。
  if (!env.MONITOR_STATE) {
    if (text) await sendTelegram(env, text);
    return;
  }

  const previous = await env.MONITOR_STATE.get(key);
  const next = text || "ok";
  if (previous !== next) {
    await env.MONITOR_STATE.put(key, next, { expirationTtl: 60 * 60 * 24 * 30 });
    await sendTelegram(env, text || `✅ 已恢复\n${key}`);
  }
}

async function runHealthChecks(env: Env) {
  const firstRun = env.MONITOR_STATE
    ? (await env.MONITOR_STATE.get("monitor:initialized")) !== "true"
    : false;
  const results: Array<{ url: string; problem: string | null }> = [];
  for (const url of urls(env)) {
    const problem = await check(url);
    results.push({ url, problem });
    await notifyIfChanged(env, `health:${url}`, problem ? `⚠️ 网站异常\n${url}\n原因：${problem}` : null);
  }
  if (firstRun && results.every(({ problem }) => !problem)) {
    await sendTelegram(env, `✅ Tiny Product Lab 监控已启动\n已检查 ${results.length} 个站点，当前均可访问。`);
    await env.MONITOR_STATE!.put("monitor:initialized", "true", { expirationTtl: 60 * 60 * 24 * 30 });
  }
}

function webhookText(payload: Record<string, unknown>) {
  const name = typeof payload.name === "string" ? payload.name : "Cloudflare 通知";
  const text = typeof payload.text === "string" ? payload.text : JSON.stringify(payload);
  return `☁️ ${name}\n${text}`.slice(0, 3900);
}

async function handleOracleReport(env: Env, payload: Record<string, unknown>) {
  const status = payload.status === "ok" ? null : String(payload.problem || "服务器状态异常");
  const hostname = typeof payload.hostname === "string" ? payload.hostname : "Oracle 服务器";
  const details = typeof payload.details === "string" ? payload.details : "";
  const key = `oracle:${hostname}`;

  if (!env.MONITOR_STATE) {
    if (status) await sendTelegram(env, `⚠️ Oracle 服务器异常\n${hostname}\n原因：${status}\n${details}`.trim());
    return;
  }

  const previous = await env.MONITOR_STATE.get(key);
  const next = status || "ok";
  if (previous === next) return;

  await env.MONITOR_STATE.put(key, next, { expirationTtl: 60 * 60 * 24 * 30 });
  const text = status
    ? `⚠️ Oracle 服务器异常\n${hostname}\n原因：${status}\n${details}`.trim()
    : previous
      ? `✅ Oracle 服务器已恢复\n${hostname}\n${details}`.trim()
      : `✅ Oracle 服务器监控已启动\n${hostname}\n${details}`.trim();
  await sendTelegram(env, text);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/healthz") return new Response("ok");
    if (url.pathname !== "/cloudflare-alert" || request.method !== "POST") {
      return new Response("Not found", { status: 404 });
    }
    if (!env.WEBHOOK_SECRET || request.headers.get("cf-webhook-auth") !== env.WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
    const payload = await request.json<Record<string, unknown>>();
    if (url.pathname === "/cloudflare-alert" && payload.source === "oracle-host") {
      await handleOracleReport(env, payload);
      return new Response("ok");
    }
    await sendTelegram(env, webhookText(payload));
    return new Response("ok");
  },

  async scheduled(_: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runHealthChecks(env));
  },
} satisfies ExportedHandler<Env>;
