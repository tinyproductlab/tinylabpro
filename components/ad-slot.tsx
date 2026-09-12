'use client';

import { useEffect } from 'react';

type AdSlotProps = {
  /** AdSense 后台创建的广告位编号；未填写时不会占用任何页面空间。 */
  slot?: string;
  className?: string;
};

const publisher = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  useEffect(() => {
    if (!publisher || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 广告拦截器或重复挂载都不应影响工具页的正常使用。
    }
  }, [slot]);

  // 未开启广告时，保留位完全不渲染，主页不会出现空白。
  if (!publisher || !slot) return null;

  return (
    <aside className={`mx-auto max-w-7xl ${className}`} aria-label="广告">
      <p className="mb-2 text-center text-[10px] font-medium tracking-[.18em] text-slate-400">广告</p>
      <ins
        className="adsbygoogle block min-h-22 overflow-hidden rounded-2xl bg-white/70"
        style={{ display: 'block' }}
        data-ad-client={publisher}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}
