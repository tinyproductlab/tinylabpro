import type { Metadata } from 'next';
import { ArrowRight, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toolBySlug, tools } from '@/lib/tool-catalog';

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool) return {};
  const path = `/tools/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${tool.title} - 小产品实验室`,
      description: tool.description,
      url: path,
      type: 'article',
      images: [tool.logo],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool) notFound();

  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3" aria-label="返回小产品实验室首页">
          <img src="/avatar-128.webp" alt="" className="size-10 rounded-xl object-cover ring-1 ring-slate-200" />
          <span><strong className="block text-sm">小产品实验室</strong><span className="text-xs text-slate-500">TinyProductLab</span></span>
        </a>
        <a href={tool.href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), 'rounded-xl bg-[#2954e8] hover:bg-[#2145c7]')}>打开工具 <ExternalLink data-icon="inline-end" /></a>
      </div>
    </header>

    <article>
      <section className="border-b border-slate-200 bg-white px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <nav aria-label="面包屑" className="flex items-center gap-2 text-sm text-slate-500"><a href="/" className="hover:text-[#2954e8]">首页</a><span>/</span><a href="/#tools" className="hover:text-[#2954e8]">全部工具</a><span>/</span><span>{tool.title}</span></nav>
            <div className="mt-7 flex flex-wrap items-center gap-2"><Badge className="bg-[#2954e8]">{tool.category}</Badge><Badge variant="secondary">{tool.status}</Badge>{tool.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
            <h1 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-5xl">{tool.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{tool.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3"><a href={tool.href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-xl bg-[#2954e8] px-5 hover:bg-[#2145c7]')}>立即使用 <ArrowRight data-icon="inline-end" /></a><a href="#how-to-use" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-xl bg-white px-5')}>查看使用方法</a></div>
          </div>
          <div className="mx-auto grid size-56 place-items-center rounded-[2rem] bg-[#f7f8fc] ring-1 ring-slate-200 lg:size-64"><img src={tool.logo} alt={`${tool.title} Logo`} className="size-40 rounded-3xl object-contain" /></div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"><p className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">适合谁使用</p><h2 className="mt-2 text-2xl font-bold">从真实场景开始</h2><ul className="mt-6 space-y-4">{tool.audience.map((item) => <li key={item} className="flex gap-3 leading-7 text-slate-600"><Check className="mt-1 size-5 shrink-0 text-emerald-600" />{item}</li>)}</ul></section>
        <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"><p className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">主要能力</p><h2 className="mt-2 text-2xl font-bold">这个工具可以做什么</h2><ul className="mt-6 space-y-4">{tool.features.map((item) => <li key={item} className="flex gap-3 leading-7 text-slate-600"><Check className="mt-1 size-5 shrink-0 text-[#2954e8]" />{item}</li>)}</ul></section>
      </div></section>

      <section id="how-to-use" className="border-y border-slate-200 bg-white px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto max-w-6xl"><p className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">使用方法</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">按步骤开始使用</h2><ol className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{tool.steps.map((step, index) => <li key={step} className="rounded-2xl bg-[#f7f8fc] p-5 ring-1 ring-slate-200"><span className="grid size-8 place-items-center rounded-full bg-[#2954e8] text-sm font-bold text-white">{index + 1}</span><p className="mt-4 leading-7 text-slate-700">{step}</p></li>)}</ol></div></section>

      <section className="px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl bg-blue-50 p-6 ring-1 ring-blue-200 sm:p-8"><div className="flex items-center gap-3 text-[#2954e8]"><ShieldCheck className="size-6" /><h2 className="text-xl font-bold">隐私与数据说明</h2></div><p className="mt-4 leading-8 text-slate-700">{tool.privacy}</p></section>
        <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"><h2 className="text-xl font-bold">使用前请注意</h2><ul className="mt-4 space-y-3">{tool.notes.map((note) => <li key={note} className="flex gap-3 text-sm leading-7 text-slate-600"><span className="mt-3 size-1.5 shrink-0 rounded-full bg-amber-500" />{note}</li>)}</ul></section>
      </div></section>

      {tool.slug === 'instantqr' && <section className="px-5 pb-10 sm:px-8"><div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"><h2 className="text-2xl font-bold">示例：把电脑上的链接发送到手机</h2><p className="mt-4 leading-8 text-slate-600">安装秒变二维码插件后，在网页中选中需要分享的链接或文字，打开右键菜单中的二维码入口。页面会显示二维码，使用手机扫码即可读取内容。分享当前网页时，可在页面空白处打开右键菜单，选择生成本页链接的二维码。</p><p className="mt-3 leading-8 text-slate-600">生成后可以复制或下载二维码图片。WiFi 分享时，需要填写网络名称、密码和加密方式；批量生成时每行输入一项内容。操作前请确认分享内容不包含不应公开的密码或个人信息。</p></div></section>}
      <section aria-labelledby="product-faq" className="px-5 pb-10 sm:px-8"><div className="mx-auto max-w-6xl"><h2 id="product-faq" className="text-2xl font-bold">常见问题</h2><div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">数据在哪里处理，有哪些隐私事项？</h3><p className="mt-3 leading-7 text-slate-600">{tool.privacy}</p></div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">开始使用前，需要确认什么？</h3><ul className="mt-3 space-y-2 text-slate-600">{tool.notes.map(note => <li key={note} className="leading-7">{note}</li>)}</ul></div>
        {tool.slug === 'instantqr' && <><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">必须安装插件吗？</h3><p className="mt-3 leading-7 text-slate-600">使用右键菜单、工具栏弹窗等浏览器功能需要安装插件。官网另有在线二维码工具，可用于直接输入内容生成二维码。</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">生成二维码会把内容上传吗？</h3><p className="mt-3 leading-7 text-slate-600">二维码生成和图片识码在本地处理。主动使用短链功能时，原网址会发送到短链服务；请阅读转换前的提示，再决定是否继续。</p></div></>}
      </div></div></section>

      <section className="px-5 pb-14 sm:px-8 sm:pb-18"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 rounded-3xl bg-slate-950 p-7 text-white sm:flex-row sm:items-center sm:p-9"><div><h2 className="text-2xl font-bold">准备好使用 {tool.title}？</h2><p className="mt-2 text-sm leading-7 text-slate-300">前往产品官网使用工具、查看安装方式和最新说明。</p></div><a href={tool.href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: 'lg' }), 'h-11 shrink-0 rounded-xl bg-white px-5 text-slate-950 hover:bg-slate-100')}>打开工具 <ExternalLink data-icon="inline-end" /></a></div></section>
    </article>
    <SiteFooter />
  </main>;
}
