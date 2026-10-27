'use client';

import { useState } from 'react';
import { ProductCategories, EmptyCategory, productType, productCategories } from '@/components/product-categories';
import { ArrowUpRight, Code2, HeartHandshake, ShieldCheck, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { AdSlot } from '@/components/ad-slot';
import { tools } from '@/lib/tool-catalog';
import { LabStory } from '@/components/lab-story';


export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleTools = activeCategory === 'all' ? tools : tools.filter((tool) => productType(tool.name) === activeCategory);

  return <main className="lab-home min-h-screen bg-[radial-gradient(900px_360px_at_92%_-150px,rgba(41,84,232,.12),transparent_72%),#f7f8fc] text-slate-950">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8fc]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/#top" className="flex items-center gap-3" aria-label="小产品实验室首页">
          <img src="/avatar-128.webp" alt="小产品实验室头像" width={128} height={128} className="size-10 rounded-xl object-cover ring-1 ring-slate-200" />
          <span><span className="block text-[15px] font-bold tracking-tight">小产品实验室</span><span className="block font-mono text-[10px] tracking-[.12em] text-slate-500">TINY PRODUCT LAB</span></span>
        </a>
        <nav className="flex items-center gap-1.5" aria-label="主导航">

          <a href="/#tools" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">全部工具</a>
          <a href="/messages" className="px-2 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:px-3">留言板</a>
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" className="hidden h-9 px-2.5 text-sm text-slate-600 xl:inline-flex" />}>隐私说明</DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-lg"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ShieldCheck className="size-6" /></div><DialogTitle className="text-xl font-bold">隐私说明</DialogTitle><DialogDescription className="pt-2 leading-7">小产品实验室坚持按需、最少地处理数据。主站不再提供天气定位入口，也不会自动读取你的精确位置。</DialogDescription></DialogHeader><div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600"><p className="font-semibold text-slate-900">位置与天气</p><p>各产品的数据处理方式以对应页面说明为准；使用联网功能前请先阅读隐私提示。</p></div></DialogContent>
          </Dialog>
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'hidden h-9 rounded-xl border-slate-300 bg-white px-3 text-slate-800 sm:inline-flex')}><Code2 data-icon="inline-start" /><span>GitHub</span></a>
          <a href="/en" className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-9 rounded-xl px-2.5 text-sm font-semibold text-slate-600 hover:text-slate-950')}><Globe className="size-4" /><span>EN</span></a>
          <Dialog>
            <DialogTrigger render={<Button aria-label="支持小产品实验室" className="h-9 rounded-xl bg-[#f3b53f] px-2.5 text-amber-950 hover:bg-[#e8a92f] sm:px-3" />}><HeartHandshake className="size-4" /><span className="hidden md:inline">请开发者喝咖啡</span><span className="hidden sm:inline md:hidden">支持</span></DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-md"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><HeartHandshake className="size-6" /></div><DialogTitle className="text-xl font-bold">请开发者喝杯咖啡</DialogTitle><DialogDescription className="pt-2 leading-7">感谢你愿意支持小产品实验室。打赏方式会在网站稳定运行后开放。</DialogDescription></DialogHeader></DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>


    <LabStory lang="zh" />

    <section id="tools" className="scroll-mt-24 px-5 pb-14 pt-7 sm:px-8 sm:pb-18 sm:pt-8"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">探索产品</p><h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">找到适合你的那一个</h2></div><span className="text-sm text-slate-500">当前收录 {tools.length} 个小产品</span></div>
      <ProductCategories lang="zh" active={activeCategory} onChange={setActiveCategory} tools={tools} />
      <p role="status" className="mt-5 text-sm text-slate-500">{productCategories.find(category => category.id === activeCategory)?.zh} · {visibleTools.length} 个产品</p>
      <div id="product-results" className="mt-4 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleTools.length === 0 && <EmptyCategory lang="zh" />}{visibleTools.map((tool) => { const body = <Card className={cn('product-card h-full min-h-66 min-w-0 gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 ring-1 ring-slate-200', tool.href && 'transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,42,75,.07)] group-focus-visible:ring-blue-600 motion-reduce:transform-none motion-reduce:transition-none')}><CardHeader className="gap-0 p-5 sm:p-6"><div className="mb-5 flex items-start justify-between"><span className={cn('grid size-12 place-items-center overflow-hidden rounded-2xl', `tool-icon-${tool.tone}`)}><img src={tool.logo} alt={`${tool.title} Logo`} width={128} height={128} className="size-9 rounded-lg object-cover" loading="lazy" /></span><Badge variant={tool.status === 'NEW' ? 'default' : 'secondary'} className={tool.status === 'NEW' ? 'bg-[#2954e8]' : 'bg-slate-100 text-slate-600'}>{tool.status}</Badge></div><p className="mb-2 text-xs font-medium text-[#2954e8]">{productCategories.find(category => category.id === productType(tool.name))?.zh}</p><p className="font-mono text-[11px] tracking-[.13em] text-slate-400">{tool.name}</p><h3 className="mt-2 text-xl font-bold leading-snug tracking-tight">{tool.title}</h3></CardHeader><CardContent className="flex flex-1 flex-col justify-between gap-6 p-5 pt-0 sm:p-6 sm:pt-0"><p className="leading-6 text-slate-600">{tool.description}</p><div className="flex flex-wrap items-end justify-between gap-3"><div className="flex min-w-0 flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{tag}</span>)}</div>{tool.href && <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2954e8]">{productType(tool.name) === 'games' ? '开始体验' : tool.status === '开源' ? '查看项目' : '打开工具'}<ArrowUpRight className="size-4" /></span>}</div></CardContent></Card>; return tool.href ? <a key={tool.name} href={`/tools/${tool.slug}`} className="group block min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">{body}</a> : <div key={tool.name} className="min-w-0">{body}</div>; })}</div>
    </div></section>

    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT} className="px-5 pb-2 pt-1 sm:px-8" />


    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT} className="bg-white px-5 py-8 sm:px-8" />

    <section aria-labelledby="about-heading" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">关于小产品实验室</p><h2 id="about-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">让小需求，不必安装大软件</h2><p className="mt-4 max-w-2xl leading-8 text-slate-600">小产品实验室（TinyProductLab）是一个持续更新的轻量在线工具集合，涵盖图片处理、学习效率、教师辅助、隐私安全、日常办公和开发测试等使用场景。我们从真实需求出发，让工具保持简单、专注、打开即用。</p><p className="mt-4 max-w-2xl leading-8 text-slate-600">小产品实验室的每一个工具都针对一个具体问题设计：NotebookLM 去水印帮助学术作者清理导出文件，教师工具箱覆盖课堂点名、分组、计时等高频场景，学生工具箱提供 GPA、错题本、背单词等 43 个学习工具，KeyScan 与 Tiny OTP 让密码和动态验证码留在本地，加密调查问卷在浏览器端完成端到端加密，在线图片工具箱提供证件照、压缩、去背景等 9 项处理，地址生成器覆盖 249 个国家和地区的测试数据。</p><p className="mt-4 max-w-2xl leading-8 text-slate-600">我们坚持三个原则：能在浏览器本地完成的处理不强制上传；需要联网的功能如实说明数据流向；不注册账号也能使用核心功能。小产品实验室不会用虚构的用户数或评分包装产品，而是持续根据实际反馈修正问题、补充说明。</p></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#f7f8fc] p-5"><h3 className="font-bold">简单直接</h3><p className="mt-2 text-sm leading-6 text-slate-600">减少注册、安装和复杂设置，把注意力留给正在做的事情。</p></div><div className="rounded-2xl bg-[#f7f8fc] p-5"><h3 className="font-bold">重视隐私</h3><p className="mt-2 text-sm leading-6 text-slate-600">能在浏览器本地完成的处理尽量留在本机，联网功能如实说明。</p></div><div className="rounded-2xl bg-[#f7f8fc] p-5 sm:col-span-2"><h3 className="font-bold">持续更新</h3><p className="mt-2 text-sm leading-6 text-slate-600">根据实际使用反馈修正问题、补充说明并改进体验，不用虚构数据包装产品。</p></div></div>
      </div>
    </section>

    <section aria-labelledby="faq-heading" className="bg-[#f7f8fc] px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl"><h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">常见问题</h2><div className="mt-7 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">需要注册吗？</h3><p className="mt-3 text-sm leading-7 text-slate-600">小产品实验室主站无需注册即可浏览和使用工具。每个工具页面会明确说明是否需要网络连接或数据同步；标明“本地优先”或“浏览器本地处理”的工具，核心功能不需要上传数据。</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">文件会上传吗？</h3><p className="mt-3 text-sm leading-7 text-slate-600">标明"浏览器本地处理"的功能不会为处理而上传文件；其他功能会明确说明数据流向。</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">可以反馈新工具吗？</h3><p className="mt-3 text-sm leading-7 text-slate-600">可以。小产品实验室欢迎用户反馈实际需求、使用场景和期望结果。请通过联系页面发送建议，我们会根据需求优先级和可行性评估是否开发新工具。</p></div></div></div></section>

    <aside className="ad-slot-left" aria-hidden="true" />
    <aside className="ad-slot-right" aria-hidden="true" />
    <SiteFooter lang="zh" />
  </main>;
}
