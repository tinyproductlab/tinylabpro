'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, CloudSun, Code2, HeartHandshake, ShieldCheck, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { AdSlot } from '@/components/ad-slot';
import { tools } from '@/lib/tool-catalog';
import { LabStory } from '@/components/lab-story';
import { MessageBoard } from '@/components/message-board';
import { blogPosts } from '@/lib/blog-posts';

const categories = ['全部', '文档处理', '教师工具', '学生工具', '隐私安全', '图片处理', '实用工具'];
type WeatherData = { temperature: number; condition: string };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [weatherPlace, setWeatherPlace] = useState('上海');
  const visibleTools = activeCategory === '全部' ? tools : tools.filter((tool) => tool.category === activeCategory);

  const loadWeather = async (lat = 31.2304, lon = 121.4737, place = '上海') => {
    setWeatherStatus('loading');
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('weather unavailable');
      setWeather(await response.json());
      setWeatherPlace(place);
      setWeatherStatus('ready');
    } catch {
      setWeatherStatus('error');
    }
  };

  useEffect(() => { void loadWeather(); }, []);

  const locateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => void loadWeather(position.coords.latitude, position.coords.longitude, '当前位置'),
      () => setWeatherPlace('上海'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 900000 },
    );
  };

  return <main className="min-h-screen bg-[radial-gradient(900px_360px_at_92%_-150px,rgba(41,84,232,.12),transparent_72%),#f7f8fc] text-slate-950">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8fc]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/#top" className="flex items-center gap-3" aria-label="小产品实验室首页">
          <img src="/avatar-128.webp" alt="小产品实验室头像" width={128} height={128} className="size-10 rounded-xl object-cover ring-1 ring-slate-200" />
          <span><span className="block text-[15px] font-bold tracking-tight">小产品实验室</span><span className="block font-mono text-[10px] tracking-[.12em] text-slate-500">TINY PRODUCT LAB</span></span>
        </a>
        <nav className="flex items-center gap-1.5" aria-label="主导航">
          <Dialog>
            <DialogTrigger render={<button type="button" className="hidden h-9 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 text-left hover:bg-white lg:flex" />}>
              <CloudSun className="size-4 text-[#2954e8]" />
              {weatherStatus === 'ready' && weather ? <><span className="text-xs text-slate-500">{weatherPlace}</span><span className="text-sm font-bold">{weather.temperature}°</span><span className="max-w-15 truncate text-xs text-slate-600">{weather.condition}</span></> : <span className="text-xs text-slate-500">{weatherStatus === 'error' ? '天气不可用' : '天气加载中'}</span>}
            </DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-md"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-blue-100 text-[#2954e8]"><CloudSun className="size-6" /></div><DialogTitle className="text-xl font-bold">显示当地天气？</DialogTitle><DialogDescription className="pt-2 leading-7">需要使用你当前的位置，仅用于查询天气，不会保存。</DialogDescription></DialogHeader><div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><DialogClose render={<Button variant="outline" />}>先不用</DialogClose><DialogClose render={<Button onClick={locateMe} className="bg-[#2954e8] hover:bg-[#2145c7]" />}>获取天气</DialogClose></div></DialogContent>
          </Dialog>
          <a href="/notes" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 lg:block">实验记录</a>
          <a href="/#tools" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">全部工具</a>
          <a href="/blog" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 lg:block">博客</a>
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" className="hidden h-9 px-2.5 text-sm text-slate-600 xl:inline-flex" />}>隐私说明</DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-lg"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ShieldCheck className="size-6" /></div><DialogTitle className="text-xl font-bold">隐私说明</DialogTitle><DialogDescription className="pt-2 leading-7">小产品实验室坚持按需、最少地处理数据。网站不会自动读取位置；只有点击天气并确认后，浏览器才会请求定位权限。</DialogDescription></DialogHeader><div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600"><p className="font-semibold text-slate-900">位置与天气</p><p>经纬度只用于本站天气接口向 Apple WeatherKit 查询当地天气，不保存位置历史。拒绝定位不会影响其他工具使用。</p></div></DialogContent>
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

    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT} className="px-5 pb-2 pt-1 sm:px-8" />

    <MessageBoard />

    <section aria-labelledby="blog-heading" className="px-5 pb-4 pt-12 sm:px-8 sm:pt-16"><div className="mx-auto max-w-7xl">
      <div className="flex items-end justify-between gap-5"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">LAB BLOG</p><h2 id="blog-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">最新文章</h2></div><a href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2954e8]">全部文章 <ArrowRight className="size-4" /></a></div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">{blogPosts.slice(0, 3).map((post) => <a key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(27,42,75,.08)]"><div className="flex items-center justify-between gap-3"><span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[10px] font-semibold tracking-[.12em] text-[#2954e8]">{post.category}</span><span className="text-xs text-slate-400">{post.publishedAt}</span></div><h3 className="mt-5 text-lg font-bold leading-7 tracking-tight group-hover:text-[#2954e8]">{post.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{post.excerpt}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2954e8]">阅读全文 <ArrowRight className="size-4" /></span></a>)}</div>
    </div></section>

    <section id="tools" className="px-5 pb-14 pt-8 sm:px-8 sm:pb-18 sm:pt-10"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">工具集合</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">小产品实验室的在线工具集合</h2></div><span className="text-sm text-slate-500">当前收录 {tools.length} 个小产品</span></div>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="工具分类">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', activeCategory === category ? 'bg-[#2954e8] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100')}>{category}</button>)}</div>
      <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleTools.map((tool) => { const body = <Card className={cn('h-full min-h-66 min-w-0 gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 ring-1 ring-slate-200', tool.href && 'transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(27,42,75,.10)]')}><CardHeader className="gap-0 p-6"><div className="mb-8 flex items-start justify-between"><span className={cn('grid size-12 place-items-center overflow-hidden rounded-2xl', `tool-icon-${tool.tone}`)}><img src={tool.logo} alt={`${tool.title} Logo`} width={128} height={128} className="size-9 rounded-lg object-cover" loading="lazy" /></span><Badge variant={tool.status === 'NEW' ? 'default' : 'secondary'} className={tool.status === 'NEW' ? 'bg-[#2954e8]' : 'bg-slate-100 text-slate-600'}>{tool.status}</Badge></div><p className="font-mono text-[11px] tracking-[.13em] text-slate-400">{tool.name}</p><h3 className="mt-2 text-xl font-bold">{tool.title}</h3></CardHeader><CardContent className="flex flex-1 flex-col justify-between gap-6 p-6 pt-0"><p className="leading-6 text-slate-600">{tool.description}</p><div className="flex flex-wrap items-end justify-between gap-3"><div className="flex min-w-0 flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{tag}</span>)}</div>{tool.href && <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2954e8]">{tool.status === '开源' ? '查看项目' : '打开工具'}<ArrowUpRight className="size-4" /></span>}</div></CardContent></Card>; return tool.href ? <a key={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" className="block min-w-0">{body}</a> : <div key={tool.name} className="min-w-0">{body}</div>; })}</div>
    </div></section>

    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT} className="bg-white px-5 py-8 sm:px-8" />

    <section aria-labelledby="about-heading" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">关于小产品实验室</p><h2 id="about-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">让小需求，不必安装大软件</h2><p className="mt-4 max-w-2xl leading-8 text-slate-600">小产品实验室（TinyProductLab）是一个持续更新的轻量在线工具集合，涵盖图片处理、学习效率、教师辅助、隐私安全、日常办公和开发测试等使用场景。我们从真实需求出发，让工具保持简单、专注、打开即用。</p><p className="mt-4 max-w-2xl leading-8 text-slate-600">小产品实验室的每一个工具都针对一个具体问题设计：NotebookLM 去水印帮助学术作者清理导出文件，教师工具箱覆盖课堂点名、分组、计时等高频场景，学生工具箱提供 GPA、错题本、背单词等 43 个学习工具，KeyScan 与 Tiny OTP 让密码和动态验证码留在本地，加密调查问卷在浏览器端完成端到端加密，在线图片工具箱提供证件照、压缩、去背景等 9 项处理，地址生成器覆盖 249 个国家和地区的测试数据。</p><p className="mt-4 max-w-2xl leading-8 text-slate-600">我们坚持三个原则：能在浏览器本地完成的处理不强制上传；需要联网的功能如实说明数据流向；不注册账号也能使用核心功能。小产品实验室不会用虚构的用户数或评分包装产品，而是持续根据实际反馈修正问题、补充说明。</p></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#f7f8fc] p-5"><h3 className="font-bold">简单直接</h3><p className="mt-2 text-sm leading-6 text-slate-600">减少注册、安装和复杂设置，把注意力留给正在做的事情。</p></div><div className="rounded-2xl bg-[#f7f8fc] p-5"><h3 className="font-bold">重视隐私</h3><p className="mt-2 text-sm leading-6 text-slate-600">能在浏览器本地完成的处理尽量留在本机，联网功能如实说明。</p></div><div className="rounded-2xl bg-[#f7f8fc] p-5 sm:col-span-2"><h3 className="font-bold">持续更新</h3><p className="mt-2 text-sm leading-6 text-slate-600">根据实际使用反馈修正问题、补充说明并改进体验，不用虚构数据包装产品。</p></div></div>
      </div>
    </section>

    <section aria-labelledby="faq-heading" className="bg-[#f7f8fc] px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl"><h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">常见问题</h2><div className="mt-7 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">需要注册吗？</h3><p className="mt-3 text-sm leading-7 text-slate-600">小产品实验室主站无需注册即可浏览和使用工具。每个工具页面会明确说明是否需要网络连接或数据同步；标明“本地优先”或“浏览器本地处理”的工具，核心功能不需要上传数据。</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">文件会上传吗？</h3><p className="mt-3 text-sm leading-7 text-slate-600">标明"浏览器本地处理"的功能不会为处理而上传文件；其他功能会明确说明数据流向。</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">可以反馈新工具吗？</h3><p className="mt-3 text-sm leading-7 text-slate-600">可以。小产品实验室欢迎用户反馈实际需求、使用场景和期望结果。请通过联系页面发送建议，我们会根据需求优先级和可行性评估是否开发新工具。</p></div></div></div></section>

    <aside className="ad-slot-left" data-label="Ad" aria-hidden="true" />
    <aside className="ad-slot-right" data-label="Ad" aria-hidden="true" />
    <SiteFooter lang="zh" />
  </main>;
}
