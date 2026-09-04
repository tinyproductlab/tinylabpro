'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  CloudSun,
  Code2,
  Copy,
  Eraser,
  GraduationCap,
  HeartHandshake,
  Image as ImageIcon,
  KeyRound,
  MapPin,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const categories = ['全部', '文档处理', '教师工具', '学生工具', '隐私安全', '图片处理', '实用工具'];

const tools = [
  { name: 'UNMARK', title: 'NotebookLM 去水印', description: '批量清理 PDF / PPTX 水印，导出后还可添加自己的 Logo 或文字标识。', href: 'https://unmark.tinylabpro.com/', category: '文档处理', status: 'NEW', icon: Eraser, tone: 'blue', tags: ['文档处理', '手机可用'] },
  { name: 'TEACH', title: '教师工具箱', description: '备课、课堂与日常教学轻量工具合集，减少重复操作。', href: 'https://teach.tinylabpro.com/', category: '教师工具', status: '已上线', icon: BookOpenCheck, tone: 'green', tags: ['教师工具', '打开即用'] },
  { name: 'STUDY', title: '学生工具箱', description: '面向自主学习、练习与备考的轻量工具集合，让学习任务更好开始。', href: 'https://study.tinylabpro.com/', category: '学生工具', status: '已上线', icon: GraduationCap, tone: 'violet', tags: ['学生工具', '自主学习'] },
  { name: 'KEYSCAN', title: '本地安全工具箱', description: '密码、OTP、加密备份与本地安全工具，重要数据尽量留在自己手里。', href: 'https://tinyproductlab.github.io/keyscan/', category: '隐私安全', status: '开源', icon: KeyRound, tone: 'amber', tags: ['隐私安全', '本地优先', '开源'] },
  { name: 'SECURE SURVEY', title: '加密调查问卷', description: '提交前完成加密的隐私问卷工具，为敏感信息多留一层保护。', href: 'https://survey.tinylabpro.com/', category: '隐私安全', status: '已上线', icon: ShieldCheck, tone: 'violet', tags: ['隐私安全', '无需安装'] },
  { name: 'IMAGE', title: '图片工具箱', description: '压缩、转换、证件照等常用图片处理功能，直接在浏览器中使用。', href: 'https://image.tinylabpro.com/', category: '图片处理', status: '已上线', icon: ImageIcon, tone: 'rose', tags: ['图片处理', '浏览器本地处理'] },
  { name: 'ADDRESS GEN', title: '全球地址生成器', description: '生成日本、美国等地区的测试地址与示例资料，适合开发、演示和表单测试。', href: 'https://addressgen.tinylabpro.com/', category: '实用工具', status: '已上线', icon: MapPin, tone: 'green', tags: ['测试数据', '本地生成'] },
];

