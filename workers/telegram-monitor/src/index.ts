interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  WEBHOOK_SECRET?: string;
  MONITOR_URLS?: string;
  OQUMAIL_API_KEY?: string;
  ALERT_EMAIL_TO?: string;
  MONITOR_STATE?: KVNamespace;
}

const DEFAULT_URLS = [
  "https://tinylabpro.com/",
  "https://account.tinylabpro.com/",
  "https://account.tinylabpro.com/health",
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
  const chatIds = env.TELEGRAM_CHAT_ID.split(",").map((id) => id.trim()).filter(Boolean);
  const responses = await Promise.all(
    chatIds.map((chatId) => fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      },
    )),
  );
  if (responses.some((response) => !response.ok)) throw new Error("Telegram message delivery failed");
}

async function sendEmail(env: Env, text: string) {
  const response = await fetch("https://api.oqumail.com/api/v1/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.OQUMAIL_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      to: [env.ALERT_EMAIL_TO],
      fromName: "小产品实验室监控",
      subject: `[监控通知] ${text.split("\n")[0].slice(0, 150)}`,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Email delivery failed (${response.status})`);
}

type Channel = { prefix: string; send: (text: string) => Promise<void> };
function channels(env: Env): Channel[] {
  const result: Channel[] = [{ prefix: "", send: (text) => sendTelegram(env, text) }];
  if (env.OQUMAIL_API_KEY && env.ALERT_EMAIL_TO) {
    result.push({ prefix: `email:${env.ALERT_EMAIL_TO}:`, send: (text) => sendEmail(env, text) });
  }
  return result;
}

async function allChannels(env: Env, action: (channel: Channel) => Promise<void>) {
  const results = await Promise.allSettled(channels(env).map(action));
  if (results.some((result) => result.status === "rejected")) {
    throw new Error("One or more notification channels failed");
  }
}

async function notifyAll(env: Env, text: string) {
  await allChannels(env, (channel) => channel.send(text));
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

async function notifyIfChanged(env: Env, baseKey: string, text: string | null) {
  await allChannels(env, async (channel) => {
    const key = channel.prefix + baseKey;
    // KV 可用时只在状态变化时通知，避免每五分钟重复刷屏。
    if (!env.MONITOR_STATE) {
      if (text) await channel.send(text);
      return;
    }

    const previous = await env.MONITOR_STATE.get(key);
    const next = text || "ok";
    if (previous !== next) {
      if (text || previous !== null) {
        await channel.send(text || `✅ 网站已恢复\n${baseKey.replace(/^health:/, "")}`);
      }
      await env.MONITOR_STATE.put(key, next);
    }
  });
}

async function runHealthChecks(env: Env) {
  const firstRun = env.MONITOR_STATE
    ? (await env.MONITOR_STATE.get("monitor:initialized")) !== "true"
    : false;
  const results: Array<{ url: string; problem: string | null }> = [];
  const failures: unknown[] = [];
  for (const url of urls(env)) {
    const problem = await check(url);
    results.push({ url, problem });
    try {
      await notifyIfChanged(env, `health:${url}`, problem ? `⚠️ 网站异常\n${url}\n原因：${problem}` : null);
    } catch (error) { failures.push(error); }
  }
  if (firstRun && results.every(({ problem }) => !problem)) {
    await notifyAll(env, `✅ Tiny Product Lab 监控已启动\n已检查 ${results.length} 个站点，当前均可访问。`);
    await env.MONITOR_STATE!.put("monitor:initialized", "true", { expirationTtl: 60 * 60 * 24 * 30 });
  }
  if (failures.length) throw new Error("Some health notifications failed");
}

function webhookText(payload: Record<string, unknown>) {
  const name = typeof payload.name === "string" ? payload.name : "Cloudflare 通知";
  const text = typeof payload.text === "string" ? payload.text : JSON.stringify(payload);
  return `☁️ ${name}\n${text}`.slice(0, 3900);
}

function reportDetails(value: unknown) {
  if (typeof value !== "string") return "";
  return value.split(" · ").map((line) => "• " + line
    .replace(/\bhealthy\b/g, "正常")
    .replace(/\brunning\b/g, "运行中")
    .replace(/\bunhealthy\b/g, "异常")
    .replace(/\bunavailable\b/g, "不可用"))
    .join("\n");
}

async function handleServerReport(env: Env, payload: Record<string, unknown>) {
  const account = payload.source === "account-host";
  const name = account ? "账号服务器" : "后端服务器";
  const status = payload.status === "ok" ? null : String(payload.problem || "服务器状态异常");
  const hostname = typeof payload.hostname === "string" ? payload.hostname : name;
  const details = reportDetails(payload.details);
  // Preserve the existing backend state so deployment does not reset its alerts.
  await allChannels(env, async (channel) => {
    const key = channel.prefix + `${account ? "account" : "oracle"}:${hostname}`;
    const previous = env.MONITOR_STATE ? await env.MONITOR_STATE.get(key) : null;
    const next = status || "ok";
    if (previous === next) return;
    if (!env.MONITOR_STATE && !status) return;

    const title = status ? `⚠️ ${name}异常` : previous
      ? `✅ ${name}已恢复` : `✅ ${name}监控已启动`;
    const text = [title, `主机：${hostname}`, status ? `原因：${status}` : "状态：正常",
      "", details].join("\n").trim().slice(0, 3900);
    await channel.send(text);
    // Only acknowledge a transition after delivery succeeds; failed sends retry.
    await env.MONITOR_STATE?.put(key, next);
  });
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
    if (url.pathname === "/cloudflare-alert" && (payload.source === "oracle-host" || payload.source === "account-host")) {
      await handleServerReport(env, payload);
      return new Response("ok");
    }
    await notifyAll(env, webhookText(payload));
    return new Response("ok");
  },

  async scheduled(_: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runHealthChecks(env));
  },
} satisfies ExportedHandler<Env>;
