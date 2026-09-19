import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: '博客',
  description: '小产品实验室的产品故事、工具使用记录与公众号文章整理。',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between"><Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#2954e8]">小产品实验室</Link><span className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">LAB BLOG</span></div></header>
    <section className="px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20"><div className="mx-auto max-w-5xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2954e8]"><FlaskConical className="size-3.5" />产品与工具记录</span>
      <h1 className="mt-5 text-4xl font-black tracking-[-.045em] sm:text-5xl">博客</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">把公众号里整理过的内容留在这里：记录工具为什么做、怎么用，以及仍在改进的地方。</p>
      <div className="mt-12 grid gap-5">{blogPosts.map((post) => <article key={post.slug} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(27,42,75,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(27,42,75,.09)] sm:p-9"><div className="flex flex-wrap items-center gap-3"><span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[10px] font-semibold tracking-[.12em] text-[#2954e8]">{post.category}</span><span className="text-xs text-slate-400">{post.publishedAt} · {post.readingTime}</span></div><h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">{post.title}</h2><p className="mt-4 max-w-3xl leading-8 text-slate-600">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2954e8]">阅读全文 <ArrowRight className="size-4" /></Link></article>)}</div>
    </div></section><SiteFooter lang="zh" />
  </main>;
}
