'use client';

import { useRef, useState } from 'react';

export function MerchantActions({ url }: { url: string }) {
  const field = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('商家链接已复制。');
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus('已选中链接，请长按或手动复制。');
    }
  }

  return <div className="mt-5">
    <label htmlFor="merchant-link" className="block text-sm font-semibold text-slate-600">商家网址</label>
    <input id="merchant-link" ref={field} readOnly value={url} onFocus={event => event.currentTarget.select()} className="mt-2 w-full min-w-0 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" />
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={copyLink} className="min-h-11 cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">一键复制链接</button>
      <a href={url} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold !text-white !no-underline hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">直接打开商家网站 ↗<span className="sr-only">（新窗口）</span></a>
    </div>
    <p role="status" aria-live="polite" className="!mt-3 min-h-6 text-sm text-slate-500">{status || '微信内无法打开时，可复制链接到系统浏览器。'}</p>
  </div>;
}
