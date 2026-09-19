import { ArrowUpRight } from 'lucide-react';
import type { Lang } from '@/i18n/home';

const zhLinks = [
  ['博客', '/blog'],
  ['关于我们', '/about'],
  ['隐私政策', '/privacy'],
  ['使用条款', '/terms'],
  ['联系我们', '/contact'],
  ['免责声明', '/disclaimer'],
] as const;

const enLinks = [
  ['About', '/en/about'],
  ['Privacy', '/en/privacy'],
  ['Terms', '/en/terms'],
  ['Contact', '/en/contact'],
  ['Disclaimer', '/en/disclaimer'],
] as const;

export function SiteFooter({ lang = 'zh' as Lang }: { lang?: Lang }) {
  const links = lang === 'en' ? enLinks : zhLinks;
  const siteName = lang === 'en' ? 'TinyProductLab' : '小产品实验室';
  const tagline = lang === 'en'
    ? 'Starting from real small needs, making them into tools that just work.'
    : '从真实的小需求出发，把它做成打开就能使用的小产品。';
  const gitHubLabel = lang === 'en' ? 'View open-source projects on GitHub' : '在 GitHub 查看开源项目';
  const wechatLabel = lang === 'en' ? 'WeChat Official Account' : '微信公众号';

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-9 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <a href={lang === 'en' ? '/en' : '/'} className="text-lg font-bold text-slate-950">{siteName}</a>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
            {tagline}
          </p>
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2954e8]">
            {gitHubLabel} <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
              <img src="/wechat-official-account.jpg" alt={`WeChat: ${siteName}`} width={96} height={96} className="rounded-lg ring-1 ring-slate-200" loading="lazy" />
              <span className="text-xs text-slate-500">{wechatLabel}</span>
            </div>
            <nav aria-label="footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              {links.map(([label, href]) => <a key={href} href={href} className="hover:text-[#2954e8]">{label}</a>)}
            </nav>
          </div>
          <p className="text-xs text-slate-400">© 2026 TinyProductLab</p>
        </div>
      </div>
    </footer>
  );
}
