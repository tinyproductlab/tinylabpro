'use client';

import { useRef, useState } from 'react';

export function CopyInvite({ url = 'https://tinyplab.com/0Fsr58', id = 'gemini-invitation', label = 'Telegram 邀请链接', buttonLabel = '复制邀请链接', qrImage = '/gemini/invitation.png' }: { url?: string; id?: string; label?: string; buttonLabel?: string; qrImage?: string }) {
  const field = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');
  const [showQr, setShowQr] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('已复制，请粘贴到浏览器中打开。');
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus('请长按或选中上方链接，手动复制。');
    }
  }
  return <div className="mt-3">
    <label htmlFor={id} className="sr-only">{label}</label>
    <input ref={field} id={id} readOnly value={url} onFocus={e => e.currentTarget.select()} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-700" />
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
      <button type="button" onClick={copy} className="min-h-12 rounded-xl bg-[#2954e8] px-5 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">{buttonLabel}</button>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`直接打开${label}（新窗口）`} className="flex min-h-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold !text-blue-700 !no-underline hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">直接打开 ↗</a>
      <button type="button" aria-expanded={showQr} aria-controls={`${id}-qr`} onClick={() => setShowQr(value => !value)} className="col-span-2 min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:col-span-1">{showQr ? '收起二维码' : '生成二维码'}</button>
    </div>
    <div id={`${id}-qr`} hidden={!showQr} className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-center">
      {showQr && <><img src={qrImage} alt={`${label}二维码`} width={232} height={232} className="mx-auto size-[232px] max-w-full" /><p className="!mt-1 text-sm">用手机相机或扫码工具扫描，继续在手机上操作。</p><span className="mt-1 block break-all text-xs text-slate-500">{url}</span></>}
    </div>
    <div role="status" aria-live="polite" className={status ? 'mt-2 text-sm text-slate-600' : 'sr-only'}>{status}</div>
  </div>;
}
