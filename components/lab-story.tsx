import { ArrowDown, FlaskConical } from 'lucide-react';

type Language = 'zh' | 'en';

const copy = {
  zh: {
    eyebrow: '持续实验中',
    title: '把真实的小需求，做成能长期使用的小产品。',
    intro: '把真实场景中反复出现的小需求，做成简单、可靠的软件、插件、在线工具、游戏和小程序。能简单解决的问题，就不让它变成复杂软件。',
    tools: '浏览工具',
  },
  en: {
    eyebrow: 'EXPERIMENTING',
    title: 'Turning real small needs into products worth keeping.',
    intro: 'Turning recurring small needs into simple, reliable software, plugins, online tools, games and mini programs.',
    tools: 'Browse tools',
  },
} as const;

export function LabStory({ lang }: { lang: Language }) {
  const t = copy[lang];
  return <>
    <section id="top" className="lab-hero border-b border-slate-200/80 px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10">
      <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2954e8]"><FlaskConical className="size-3.5" />{t.eyebrow}</span>
          <h1 className="mt-5 max-w-3xl text-2xl font-bold leading-[1.3] tracking-[-.035em] text-slate-950 sm:text-[40px] sm:leading-[1.25]">{lang === 'zh' ? <>把真实的小需求，<br />做成能长期使用的小产品。</> : t.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{t.intro}</p>
          <div className="mt-5">
            <a href="#tools" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2954e8] px-5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(41,84,232,.12)] transition hover:bg-[#2145c7]">{t.tools}<ArrowDown className="size-4" /></a>
          </div>
        </div>
        <figure className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 lg:flex-col lg:gap-3 lg:p-5 lg:text-center">
          <img src="/assets/brand/official-account-qr.jpg" alt={lang === 'zh' ? '小产品实验室微信公众号关注二维码' : 'Tiny Product Lab WeChat official account QR code'} width={180} height={180} className="size-24 shrink-0 object-contain lg:size-40" />
          <figcaption><p className="text-sm font-semibold text-slate-900">{lang === 'zh' ? '扫码关注小产品实验室' : 'Follow us on WeChat'}</p><p className="mt-1 text-xs leading-5 text-slate-500">{lang === 'zh' ? '产品更新与使用分享' : 'Product updates and tips'}</p></figcaption>
        </figure>
      </div>
    </section>
  </>;
}
