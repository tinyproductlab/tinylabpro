import Link from 'next/link';
import { ArrowDown, ArrowRight, BookOpen, CheckCircle2, FlaskConical, Wrench } from 'lucide-react';

type Language = 'zh' | 'en';

const copy = {
  zh: {
    eyebrow: '持续实验中',
    title: '把真实的小需求，做成能长期使用的小产品。',
    intro: '这里有已经上线的工具，也记录它们从想法、试用到改进的过程。能简单解决的问题，就不让它变成复杂软件。',
    tools: '浏览工具', notes: '查看实验记录',
    week: '本周实验',
    updates: [['图片工坊', '持续打磨单个图片处理流程', '开发中'], ['OTP 同步', '本地可用，也可选择带走数据', '已上线'], ['加密问卷', '导入模板与 PWA 安装体验', '已上线']],
    latest: '最新实验记录', latestIntro: '从想法到实现，记录每一个小产品的诞生过程。', allNotes: '查看全部记录',
    entries: [
      ['产品实践', '11 元域名，搭起自己的账号系统', '用免费服务器、企业邮箱与一个域名，给工具准备可选的同步能力。', '2026.09'],
      ['隐私安全', 'OTP：本地可用，也能带着数据走', '核心功能不登录也能使用；需要同步时，用户再自主选择账号或 WebDAV。', '2026.09'],
      ['工具开发', 'NotebookLM 去水印的修复过程', '从固定角标识别，到按背景修复，再到本地离线运行的取舍。', '2026.09'],
    ],
    progress: '正在进行', progressIntro: '一些正在动手做的实验，可能还不完美，但一直在推进。',
    quote: '好的产品，来自持续的实验。',
  },
  en: {
    eyebrow: 'EXPERIMENTING',
    title: 'Turning real small needs into products worth keeping.',
    intro: 'This is where shipped tools and the process behind them live — from an idea, to testing, to improvement.',
    tools: 'Browse tools', notes: 'Read lab notes',
    week: 'This week in the lab',
    updates: [['Image Toolbox', 'Refining focused image workflows', 'In progress'], ['OTP sync', 'Local-first, with optional portability', 'Live'], ['Encrypted Survey', 'Templates and installable PWA', 'Live']],
    latest: 'Latest lab notes', latestIntro: 'A short record of how each small product comes to life.', allNotes: 'All notes',
    entries: [
      ['PRODUCT PRACTICE', 'A personal account system, built on a tiny budget', 'A free server, business email and a domain set up optional sync for future tools.', '2026.09'],
      ['PRIVACY & SECURITY', 'OTP: useful locally, portable when you choose', 'The core works without login; sync remains an explicit, optional choice.', '2026.09'],
      ['TOOL BUILDING', 'Repairing the fixed NotebookLM export badge', 'From detection, to background-aware repair, to a local offline build.', '2026.09'],
    ],
    progress: 'In progress', progressIntro: 'Experiments currently being built. They may be unfinished, but they keep moving.',
    quote: 'Good products come from continued experiments.',
  },
} as const;

export function LabStory({ lang }: { lang: Language }) {
  const t = copy[lang];
  return <>
    <section id="top" className="border-b border-slate-200/80 px-5 pb-12 pt-13 sm:px-8 sm:pb-16 sm:pt-17">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2954e8]"><FlaskConical className="size-3.5" />{t.eyebrow}</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-.055em] text-slate-950 sm:text-6xl sm:leading-[1.08]">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{t.intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#tools" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2954e8] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(41,84,232,.18)] transition hover:bg-[#2145c7]">{t.tools}<ArrowDown className="size-4" /></a>
            <Link href="/notes" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-white px-5 text-sm font-semibold text-[#2954e8] transition hover:bg-blue-50">{t.notes}<ArrowRight className="size-4" /></Link>
          </div>
        </div>
        <aside className="overflow-hidden rounded-3xl border border-blue-100 bg-[linear-gradient(145deg,#f9fbff_0%,#eef3ff_100%)] p-5 shadow-[0_18px_50px_rgba(44,75,150,.10)] sm:p-7" aria-label={t.week}>
          <div className="flex items-center justify-between"><div><p className="font-mono text-[11px] font-bold tracking-[.16em] text-[#2954e8]">TINY PRODUCT LAB</p><h2 className="mt-1 text-xl font-bold tracking-tight">{t.week}</h2></div><span className="grid size-12 place-items-center rounded-2xl bg-white text-[#2954e8] shadow-sm"><FlaskConical className="size-6" /></span></div>
          <div className="mt-6 grid gap-3">{t.updates.map(([name, description, state], index) => <div key={name} className="rounded-2xl border border-white bg-white/85 p-4"><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2954e8]">{index === 0 ? <Wrench className="size-4" /> : <CheckCircle2 className="size-4" />}</span><div className="min-w-0"><p className="font-semibold text-slate-900">{name}</p><p className="mt-0.5 truncate text-xs text-slate-500">{description}</p></div></div><span className={state === t.updates[0][2] ? 'shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700' : 'shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700'}>{state}</span></div></div>)}</div>
        </aside>
      </div>
    </section>

    <section id="notes" className="bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">LAB NOTES</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.latest}</h2><p className="mt-3 text-slate-600">{t.latestIntro}</p></div><Link href="/notes" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2954e8]">{t.allNotes}<ArrowRight className="size-4" /></Link></div>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">{t.entries.map(([tag, title, summary, date], index) => <Link key={title} href={`/notes#note-${index + 1}`} className="group rounded-2xl border border-slate-200 bg-[#fbfcff] p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_16px_40px_rgba(27,42,75,.09)]"><div className="flex items-center justify-between"><span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[10px] font-semibold tracking-[.12em] text-[#2954e8]">{tag}</span><span className="text-xs text-slate-400">{date}</span></div><h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 group-hover:text-[#2954e8]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{summary}</p><span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#2954e8]">{lang === 'zh' ? '阅读记录' : 'Read note'}<ArrowRight className="size-4" /></span></Link>)}</div>
      </div>
    </section>

    <section className="border-y border-slate-200 bg-[#f7f8fc] px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">BUILD LOG</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.progress}</h2><p className="mt-3 text-slate-600">{t.progressIntro}</p><div className="mt-7 border-l-2 border-blue-200 pl-5">{t.updates.map(([name, description, state]) => <div key={name} className="relative pb-6 last:pb-0"><span className="absolute -left-[1.8rem] top-1.5 size-3 rounded-full border-2 border-white bg-[#2954e8]" /><div className="flex flex-wrap items-center gap-3"><span className="text-sm font-bold">{name}</span><span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">{state}</span></div><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>)}</div></div><div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"><BookOpen className="size-8 text-[#2954e8]" /><p className="mt-5 text-2xl font-bold leading-9 tracking-tight text-slate-950">{t.quote}</p><p className="mt-4 text-sm leading-7 text-slate-600">{lang === 'zh' ? '记录不是为了包装进度，而是为了把做过的判断、限制和下一步说清楚。' : 'Notes are not for dressing up progress — they make decisions, limits and next steps clear.'}</p></div></div></section>
  </>;
}
