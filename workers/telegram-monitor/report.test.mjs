import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './src/index.ts';

test('server transitions, formatting, isolation, delivery retry and auth', async () => {
  const state = new Map();
  const sent = [];
  let fail = false;
  const original = globalThis.fetch;
  globalThis.fetch = async (_, options) => {
    if (fail) return new Response('', {status: 500});
    sent.push(JSON.parse(options.body).text);
    return new Response('{}');
  };
  const env = { TELEGRAM_BOT_TOKEN: 'test', TELEGRAM_CHAT_ID: 'test', WEBHOOK_SECRET: 'test',
    MONITOR_STATE: { get: async k => state.get(k) ?? null, put: async (k,v) => state.set(k,v) } };
  const report = {source: 'account-host', status: 'ok', hostname: 'test-host', problem: '',
    details: '负载 0.00 · 可用内存 11215 MB · 磁盘 5% · 账号 API healthy · 数据库 healthy · 隧道 running'};
  const post = (payload, secret = 'test') => worker.fetch(new Request('https://example.com/cloudflare-alert', {
    method: 'POST', headers: {'cf-webhook-auth': secret}, body: JSON.stringify(payload)
  }), env);
  try {
    assert.equal((await post(report, 'wrong')).status, 401);
    assert.equal(sent.length, 0);
    await post(report);
    assert.match(sent[0], /账号服务器监控已启动/);
    assert.match(sent[0], /• 账号 API 正常\n• 数据库 正常\n• 隧道 运行中/);
    await post({...report, details: '负载 0.20'});
    assert.equal(sent.length, 1);
    const broken = {...report, status: 'problem', problem: '账号 API 异常'};
    await post(broken);
    assert.match(sent[1], /账号服务器异常/);
    await post(broken);
    assert.equal(sent.length, 2);
    fail = true;
    await assert.rejects(post(report));
    assert.equal(state.get('account:test-host'), '账号 API 异常');
    fail = false;
    await post(report);
    assert.match(sent[2], /账号服务器已恢复/);
    await post(report);
    assert.equal(sent.length, 3);
    state.set('oracle:test-host', 'ok');
    await post({...report, source: 'oracle-host'});
    assert.equal(sent.length, 3);
    await post({...broken, source: 'oracle-host'});
    assert.match(sent[3], /后端服务器异常/);
    assert.equal(state.get('account:test-host'), 'ok');
    await post({name: '测试', text: '通用通知'});
    assert.equal(sent[4], '☁️ 测试\n通用通知');
  } finally { globalThis.fetch = original; }
});

test('public account checks: initial healthy is silent, outage and recovery notify once', async () => {
  const state = new Map([['monitor:initialized', 'true']]);
  const sent = [], checked = [];
  let outage = false;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    if (String(url).startsWith('https://api.telegram.org/')) {
      sent.push(JSON.parse(options.body).text);
      return new Response('{}');
    }
    checked.push(url);
    return new Response('', {status: outage && url === 'https://account.tinylabpro.com/health' ? 503 : 200});
  };
  const env = { TELEGRAM_BOT_TOKEN: 'test', TELEGRAM_CHAT_ID: 'test',
    MONITOR_STATE: {get: async k => state.get(k) ?? null, put: async (k,v) => state.set(k,v)} };
  const run = async () => {
    let pending;
    await worker.scheduled({}, env, {waitUntil: p => {pending = p;}});
    await pending;
  };
  try {
    await run();
    assert.ok(checked.includes('https://account.tinylabpro.com/'));
    assert.ok(checked.includes('https://account.tinylabpro.com/health'));
    assert.equal(sent.length, 0);
    outage = true;
    await run(); await run();
    assert.equal(sent.length, 1);
    assert.match(sent[0], /网站异常.*\nhttps:\/\/account.tinylabpro.com\/health\n原因：HTTP 503/);
    outage = false;
    await run(); await run();
    assert.equal(sent.length, 2);
    assert.match(sent[1], /网站已恢复/);
  } finally { globalThis.fetch = original; }
});

test('both servers email independently; channel failures retry without duplicate successful delivery', async () => {
  const state = new Map();
  const sent = {mail: [], telegram: []};
  let failMail = false, failTelegram = false;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const mail = String(url).includes('api.oqumail.com');
    if (mail ? failMail : failTelegram) return new Response('', {status: 503});
    const body = JSON.parse(options.body);
    if (mail) {
      assert.deepEqual(body.to, ['test@example.com']);
      assert.equal(options.headers.authorization, 'Bearer mail-test');
      assert.match(body.subject, /^\[监控通知\]/);
    }
    sent[mail ? 'mail' : 'telegram'].push(body.text);
    return new Response('{}');
  };
  const env = {TELEGRAM_BOT_TOKEN:'test', TELEGRAM_CHAT_ID:'test', WEBHOOK_SECRET:'test',
    OQUMAIL_API_KEY:'mail-test', ALERT_EMAIL_TO:'test@example.com',
    MONITOR_STATE: {get: async k => state.get(k) ?? null, put: async (k,v) => state.set(k,v)}};
  const post = payload => worker.fetch(new Request('https://example.com/cloudflare-alert', {
    method:'POST', headers:{'cf-webhook-auth':'test'}, body:JSON.stringify(payload)
  }), env);
  try {
    for (const source of ['account-host', 'oracle-host']) {
      await post({source, status:'ok', hostname:source});
    }
    assert.equal(sent.mail.length, 2);
    assert.match(sent.mail[0], /账号服务器/);
    assert.match(sent.mail[1], /后端服务器/);
    const broken = {source:'account-host', hostname:'account-host', status:'problem', problem:'API 异常'};
    failMail = true;
    await assert.rejects(post(broken));
    assert.equal(sent.telegram.length, 3);
    assert.equal(sent.mail.length, 2);
    failMail = false;
    await post(broken);
    assert.equal(sent.telegram.length, 3);
    assert.equal(sent.mail.length, 3);
    failTelegram = true;
    await assert.rejects(post({...broken, status:'ok'}));
    assert.equal(sent.mail.length, 4);
    failTelegram = false;
    await post({...broken, status:'ok'});
    assert.equal(sent.mail.length, 4);
    assert.equal(sent.telegram.length, 4);
    assert.match(sent.mail[3], /已恢复/);
    await post({...broken, status:'ok'});
    assert.equal(sent.mail.length, 4);
  } finally {globalThis.fetch = original;}
});
