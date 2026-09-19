import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', publishedTime: post.publishedAt, title: post.title, description: post.excerpt } };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8"><div className="mx-auto flex max-w-3xl items-center justify-between"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#2954e8]"><ArrowLeft className="size-4" />返回博客</Link><span className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">TINY PRODUCT LAB</span></div></header>
    <article className="px-5 pb-16 pt-14 sm:px-8 sm:pb-22 sm:pt-20"><div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(27,42,75,.05)] sm:p-12"><div className="flex flex-wrap items-center gap-3"><span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[10px] font-semibold tracking-[.12em] text-[#2954e8]">{post.category}</span><span className="text-xs text-slate-400">{post.publishedAt} · {post.readingTime}</span></div><h1 className="mt-6 text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">{post.title}</h1><p className="mt-6 border-l-2 border-[#2954e8] pl-4 text-lg leading-8 text-slate-600">{post.excerpt}</p><div className="mt-10 space-y-10">{post.sections.map((section) => <section key={section.heading}><h2 className="text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-slate-600">{paragraph}</p>)}</section>)}</div><div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">本文整理自小产品实验室公众号内容。<Link className="ml-2 font-semibold text-[#2954e8]" href="/blog">查看更多文章</Link></div></div></article><SiteFooter lang="zh" />
  </main>;
}