type WeatherData = { temperature: number; condition: string };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [weatherPlace, setWeatherPlace] = useState('上海');
  const [feedbackCopied, setFeedbackCopied] = useState(false);
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

  const copyFeedbackEmail = async () => {
    try {
      await navigator.clipboard.writeText('userfeedback@zohomail.com');
      setFeedbackCopied(true);
      window.setTimeout(() => setFeedbackCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:userfeedback@zohomail.com';
    }
  };

  return <main className="min-h-screen bg-[radial-gradient(900px_360px_at_92%_-150px,rgba(41,84,232,.12),transparent_72%),#f7f8fc] text-slate-950">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8fc]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="小产品实验室首页">
          <img src="/tiny-product-lab-avatar.png" alt="小产品实验室头像" className="size-10 rounded-xl object-cover ring-1 ring-slate-200" />
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
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-9 rounded-xl border-slate-300 bg-white px-3 text-slate-800')}><Code2 data-icon="inline-start" /><span className="hidden sm:inline">GitHub</span></a>
          <Dialog>
            <DialogTrigger render={<Button className="h-9 rounded-xl bg-[#f3b53f] px-3 text-amber-950 hover:bg-[#e8a92f]" />}><HeartHandshake className="size-4" /><span className="hidden md:inline">请开发者喝咖啡</span><span className="md:hidden">支持</span></DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-md"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><HeartHandshake className="size-6" /></div><DialogTitle className="text-xl font-bold">请开发者喝杯咖啡</DialogTitle><DialogDescription className="pt-2 leading-7">感谢你愿意支持小产品实验室。打赏方式会在网站稳定运行后开放。</DialogDescription></DialogHeader></DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>

    <section id="top" className="border-b border-slate-200/80 bg-transparent px-5 pb-8 pt-13 sm:px-8 sm:pb-9 sm:pt-17">
      <div className="mx-auto max-w-7xl">
        <Badge variant="outline" className="h-7 border-blue-200 bg-blue-50 px-3 text-[#2954e8]">小工具集合 · 持续更新</Badge>
        <h1 className="mt-5 text-3xl font-black tracking-[-.045em] text-slate-950 sm:text-5xl">小工具，也能做的很好用。</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">做一些简单、实用、打开就能用的小产品。</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="#tools" className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-xl bg-[#2954e8] px-5 shadow-[0_10px_24px_rgba(41,84,232,.18)] hover:bg-[#2145c7]')}>浏览全部工具 <ArrowDown data-icon="inline-end" /></a><a href="https://unmark.tinylabpro.com/" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-xl border-slate-300 bg-white px-5 text-slate-800')}>最新：NotebookLM 去水印 <ArrowUpRight data-icon="inline-end" /></a></div>
      </div>
    </section>

    <section id="tools" className="px-5 pb-14 pt-8 sm:px-8 sm:pb-18 sm:pt-10"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">工具集合</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">打开就能用的工具</h2></div><span className="text-sm text-slate-500">当前收录 {tools.length} 个小产品</span></div>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="工具分类">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', activeCategory === category ? 'bg-[#2954e8] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100')}>{category}</button>)}</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleTools.map((tool) => { const Icon = tool.icon; const body = <Card className={cn('h-full min-h-66 gap-0 rounded-2xl border-0 bg-white py-0 ring-1 ring-slate-200', tool.href && 'transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(27,42,75,.10)]')}><CardHeader className="gap-0 p-6"><div className="mb-8 flex items-start justify-between"><span className={cn('grid size-12 place-items-center rounded-2xl', `tool-icon-${tool.tone}`)}><Icon className="size-6" /></span><Badge variant={tool.status === 'NEW' ? 'default' : 'secondary'} className={tool.status === 'NEW' ? 'bg-[#2954e8]' : 'bg-slate-100 text-slate-600'}>{tool.status}</Badge></div><p className="font-mono text-[11px] tracking-[.13em] text-slate-400">{tool.name}</p><h3 className="mt-2 text-xl font-bold">{tool.title}</h3></CardHeader><CardContent className="flex flex-1 flex-col justify-between gap-6 p-6 pt-0"><p className="leading-6 text-slate-600">{tool.description}</p><div className="flex items-end justify-between gap-3"><div className="flex flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{tag}</span>)}</div>{tool.href && <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2954e8]">{tool.status === '开源' ? '查看项目' : '打开工具'}<ArrowUpRight className="size-4" /></span>}</div></CardContent></Card>; return tool.href ? <a key={tool.name} href={tool.href} target="_blank" rel="noreferrer" className="block">{body}</a> : <div key={tool.name}>{body}</div>; })}</div>
    </div></section>

    <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-lg font-bold">小产品实验室</p><p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">从一个真实的小需求出发，把它做成每个人都能直接使用的小产品。<span className="ml-2 font-medium text-slate-700">TinyLabPro.com</span></p><a href="https://github.com/tinyproductlab" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2954e8]">在 GitHub 查看开源项目 <ArrowUpRight className="size-4" /></a></div><div className="flex items-center gap-3 rounded-2xl bg-[#eef2ff] p-3"><img src="/tiny-product-lab-avatar.png" alt="小产品实验室公众号头像" className="size-13 rounded-xl object-cover" /><div><p className="text-sm font-bold">公众号：小产品实验室</p><p className="mt-1 text-xs text-slate-500">扫码关注产品更新</p><div className="mt-2 flex items-center gap-1"><a href="mailto:userfeedback@zohomail.com" className="inline-flex items-center gap-1 text-xs font-semibold text-[#2954e8] hover:underline"><Mail className="size-3.5" />userfeedback@zohomail.com</a><button type="button" onClick={copyFeedbackEmail} className="inline-grid size-6 place-items-center rounded-md text-[#2954e8] hover:bg-white" aria-label="复制反馈邮箱" title="复制邮箱">{feedbackCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}</button><span aria-live="polite" className="text-[11px] text-emerald-700">{feedbackCopied ? '已复制' : ''}</span></div></div><img src="/wechat-official-account.jpg" alt="小产品实验室微信公众号二维码" className="size-16 rounded-lg bg-white p-1" /></div></div></footer>
  </main>;
}
