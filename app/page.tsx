'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  CloudSun,
  Code2,
  HeartHandshake,
  Layers3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { AdSlot } from '@/components/ad-slot';
import { tools } from '@/lib/tool-catalog';

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
        <a href="#top" className="flex items-center gap-3" aria-label="小产品实验室首页">
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
          <a href="#tools" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">全部工具</a>
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" className="hidden h-9 px-2.5 text-sm text-slate-600 xl:inline-flex" />}>隐私说明</DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-lg"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ShieldCheck className="size-6" /></div><DialogTitle className="text-xl font-bold">隐私说明</DialogTitle><DialogDescription className="pt-2 leading-7">小产品实验室坚持按需、最少地处理数据。网站不会自动读取位置；只有点击天气并确认后，浏览器才会请求定位权限。</DialogDescription></DialogHeader><div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600"><p className="font-semibold text-slate-900">位置与天气</p><p>经纬度只用于本站天气接口向 Apple WeatherKit 查询当地天气，不保存位置历史。拒绝定位不会影响其他工具使用。</p></div></DialogContent>
          </Dialog>
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'hidden h-9 rounded-xl border-slate-300 bg-white px-3 text-slate-800 sm:inline-flex')}><Code2 data-icon="inline-start" /><span>GitHub</span></a>
          <Dialog>
            <DialogTrigger render={<Button aria-label="支持小产品实验室" className="h-9 rounded-xl bg-[#f3b53f] px-2.5 text-amber-950 hover:bg-[#e8a92f] sm:px-3" />}><HeartHandshake className="size-4" /><span className="hidden md:inline">请开发者喝咖啡</span><span className="hidden sm:inline md:hidden">支持</span></DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-md"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><HeartHandshake className="size-6" /></div><DialogTitle className="text-xl font-bold">请开发者喝杯咖啡</DialogTitle><DialogDescription className="pt-2 leading-7">感谢你愿意支持小产品实验室。打赏方式会在网站稳定运行后开放。</DialogDescription></DialogHeader></DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>

    <section id="top" className="px-5 pb-6 pt-9 sm:px-8 sm:pb-10 sm:pt-14">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:items-stretch">
        <div className="rounded-3xl bg-[#173fc7] px-6 py-9 text-white shadow-[0_22px_55px_rgba(26,64,190,.22)] sm:px-10 sm:py-12">
          <Badge variant="outline" className="h-7 border-white/25 bg-white/10 px-3 text-blue-50">小工具集合 · 持续更新</Badge>
          <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-[-.055em] sm:text-5xl">让每一个小需求，<br className="hidden sm:block" />都有简单的解法。</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">小产品实验室收集轻量、实用、打开就能用的小工具。不复杂，不打扰。</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#tools" className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-xl bg-white px-5 text-[#173fc7] shadow-none hover:bg-blue-50')}>浏览全部工具 <ArrowDown data-icon="inline-end" /></a><a href="/about" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-xl border-white/25 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white')}>了解实验室 <ArrowUpRight data-icon="inline-end" /></a></div>
        </div>
        <a href="/tools/unmark" className="group flex min-h-65 flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(21,39,78,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(21,39,78,.11)] sm:p-7">
          <div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-[#2954e8]"><Sparkles className="size-5" /></span><Badge className="bg-[#2954e8]">最新上线</Badge></div>
          <div><p className="font-mono text-[11px] font-semibold tracking-[.16em] text-slate-400">NOTEBOOKLM TOOL</p><h2 className="mt-2 text-2xl font-bold tracking-tight">NotebookLM 去水印</h2><p className="mt-3 max-w-sm leading-7 text-slate-600">一键处理导出的页面水印，工具打开即可使用。</p></div>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#2954e8]">打开工具 <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </a>
      </div>
    </section>

    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT} className="px-5 pb-3 pt-1 sm:px-8" />

    <section id="tools" className="border-y border-slate-200/80 bg-white px-5 py-10 sm:px-8 sm:py-14"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]"><Layers3 className="size-4" />工具集合</div><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">从现在开始，直接解决问题</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600">图片处理、教学学习、隐私安全和日常效率工具都在这里。无需注册的功能，打开即可使用。</p></div><div className="rounded-2xl bg-[#f5f7ff] px-5 py-4"><p className="text-2xl font-black tracking-tight text-[#2954e8]">{tools.length}</p><p className="mt-1 text-sm text-slate-500">个已上线小产品</p></div></div>
      <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6" aria-label="工具分类">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', activeCategory === category ? 'bg-[#2954e8] text-white shadow-[0_6px_16px_rgba(41,84,232,.22)]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>{category}</button>)}</div>
      <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleTools.map((tool) => { const body = <Card className="h-full min-h-66 min-w-0 gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(27,42,75,.10)]"><CardHeader className="gap-0 p-6"><div className="mb-8 flex items-start justify-between"><span className={cn('grid size-12 place-items-center overflow-hidden rounded-2xl', `tool-icon-${tool.tone}`)}><img src={tool.logo} alt={`${tool.title} Logo`} width={128} height={128} className="size-9 rounded-lg object-cover" loading="lazy" /></span><Badge variant={tool.status === 'NEW' ? 'default' : 'secondary'} className={tool.status === 'NEW' ? 'bg-[#2954e8]' : 'bg-slate-100 text-slate-600'}>{tool.status}</Badge></div><p className="font-mono text-[11px] tracking-[.13em] text-slate-400">{tool.name}</p><h3 className="mt-2 text-xl font-bold">{tool.title}</h3></CardHeader><CardContent className="flex flex-1 flex-col justify-between gap-6 p-6 pt-0"><p className="leading-6 text-slate-600">{tool.description}</p><div className="flex flex-wrap items-end justify-between gap-3"><div className="flex min-w-0 flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{tag}</span>)}</div><span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2954e8]">了解详情<ArrowUpRight className="size-4" /></span></div></CardContent></Card>; return <a key={tool.name} href={`/tools/${tool.slug}`} className="block min-w-0">{body}</a>; })}</div>
    </div></section>

    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT} className="bg-[#f7f8fc] px-5 py-8 sm:px-8" />

    <section aria-labelledby="about-heading" className="bg-[#f7f8fc] px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
      <div className="rounded-3xl bg-white p-7 ring-1 ring-slate-200 sm:p-9"><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">关于小产品实验室</p><h2 id="about-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">让小需求，不必安装大软件</h2><p className="mt-4 leading-8 text-slate-600">TinyProductLab 是一个持续更新的轻量在线工具集合。我们从真实需求出发，让工具保持简单、专注、打开即用。</p><a href="/about" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#2954e8]">认识小产品实验室 <ArrowUpRight className="size-4" /></a></div>
      <div><h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">使用前，你可能想知道</h2><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><h3 className="font-bold">需要注册吗？</h3><p className="mt-2 text-sm leading-6 text-slate-600">主站无需注册；同步等功能会在工具内说明。</p></div><div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><h3 className="font-bold">文件会上传吗？</h3><p className="mt-2 text-sm leading-6 text-slate-600">本地处理功能不会为处理而上传文件。</p></div><div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><h3 className="font-bold">能反馈新工具吗？</h3><p className="mt-2 text-sm leading-6 text-slate-600">可以，联系页面欢迎真实使用需求。</p></div></div></div>
    </div></section>

    <SiteFooter />
  </main>;
}
