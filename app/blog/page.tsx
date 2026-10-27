import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon, FlaskConical } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
const articles = [
  { href: 'https://mp.weixin.qq.com/s/CqgPs1TLKlhFGawgt-lh0A', label: '猫猫纸箱公众号文章', cover: '/blog/cat-box-cover.png', width: 1536, height: 1024 },
  { href: 'https://mp.weixin.qq.com/s/3pI0BLPafU8HiSWG6xDemA', label: 'Google Play 正式版通过公众号文章', cover: '/blog/google-play-cover.png', width: 1080, height: 608 },
];

export const metadata: Metadata = {
  title: '公众号文章',
  description: '小产品实验室的产品故事、工具使用记录与公众号文章整理。',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between"><Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#2954e8]">小产品实验室</Link><span className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">WECHAT ARTICLES</span></div></header>
    <section className="px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20"><div className="mx-auto max-w-5xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2954e8]"><FlaskConical className="size-3.5" />产品故事与实验记录</span>
      <h1 className="mt-5 text-4xl font-black tracking-[-.045em] sm:text-5xl">公众号文章</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">产品故事与实验记录，都在公众号里。点击封面，前往阅读原文。</p>
      <aside aria-label="公众号文章功能提示" className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-950">
        <FlaskConical aria-hidden="true" className="mt-1 size-5 shrink-0 text-amber-700" />
        <div><h2 className="text-sm font-semibold">功能正在实验中……</h2><p className="mt-1 text-sm leading-6 text-amber-900">公众号文章正在逐步完善，已有文章可以正常阅读。更多内容与功能会陆续更新。</p></div>
      </aside>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {articles.map((article, index) => (
          <a key={article.href} href={article.href} target="_blank" rel="noopener noreferrer" aria-label={`${article.label}，在新窗口打开公众号原文`} className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-100 text-slate-400 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
            {index === 0 && <span className="absolute left-4 top-4 z-10 rounded-full bg-[#2954e8] px-3 py-1 text-xs font-semibold text-white">最新</span>}
            {article.cover ? <Image src={article.cover} alt={`${article.label}封面`} width={article.width} height={article.height} unoptimized priority={index === 0} className="h-full w-full object-contain" /> : <span className="flex flex-col items-center gap-3"><ImageIcon aria-hidden="true" className="size-7" /><span className="text-sm">封面待补充</span></span>}
            {!article.cover && <span aria-hidden="true" className="absolute bottom-3 right-4 font-mono text-xs text-slate-400">0{index + 1}</span>}
          </a>
        ))}
      </div>
    </div></section><SiteFooter lang="zh" />
  </main>;
}
