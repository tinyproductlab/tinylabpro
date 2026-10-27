'use client';

import { useEffect, useState } from 'react';
import { MessageCircleHeart, Send, ShieldCheck, CornerDownRight, KeyRound } from 'lucide-react';

type Message = {
  id: string; nickname: string; content: string; created_at: string;
  reply_content?: string | null; replied_at?: string | null;
};
const inputStyle = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] leading-5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';
const buttonStyle = 'inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#2954e8] px-4 text-sm font-semibold text-white hover:bg-[#2145c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50';

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(date);
}

export function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');
  const [manageOpen, setManageOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  // The key stays in memory only and is never saved in browser storage or URLs.
  const [adminKey, setAdminKey] = useState('');
  const [adminNotice, setAdminNotice] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [savingReply, setSavingReply] = useState(false);
  const [replyNotice, setReplyNotice] = useState('');

  async function loadMessages() {
    try {
      const response = await fetch('/api/messages', { cache: 'no-store' });
      if (!response.ok) throw new Error();
      const data = await response.json() as { messages: Message[] };
      setMessages(data.messages);
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    const controller = new AbortController();
    void fetch('/api/messages', { cache: 'no-store', signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json() as Promise<{ messages: Message[] }>; })
      .then((data: { messages: Message[] }) => setMessages(data.messages))
      .catch(() => { if (!controller.signal.aborted) setLoadError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  async function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (sending) return;
    if (content.trim().length < 2) { setNotice('留言至少写 2 个字。'); return; }
    try {
      const lastSentAt = Number(window.localStorage.getItem('tinyproductlab-message-last-sent') ?? 0);
      if (Date.now() - lastSentAt < 60_000) { setNotice('每分钟可发送一条留言，请稍后再试。'); return; }
    } catch { /* Storage may be unavailable in private browsing. */ }
    setSending(true); setNotice('');
    try {
      const response = await fetch('/api/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, content, website }),
      });
      const data = await response.json().catch(() => ({})) as { message?: Message; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error ?? '发送失败，请稍后再试。');
      try { window.localStorage.setItem('tinyproductlab-message-last-sent', String(Date.now())); } catch { /* Optional. */ }
      setMessages(current => [data.message!, ...current].slice(0, 30));
      setContent(''); setNotice('已匿名发布，谢谢你的留言。');
    } catch (error) { setNotice(error instanceof Error ? error.message : '发送失败，请稍后再试。'); }
    finally { setSending(false); }
  }

  async function authenticate(event: { preventDefault(): void }) {
    event.preventDefault(); setAuthenticating(true); setAdminNotice('');
    try {
      const response = await fetch('/api/messages/reply', { headers: { Authorization: `Bearer ${keyInput.trim()}` }, cache: 'no-store' });
      if (!response.ok) throw new Error(response.status === 401 ? '管理密钥不正确，请重新输入。' : '暂时无法验证，请稍后重试。');
      setAdminKey(keyInput.trim()); setKeyInput(''); setAdminNotice('已进入版主管理，可在留言下方回复。');
    } catch (error) { setAdminNotice(error instanceof Error ? error.message : '验证失败，请稍后重试。'); }
    finally { setAuthenticating(false); }
  }

  async function saveReply(event: { preventDefault(): void }) {
    event.preventDefault();
    if (!editingId || savingReply) return;
    setSavingReply(true); setReplyNotice('');
    try {
      const response = await fetch('/api/messages/reply', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminKey}` },
        body: JSON.stringify({ messageId: editingId, content: replyText }),
      });
      const data = await response.json() as { error?: string; reply?: { content: string; updated_at: string } };
      if (!response.ok || !data.reply) throw new Error(data.error ?? '回复未保存，请重试。');
      setMessages(current => current.map(message => message.id === editingId ? { ...message, reply_content: data.reply!.content, replied_at: data.reply!.updated_at } : message));
      setEditingId(null); setReplyText(''); setAdminNotice('版主回复已发布。');
    } catch (error) { setReplyNotice(error instanceof Error ? error.message : '回复未保存，请重试。'); }
    finally { setSavingReply(false); }
  }

  return <section id="messages" className="px-4 py-4 sm:px-6 sm:py-5">
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2954e8]"><MessageCircleHeart className="size-4" />听听你的想法</span><h1 className="mt-1 text-2xl font-bold tracking-tight">匿名留言板</h1><p className="mt-2 max-w-xl text-xs leading-5 text-slate-600">想要什么软件，也欢迎在这里说说。还可以关注公众号「小产品实验室」，通过私信或任意文章评论告诉我们。无需账号，版主回复会显示在留言下方。</p></div>
        <button type="button" aria-expanded={manageOpen} aria-controls="board-management" onClick={() => setManageOpen(!manageOpen)} className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 hover:bg-slate-50"><KeyRound className="size-4" />{adminKey ? '管理中' : '版主管理'}</button>
      </div>
      {manageOpen && <div id="board-management" className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        {adminKey ? <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-blue-900">版主身份已验证，选择下方留言即可回复。</p><button type="button" disabled={savingReply} onClick={() => { setAdminKey(''); setEditingId(null); setReplyText(''); setAdminNotice('已退出版主管理。'); }} className="min-h-11 rounded-lg border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700">退出管理</button></div> : <form onSubmit={authenticate} className="flex flex-col gap-3 sm:flex-row sm:items-end"><label className="flex-1"><span className="mb-2 block text-sm font-semibold text-blue-950">管理密钥</span><input type="password" autoComplete="off" value={keyInput} onChange={event => setKeyInput(event.target.value)} required maxLength={128} placeholder="输入专属管理密钥" className={inputStyle} /></label><button type="submit" disabled={authenticating || !keyInput.trim()} className={buttonStyle}>{authenticating ? '验证中…' : '进入管理'}</button></form>}
        <p className="mt-3 text-xs leading-6 text-blue-800">仅供版主使用，访客留言无需填写。管理身份仅在当前页面有效。</p>
      </div>}
      <output className="block text-xs text-blue-700">{adminNotice}</output>
      <div className="mt-4 grid items-start gap-4 md:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold">写一条留言</h2>
          <p className="mt-2 flex items-start gap-2 text-[11px] leading-5 text-slate-500"><ShieldCheck className="mt-1 size-4 shrink-0" />留言和回复公开展示，请勿填写账号、验证码或其他敏感信息。暂不支持链接和推广内容。</p>
          <form onSubmit={submit} className="mt-3 space-y-2">
            <label className="block"><span className="mb-2 block text-sm font-semibold">怎么称呼你 <span className="font-normal text-slate-400">（选填）</span></span><input value={nickname} onChange={event => setNickname(event.target.value)} maxLength={20} placeholder="匿名访客" className={inputStyle} /></label>
            <label className="hidden" aria-hidden="true"><span>网站</span><input value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold">留言内容</span><textarea value={content} onChange={event => setContent(event.target.value)} required minLength={2} maxLength={280} placeholder="比如：希望有一个……" className={`${inputStyle} h-24 min-h-20 resize-y`} /><span className="mt-1 block text-right text-xs text-slate-400">{content.length}/280</span></label>
            <p aria-live="polite" className="text-xs leading-5 text-slate-600">{notice || '每分钟可发送一条留言。'}</p><button type="submit" disabled={sending} className={`${buttonStyle} w-full`}><Send className="size-4" />{sending ? '发送中…' : '匿名发布'}</button>
          </form>
        </div>
        <div><div className="flex items-center justify-between gap-3"><h2 className="text-base font-bold">最近留言</h2><span className="text-xs text-slate-500">展示最近 30 条</span></div>
          {loading ? <output className="mt-3 block text-sm text-slate-500">正在加载留言…</output> : loadError ? <div role="alert" className="mt-3 rounded-xl bg-white p-5 text-sm text-slate-600">留言暂时无法加载。<button type="button" onClick={() => { setLoading(true); setLoadError(false); void loadMessages(); }} className="ml-2 min-h-11 font-semibold text-blue-700">重新加载</button></div> : !messages.length ? <div className="mt-3 rounded-2xl border border-dashed border-slate-300 p-8 text-center"><MessageCircleHeart className="mx-auto size-7 text-slate-400" /><p className="mt-4 text-sm text-slate-500">还没有留言，来写下第一个想法吧。</p></div> : <div tabIndex={0} aria-label="最近留言列表，可滚动浏览" className="mt-3 max-h-64 overflow-y-auto overscroll-contain space-y-2 pr-1 md:max-h-[min(420px,calc(100dvh-240px))]">{messages.map(message => <article key={message.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3"><strong className="break-all text-sm text-slate-800">{message.nickname}</strong><time dateTime={message.created_at} className="shrink-0 text-xs text-slate-400">{formatTime(message.created_at)}</time></div><p className="mt-2 whitespace-pre-wrap break-words text-[13px] leading-5 text-slate-700">{message.content}</p>
            {message.reply_content && <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/70 p-3"><div className="flex flex-wrap items-center justify-between gap-2"><span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700"><CornerDownRight className="size-4" />版主回复</span>{message.replied_at && <time dateTime={message.replied_at} className="text-xs text-slate-400">{formatTime(message.replied_at)}</time>}</div><p className="mt-2 whitespace-pre-wrap break-words text-[13px] leading-5 text-slate-700">{message.reply_content}</p></div>}
            {adminKey && editingId !== message.id && <button type="button" disabled={savingReply} onClick={() => { setEditingId(message.id); setReplyText(message.reply_content ?? ''); setReplyNotice(''); }} className="mt-3 min-h-11 text-sm font-semibold text-blue-700">{message.reply_content ? '修改版主回复' : '回复这条留言'}</button>}
            {adminKey && editingId === message.id && <form onSubmit={saveReply} className="mt-4 border-t border-slate-100 pt-4"><label className="block"><span className="mb-2 block text-sm font-semibold text-blue-800">版主回复</span><textarea value={replyText} onChange={event => setReplyText(event.target.value)} required maxLength={1000} className={`${inputStyle} min-h-28`} /><span className="mt-1 block text-right text-xs text-slate-400">{replyText.length}/1000</span></label><p role="alert" className="mt-2 text-sm text-rose-600">{replyNotice}</p><div className="mt-3 flex flex-wrap gap-3"><button type="submit" disabled={savingReply || !replyText.trim()} className={buttonStyle}>{savingReply ? '保存中…' : '发布回复'}</button><button type="button" disabled={savingReply} onClick={() => setEditingId(null)} className="min-h-11 px-3 text-sm text-slate-500">取消</button></div></form>}
          </article>)}</div>}
        </div>
      </div>
    </div>
  </section>;
}
