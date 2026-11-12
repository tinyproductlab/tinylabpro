'use client';

import { useState } from 'react';

export function CopyName({ name, buttonText = '复制', label = `复制名称：${name}` }: { name: string; label?: string; buttonText?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyName() {
    try {
      await navigator.clipboard.writeText(name);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }

  return <span className="inline-flex flex-wrap items-center gap-2 align-middle">
    <button type="button" onClick={copyName} aria-label={label} className="rounded-lg border border-slate-300 px-2.5 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{buttonText}</button>
    <span role="status" className="text-sm text-slate-600">
      {status === 'copied' ? '已复制' : status === 'failed' ? '复制失败，请选中文字手动复制。' : ''}
    </span>
  </span>;
}
