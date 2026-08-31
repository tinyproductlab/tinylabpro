'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, BookOpenCheck, CloudSun, Code2, Eraser, HeartHandshake, Image as ImageIcon, KeyRound, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const tools = [
  { name: 'Unmark', title: 'NotebookLM 去水印', description: '批量清理 PDF 与 PPTX 水印，处理后还能添加自己的 Logo 或文字标识。', href: 'https://unmark.tinylabpro.com/', status: '已上线', icon: Eraser, tone: 'blue', tags: ['批量处理', '自定义标识', '手机可用'] },
  { name: 'Secure Survey', title: '加密调查问卷', description: '更重视隐私的在线问卷，让敏感内容在提交前完成加密。', href: 'https://survey.tinylabpro.com/', status: '已上线', icon: ShieldCheck, tone: 'violet', tags: ['隐私优先', '无需安装'] },
  { name: 'KeyScan', title: '本地安全工具箱', description: '密码、动态验证码与加密备份工具，重要数据尽量留在本地。', href: 'https://tinyproductlab.github.io/keyscan/', status: '开源', icon: KeyRound, tone: 'amber', tags: ['本地优先', '开源'] },
  { name: 'Teach', title: '教师工具箱', description: '为备课与日常教学准备的一组轻量工具，减少重复操作。', href: 'https://teach.tinylabpro.com/', status: '已上线', icon: BookOpenCheck, tone: 'green', tags: ['教学效率', '打开即用'] },
  { name: 'Photo', title: '图片处理工具', description: '图片压缩、格式转换与证件照处理，正在认真打磨中。', href: '', status: '开发中', icon: ImageIcon, tone: 'rose', tags: ['图片处理', '即将上线'] },
];

const heroTools = tools.slice(0, 4);

type WeatherData = { temperature: number; condition: string; feelsLike: number; humidity: number; high: number | null; low: number | null; precipitationChance: number | null; attributionUrl: string };

