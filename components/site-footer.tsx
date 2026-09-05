import { ArrowUpRight } from 'lucide-react';

const links = [
  ['关于我们', '/about'],
  ['隐私政策', '/privacy'],
  ['使用条款', '/terms'],
  ['联系我们', '/contact'],
  ['免责声明', '/disclaimer'],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-9 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <a href="/" className="text-lg font-bold text-slate-950">小产品实验室</a>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
            从真实的小需求出发，把它做成打开就能使用的小产品。
            <span className="ml-2 font-medium text-slate-700">TinyProductLab · tinylabpro.com</span>
          </p>
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2954e8]">
            在 GitHub 查看开源项目 <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <nav aria-label="页脚导航" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            {links.map(([label, href]) => <a key={href} href={href} className="hover:text-[#2954e8]">{label}</a>)}
          </nav>
          <p className="text-xs text-slate-400">© 2026 TinyProductLab</p>
        </div>
      </div>
    </footer>
  );
}
