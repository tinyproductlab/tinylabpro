import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';

export function InfoPage({ title, intro, children, className = '', backHref = '/', backLabel = '返回首页' }: { title: string; intro: string; children: ReactNode; className?: string; backHref?: string; backLabel?: string }) {
  return <main className={`min-h-screen bg-[#f7f8fc] text-slate-950 ${className}`}>
    <header className="border-b border-slate-200 bg-white/90 px-5 py-4 sm:px-8">
      <div className="mx-auto flex max-w-5xl items-start justify-between gap-4">
        <a href="/" className="flex min-w-0 items-center gap-3 pt-1" aria-label="返回小产品实验室首页">
          <img src="/avatar-128.webp" alt="" width={128} height={128} className="size-10 shrink-0 rounded-xl object-cover" />
          <span><strong className="block text-sm">小产品实验室</strong><span className="text-xs text-slate-500">TinyProductLab</span></span>
        </a>
        <figure className="shrink-0 text-center">
          <img src="/assets/brand/official-account-qr.jpg" alt="小产品实验室微信公众号关注二维码" width={112} height={112} className="size-20 rounded-lg bg-white ring-1 ring-slate-200 sm:size-28" />
          <figcaption className="mt-1 text-xs text-slate-600">微信扫码关注</figcaption>
        </figure>
      </div>
    </header>
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <a href={backHref} className="text-sm font-semibold text-[#2954e8]">← {backLabel}</a>
      <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-8 text-slate-600">{intro}</p>
      <div className="prose-lite mt-10 space-y-8">{children}</div>
    </article>
    <SiteFooter />
  </main>;
}