export default function Home() {
  const [activeTool, setActiveTool] = useState(0);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [weatherPlace, setWeatherPlace] = useState('上海');
  const selected = heroTools[activeTool];
  const SelectedIcon = selected.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTool((current) => (current + 1) % heroTools.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const loadWeather = async (lat = 31.2304, lon = 121.4737, place = '上海') => {
    setWeatherStatus('loading');
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('weather request failed');
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

  return <main className="min-h-screen overflow-hidden">
    <header className="relative z-20 border-b border-slate-200/80 bg-[#f7f8fc]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="小产品实验室首页">
          <img src="/tiny-product-lab-avatar.png" alt="小产品实验室头像" className="size-10 rounded-xl object-cover shadow-[0_8px_24px_rgba(41,84,232,.18)] ring-1 ring-slate-200" />
          <span><span className="block text-[15px] font-bold tracking-tight text-slate-950">小产品实验室</span><span className="block font-mono text-[10px] tracking-[0.12em] text-slate-500">TINY PRODUCT LAB</span></span>
        </a>
        <nav className="flex items-center gap-2" aria-label="主导航">
          <div className="hidden h-10 items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-1.5 lg:flex">
            <Dialog>
              <DialogTrigger render={<button type="button" title="点击使用当前位置" className="flex h-7 items-center gap-2 rounded-lg px-2 text-left hover:bg-white" />}>
                <CloudSun className="size-4 text-[#2954e8]" />
                {weatherStatus === 'ready' && weather ? <><span className="text-xs text-slate-500">{weatherPlace}</span><span className="text-sm font-bold text-slate-900">{weather.temperature}°</span><span className="max-w-16 truncate text-xs text-slate-600">{weather.condition}</span></> : <span className="text-xs font-medium text-slate-500">{weatherStatus === 'error' ? '天气不可用' : '天气加载中'}</span>}
              </DialogTrigger>
              <DialogContent className="rounded-2xl p-6 sm:max-w-md">
                <DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-blue-100 text-[#2954e8]"><CloudSun className="size-6" /></div><DialogTitle className="text-xl font-bold">使用当前位置获取天气</DialogTitle><DialogDescription className="pt-2 leading-7">只有在你确认并通过浏览器授权后，我们才会读取当前经纬度。位置仅用于请求当地天气，会发送到本站天气接口及 Apple WeatherKit；我们不会保存位置历史，也不会用于广告或用户画像。</DialogDescription></DialogHeader>
                <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><DialogClose render={<Button variant="outline" />}>暂不使用</DialogClose><DialogClose render={<Button onClick={locateMe} className="bg-[#2954e8] hover:bg-[#2145c7]" />}>允许定位并获取天气</DialogClose></div>
              </DialogContent>
            </Dialog>
            {weather && <a href={weather.attributionUrl} target="_blank" rel="noreferrer" title="Apple Weather 数据来源" className="border-l border-blue-200 px-2 text-[10px] font-medium text-slate-400 hover:text-slate-700">Weather</a>}
          </div>
          <a href="#tools" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">全部工具</a>
          <a href="#about" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">关于我们</a>
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" className="hidden h-10 px-3 text-sm text-slate-600 hover:text-slate-950 xl:inline-flex" />}>隐私说明</DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-lg">
              <DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ShieldCheck className="size-6" /></div><DialogTitle className="text-xl font-bold">隐私说明</DialogTitle><DialogDescription className="pt-2 leading-7">小产品实验室坚持按需、最少地处理数据。只有在使用某项功能所必需时，才会请求相关信息。</DialogDescription></DialogHeader>
              <div className="mt-2 space-y-4 text-sm leading-7 text-slate-600"><div className="rounded-xl bg-slate-50 p-4"><p className="font-semibold text-slate-900">位置与天气</p><p>网站不会自动读取位置。只有点击天气并确认后，浏览器才会请求定位权限；经纬度仅用于本站天气接口向 Apple WeatherKit 查询当地天气，不保存位置历史。</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="font-semibold text-slate-900">权限由你控制</p><p>你可以拒绝定位或在浏览器设置中随时撤销权限。拒绝定位不会影响其他工具的使用，天气将继续显示默认城市。</p></div></div>
            </DialogContent>
          </Dialog>
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10 rounded-xl border-slate-300 bg-white px-4 text-slate-800')}><Code2 data-icon="inline-start" /><span className="hidden sm:inline">GitHub</span></a>
          <Dialog>
            <DialogTrigger render={<Button className="h-10 rounded-xl bg-[#f3b53f] px-3 text-amber-950 hover:bg-[#e8a92f] sm:px-4" />}>
              <HeartHandshake className="size-4" />
              <span className="hidden md:inline">请开发者喝咖啡</span>
              <span className="md:hidden">支持</span>
            </DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-md">
              <DialogHeader>
                <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><HeartHandshake className="size-6" /></div>
                <DialogTitle className="text-xl font-bold">请开发者喝杯咖啡</DialogTitle>
                <DialogDescription className="pt-2 leading-7">感谢你愿意支持小产品实验室。这个位置已经预留，等网站稳定运行后再开放自愿打赏方式。</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>

    <section id="top" className="relative border-b border-slate-200 bg-[#f7f8fc]">
      <div className="hero-grid absolute inset-0 opacity-60" /><div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-9 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:py-20">
        <div>
          <Badge variant="outline" className="mb-6 h-7 border-blue-200 bg-blue-50 px-3 text-[#2954e8]"><span className="size-1.5 rounded-full bg-[#2954e8]" />AI 工具入口 · 持续更新</Badge>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[68px]">让 AI 真正成为<span className="mt-2 block text-[#2954e8]">打开就能用的小工具。</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">小产品实验室持续制作简单、实用、尊重隐私的在线工具。无需复杂配置，用完即走，也欢迎查看源代码。</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#tools" className={cn(buttonVariants({ size: 'lg' }), 'h-12 rounded-xl bg-[#2954e8] px-6 text-base shadow-[0_10px_30px_rgba(41,84,232,.22)] hover:bg-[#2145c7]')}>浏览全部工具<ArrowDown data-icon="inline-end" /></a>
            <a href="https://unmark.tinylabpro.com/" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 rounded-xl border-slate-300 bg-white px-6 text-base text-slate-800')}>试试最新工具<ArrowUpRight data-icon="inline-end" /></a>
          </div>
        </div>
        <div className="relative">
        <Card className="relative min-h-[460px] gap-0 overflow-visible rounded-[28px] border-0 bg-[#152c78] py-0 text-white ring-0 shadow-[0_28px_80px_rgba(20,42,112,.24)]">
          <div className="absolute -left-3 top-12 h-24 w-3 rounded-l-xl bg-[#6d8cff]" />
          <div key={selected.name} className="carousel-enter" aria-live="polite">
            <CardHeader className="gap-0 p-7 sm:p-9"><div className="mb-12 flex items-start justify-between"><span className="font-mono text-xs tracking-[0.16em] text-blue-200">PRODUCT / 0{activeTool + 1}</span><Badge className="bg-emerald-300 text-emerald-950">{selected.status}</Badge></div><div className="mb-5 grid size-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15"><SelectedIcon className="size-7" /></div><p className="font-mono text-xs tracking-[0.14em] text-blue-200">{selected.name.toUpperCase()}</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{selected.title}</h2></CardHeader>
            <CardContent className="p-7 pt-0 sm:p-9 sm:pt-0"><p className="max-w-md text-sm leading-7 text-blue-100/80 sm:text-base">{selected.description}</p><a href={selected.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200">打开工具 <ArrowUpRight className="size-4" /></a></CardContent>
          </div>
        </Card>
        <div className="relative z-10 mx-4 -mt-5 grid grid-cols-4 gap-2 rounded-2xl bg-white p-2 shadow-[0_16px_45px_rgba(20,42,112,.18)] ring-1 ring-slate-200">
          {heroTools.map((tool, index) => { const Icon = tool.icon; const active = activeTool === index; return <div key={tool.name} aria-current={active ? 'true' : undefined} className={cn('relative flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-xl px-2 text-xs font-semibold sm:text-sm', active ? 'bg-[#2954e8] text-white' : 'text-slate-400')}><Icon className="size-4 shrink-0" /><span className="hidden sm:inline">{tool.name}</span>{active && <span key={activeTool} className="carousel-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-blue-200" />}</div> })}
        </div>
        </div>
      </div>
    </section>

    <section className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 sm:grid-cols-4 sm:divide-y-0 sm:px-8">{['免注册优先', '隐私优先', '手机可用', '持续更新'].map((item, index) => <div key={item} className={cn('flex items-center gap-3 py-5 text-sm font-semibold text-slate-700 sm:justify-center', index % 2 === 0 ? 'pr-4' : 'pl-4')}><span className="size-2 rounded-full bg-[#2954e8]" />{item}</div>)}</div></section>

    <section id="tools" className="bg-[#f7f8fc] px-5 py-14 sm:px-8 sm:py-18"><div className="mx-auto max-w-7xl">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold tracking-[0.18em] text-[#2954e8]">TOOL DIRECTORY</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">一个入口，找到所有工具</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600">解决一个真实的小问题，就做成一个随时可用的小产品。</p></div><span className="text-sm text-slate-500">当前收录 {tools.length} 个产品</span></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => { const Icon = tool.icon; const body = <Card className={cn('h-full min-h-72 gap-0 rounded-2xl border-0 bg-white py-0 ring-1 ring-slate-200 transition duration-200', tool.href && 'hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(27,42,75,.10)]')}><CardHeader className="gap-0 p-6"><div className="mb-10 flex items-start justify-between"><span className={cn('tool-icon grid size-12 place-items-center rounded-2xl', `tool-icon-${tool.tone}`)}><Icon className="size-6" /></span><Badge variant={tool.status === '开发中' ? 'outline' : 'secondary'} className="bg-slate-100 text-slate-600">{tool.status}</Badge></div><p className="font-mono text-[11px] tracking-[0.13em] text-slate-400">{tool.name.toUpperCase()}</p><h3 className="mt-2 text-xl font-bold text-slate-950">{tool.title}</h3></CardHeader><CardContent className="flex flex-1 flex-col justify-between gap-6 p-6 pt-0"><p className="leading-6 text-slate-600">{tool.description}</p><div className="flex items-end justify-between gap-4"><div className="flex flex-wrap gap-2">{tool.tags.map(tag => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{tag}</span>)}</div>{tool.href && <ArrowUpRight className="size-5 shrink-0 text-slate-400" />}</div></CardContent></Card>; return tool.href ? <a key={tool.name} href={tool.href} target="_blank" rel="noreferrer" className="block">{body}</a> : <div key={tool.name}>{body}</div>; })}</div>
    </div></section>

    <section id="about" className="bg-[#101d49] px-5 py-14 text-white sm:px-8 sm:py-18"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><p className="font-mono text-xs tracking-[0.18em] text-blue-300">ABOUT TINY LAB PRO</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">从“我正好需要”，到“你也能直接用”。</h2></div><div><p className="max-w-2xl text-base leading-8 text-blue-100/75">这里不是庞大的软件商店，而是一间持续实验的小工坊。每个工具都从具体问题出发，先把核心功能做好，再根据真实使用反馈一点点更新。</p><a href="https://github.com/tinyproductlab" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-white hover:text-blue-200">在 GitHub 查看开源项目 <ArrowUpRight className="size-4" /></a></div></div></section>

    <section className="bg-white px-5 py-14 sm:px-8 sm:py-18"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-6 rounded-[28px] bg-[#eef2ff] p-7 sm:flex-row sm:items-center sm:p-8">
        <div><div className="mb-6 flex items-center gap-4"><img src="/tiny-product-lab-avatar.png" alt="小产品实验室公众号头像" className="size-16 rounded-2xl object-cover shadow-sm ring-1 ring-slate-200" /><div><p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#2954e8]">WECHAT OFFICIAL ACCOUNT</p><p className="mt-1 text-sm font-semibold text-slate-600">微信公众号</p></div></div><h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">小产品实验室</h2><p className="mt-4 max-w-xl leading-7 text-slate-600">关注产品更新、开发过程和真实使用经验。微信扫描右侧二维码即可关注。</p></div>
        <div className="shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200"><img src="/wechat-official-account.jpg" alt="小产品实验室微信公众号二维码" className="size-40 rounded-xl object-contain sm:size-44" /></div>
      </div>
    </div></section>
    <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p><span className="font-semibold text-slate-800">TinyLabPro.com</span> · 小产品实验室</p><p>小工具，也可以认真做。</p></div></footer>
  </main>;
}
