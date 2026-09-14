'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MessageCircleHeart, Send, ShieldCheck } from 'lucide-react';

type Message = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric' }).format(date);
}

export function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    void fetch('/api/messages')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { messages?: Message[] }) => setMessages(data.messages ?? []))
      .catch(() => setNotice('留言板暂时不可用，请稍后再试。'));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (content.trim().length < 2) {
      setStatus('error');
      setNotice('留言至少写 2 个字。');
      return;
    }
    const lastSentAt = Number(window.localStorage.getItem('tinyproductlab-message-last-sent') ?? 0);
    if (Date.now() - lastSentAt < 60_000) {
      setStatus('error');
      setNotice('每分钟可发送一条留言，请稍后再试。');
      return;
    }

    setStatus('sending');
    setNotice('');
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, content, website }),
      });
      const data = await response.json().catch(() => ({})) as { message?: Message; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error ?? '发送失败，请稍后再试。');
      window.localStorage.setItem('tinyproductlab-message-last-sent', String(Date.now()));
      setMessages((current) => [data.message!, ...current].slice(0, 30));
      setContent('');
      setStatus('success');
      setNotice('已匿名发布，谢谢你的留言。');
    } catch (error) {
      setStatus('error');
      setNotice(error instanceof Error ? error.message : '发送失败，请稍后再试。');
    }
  }

  return <section id="messages" className="border-y border-slate-200 bg-white px-5 py-12 sm:px-8 sm:py-16">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-[#2954e8]"><MessageCircleHeart className="size-4" />匿名留言板</div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">想说点什么？<br />留在这里就好。</h2>
        <p className="mt-4 max-w-md leading-8 text-slate-600">可以反馈一个真实需求、记录使用感受，或只是打个招呼。无需账号，不收集联系方式。</p>
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" /><p>留言公开展示，请不要填写个人信息、账号、验证码或任何敏感内容。链接与推广内容不会被发送。</p></div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-[#fbfcff] p-5 shadow-[0_14px_38px_rgba(27,42,75,.07)] sm:p-7">
        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row"><label className="flex-1"><span className="mb-1.5 block text-sm font-semibold text-slate-700">怎么称呼你 <span className="font-normal text-slate-400">（可不填）</span></span><input value={nickname} onChange={(event) => setNickname(event.target.value)} maxLength={20} placeholder="匿名访客" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#2954e8] focus:ring-3 focus:ring-blue-100" /></label><label className="hidden" aria-hidden="true"><span>网站</span><input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
          <label><span className="mb-1.5 block text-sm font-semibold text-slate-700">留言</span><textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={280} placeholder="比如：希望有一个…… / 这个工具帮我解决了……" className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 outline-none transition focus:border-[#2954e8] focus:ring-3 focus:ring-blue-100" /><span className="mt-1 block text-right text-xs text-slate-400">{content.length}/280</span></label>
          <div className="flex flex-wrap items-center justify-between gap-3"><p className={status === 'error' ? 'text-sm text-rose-600' : 'text-sm text-slate-500'} aria-live="polite">{notice || '每分钟限发一条；发布后公开可见。'}</p><button type="submit" disabled={status === 'sending'} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#2954e8] px-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(41,84,232,.22)] transition hover:bg-[#2145c7] disabled:cursor-not-allowed disabled:opacity-60"><Send className="size-4" />{status === 'sending' ? '发送中…' : '匿名发布'}</button></div>
        </form>

        <div className="mt-7 border-t border-slate-200 pt-5"><p className="text-sm font-semibold text-slate-800">最近留言</p>{messages.length ? <div className="mt-3 space-y-3">{messages.slice(0, 4).map((message) => <article key={message.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-100"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-slate-800">{message.nickname}</strong><time className="text-xs text-slate-400">{formatTime(message.created_at)}</time></div><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{message.content}</p></article>)}</div> : <p className="mt-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-500 ring-1 ring-slate-100">还没有留言。成为第一个写下反馈的人吧。</p>}</div>
      </div>
    </div>
  </section>;
}
