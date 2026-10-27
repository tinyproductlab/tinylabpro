import { env } from 'cloudflare:workers';
import { isMessageAdmin, parseReply } from '@/lib/message-admin';

export const runtime = 'edge';
type BoardEnv = { MESSAGE_BOARD: D1Database; MESSAGE_BOARD_ADMIN_KEY?: string };
const headers = { 'Cache-Control': 'no-store' };

function unauthorized() {
  return Response.json({ error: '管理密钥不正确，请重新输入。' }, { status: 401, headers });
}

export async function GET(request: Request) {
  if (!isMessageAdmin(request, (env as unknown as BoardEnv).MESSAGE_BOARD_ADMIN_KEY)) return unauthorized();
  return Response.json({ authenticated: true }, { headers });
}

export async function PUT(request: Request) {
  const bindings = env as unknown as BoardEnv;
  if (!isMessageAdmin(request, bindings.MESSAGE_BOARD_ADMIN_KEY)) return unauthorized();
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: '请求来源不正确。' }, { status: 403, headers });
  }
  let reply;
  try { reply = parseReply(await request.json()); } catch { reply = null; }
  if (!reply) return Response.json({ error: '请选择留言，回复请控制在 1 到 1000 个字之间。' }, { status: 400, headers });
  try {
    const repliedAt = new Date().toISOString();
    const result = await bindings.MESSAGE_BOARD.prepare(
      'INSERT INTO message_replies (message_id, content, updated_at) SELECT id, ?, ? FROM messages WHERE id = ? ON CONFLICT(message_id) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at',
    ).bind(reply.content, repliedAt, reply.messageId).run();
    if (!result.meta.changes) return Response.json({ error: '这条留言已不存在。' }, { status: 404, headers });
    return Response.json({ reply: { message_id: reply.messageId, content: reply.content, updated_at: repliedAt } }, { headers });
  } catch (error) {
    console.error('Message reply failed', error);
    return Response.json({ error: '回复未保存，请稍后重试。' }, { status: 503, headers });
  }
}
