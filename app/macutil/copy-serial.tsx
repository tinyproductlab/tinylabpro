'use client';

import { useRef, useState } from 'react';

const serial = 'MACU-0F65-F912-53B9-4179-A2DB-7772';

export function CopySerial() {
  const field = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(serial);
      setStatus('已复制，可粘贴到 MacUtil 激活界面。');
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus('已选中序列号，请长按或手动复制。');
    }
  }
  return <div className="mt-4">
    <label htmlFor="macutil-serial" className="sr-only">MacUtil 激活序列号</label>
    <input ref={field} id="macutil-serial" type="text" readOnly value={serial} onFocus={event => event.currentTarget.select()} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-900" />
    <button type="button" onClick={copy} className="mt-3 min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">一键复制激活码</button>
    <p role="status" aria-live="polite" className={status ? '!mt-3 text-sm' : 'sr-only'}>{status}</p>
  </div>;
}
