import { createHash, timingSafeEqual } from 'node:crypto';

export function isMessageAdmin(request: Request, secret: string | undefined): boolean {
  if (!secret || secret.length < 32) return false;
  const authorization = request.headers.get('authorization') ?? '';
  if (!authorization.startsWith('Bearer ') || authorization.length > 256) return false;
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(authorization.slice(7)), digest(secret));
}

export function parseReply(body: unknown): { messageId: string; content: string } | null {
  if (!body || typeof body !== 'object') return null;
  const { messageId, content } = body as Record<string, unknown>;
  if (typeof messageId !== 'string' || !/^[a-f0-9-]{36}$/i.test(messageId) || typeof content !== 'string') return null;
  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 1000) return null;
  return { messageId, content: trimmed };
}
