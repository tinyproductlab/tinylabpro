import { ArrowDown, FlaskConical } from 'lucide-react';

type Language = 'zh' | 'en';

const copy = {
  zh: {
    eyebrow: '持续实验中',
    title: '把真实的小需求，做成能长期使用的小产品。',
    intro: '把真实场景中反复出现的小需求，做成简单、可靠、打开就能用的在线工具。能简单解决的问题，就不让它变成复杂软件。',
    tools: '浏览工具',
  },
  en: {
    eyebrow: 'EXPERIMENTING',
    title: 'Turning real small needs into products worth keeping.',
    intro: 'Turning recurring small needs into simple, reliable online tools you can open and use right away.',
    tools: 'Browse tools',
  },
} as const;

export function LabStory({ lang }: { lang: Language }) {
  const t = copy[lang];
  return <>
    <section id="top" className="border-b border-slate-200/80 px-5 pb-12 pt-13 sm:px-8 sm:pb-16 sm:pt-17">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2954e8]"><FlaskConical className="size-3.5" />{t.eyebrow}</span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-[-.045em] text-slate-950 sm:text-5xl sm:leading-[1.14]">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{t.intro}</p>
          <div className="mt-7">
            <a href="#tools" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2954e8] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(41,84,232,.18)] transition hover:bg-[#2145c7]">{t.tools}<ArrowDown className="size-4" /></a>
          </div>
        </div>
      </div>
    </section>
  </>;
}
