import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isMessageAdmin, parseReply } from '../lib/message-admin.ts';
const secret = 'x'.repeat(48);
const request = value => new Request('https://tinylabpro.com/api/messages/reply', { headers: value ? { authorization: value } : {} });
test('reply access fails closed and requires the exact secret', () => {
  assert.equal(isMessageAdmin(request(), secret), false);
  assert.equal(isMessageAdmin(request(`Bearer ${secret}`), undefined), false);
  assert.equal(isMessageAdmin(request('Bearer short'), 'short'), false);
  assert.equal(isMessageAdmin(request(`Bearer ${'y'.repeat(48)}`), secret), false);
  assert.equal(isMessageAdmin(request(`Bearer ${secret}`), secret), true);
});
test('reply validation rejects invalid ids, empty content and oversized input', () => {
  const messageId = 'a31c7b1a-5457-4c3e-a9d5-463f2208ccda';
  for (const body of [null, {}, { messageId: 'bad', content: 'hello' }, { messageId, content: '  ' }, { messageId, content: 'x'.repeat(1001) }]) assert.equal(parseReply(body), null);
  assert.deepEqual(parseReply({ messageId, content: ' 回复内容 ' }), { messageId, content: '回复内容' });
});
