import { env } from 'cloudflare:workers';

export const runtime = 'edge';

type MessageBoardEnv = { MESSAGE_BOARD: D1Database };

type Message = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};

const disallowedPatterns = [
  /https?:\/\//i,
  /www\./i,
  /(?:vx|v信|微信|加我).{0,12}(?:号|信|v)/i,
];

function database() {
  return (env as unknown as MessageBoardEnv).MESSAGE_BOARD;
}

export async function GET() {
  try {
    const { results } = await database()
      .prepare('SELECT id, nickname, content, created_at FROM messages ORDER BY created_at DESC LIMIT 30')
      .all<Message>();

    return Response.json({ messages: results }, {
      headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' },
    });
  } catch (error) {
    console.error('Message board read failed', error);
    return Response.json({ error: '留言板暂时不可用' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { nickname?: unknown; content?: unknown; website?: unknown };
    if (typeof body.website === 'string' && body.website.trim()) {
      return new Response(null, { status: 204 });
    }

    const nickname = (typeof body.nickname === 'string' ? body.nickname : '').trim().slice(0, 20) || '匿名访客';
    const content = (typeof body.content === 'string' ? body.content : '').trim();
    if (content.length < 2 || content.length > 280) {
      return Response.json({ error: '留言请控制在 2 到 280 个字之间' }, { status: 400 });
    }
    if (disallowedPatterns.some((pattern) => pattern.test(content))) {
      return Response.json({ error: '留言暂不支持链接、联系方式或推广内容' }, { status: 400 });
    }

    const message: Message = {
      id: crypto.randomUUID(),
      nickname,
      content,
      created_at: new Date().toISOString(),
    };
    await database()
      .prepare('INSERT INTO messages (id, nickname, content, created_at) VALUES (?, ?, ?, ?)')
      .bind(message.id, message.nickname, message.content, message.created_at)
      .run();

    return Response.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Message board write failed', error);
    return Response.json({ error: '发送失败，请稍后再试' }, { status: 500 });
  }
}
