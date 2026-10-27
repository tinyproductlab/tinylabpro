import { LayoutGrid, Monitor, Puzzle, Globe, Gamepad2, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export const productCategories = [
  { id: 'all', zh: '全部', en: 'All', icon: LayoutGrid },
  { id: 'software', zh: '软件', en: 'Software', icon: Monitor },
  { id: 'plugins', zh: '插件', en: 'Plugins', icon: Puzzle },
  { id: 'online', zh: '在线工具', en: 'Online tools', icon: Globe },
  { id: 'games', zh: '游戏', en: 'Games', icon: Gamepad2 },
  { id: 'mini', zh: '小程序', en: 'Mini programs', icon: Smartphone },
] as const;

export function productType(name: string) {
  if (['KEYSCAN', 'NCONVO', 'MOONSPROUT', '2WX'].includes(name)) return 'software';
  if (['QIGUGU', 'NUMGUGU', 'CATBOX'].includes(name)) return 'games';
  if (name === 'INSTANTQR') return 'plugins';
  if (name === 'TINY OTP') return 'mini';
  return 'online';
}

export function ProductCategories({ lang, active, onChange, tools }: {
  lang: 'zh' | 'en'; active: string; onChange: (id: string) => void; tools: { name: string }[];
}) {
  return <fieldset className={cn('product-categories mt-6 grid min-w-0 gap-2 sm:grid-cols-6', lang === 'en' ? 'grid-cols-2' : 'grid-cols-3')} aria-label={lang === 'zh' ? '产品分类' : 'Product categories'}>
    {productCategories.map(({ id, icon: Icon, ...labels }) => {
      const count = id === 'all' ? tools.length : tools.filter(tool => productType(tool.name) === id).length;
      return <button key={id} type="button" aria-pressed={active === id} aria-controls="product-results" onClick={() => onChange(id)} className={cn('flex min-h-14 items-center justify-start gap-1.5 rounded-xl border px-2.5 py-3 text-xs sm:gap-2 sm:text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-4', active === id ? 'border-blue-200 bg-blue-50 text-[#2954e8]' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50')}>
        <Icon className="size-4" aria-hidden="true" /><span className="flex flex-1 items-center justify-between gap-2"><span className="whitespace-nowrap">{labels[lang]}</span><span className={cn('text-xs tabular-nums', active === id ? 'text-[#2954e8]' : 'text-slate-500')}>{count}</span></span>
      </button>;
    })}
  </fieldset>;
}

export function EmptyCategory({ lang }: { lang: 'zh' | 'en' }) {
  return <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center"><Puzzle className="mx-auto size-7 text-slate-400" aria-hidden="true" /><h3 className="mt-4 text-lg font-semibold">{lang === 'zh' ? '这个分类，留给接下来的小产品' : 'Room for what comes next'}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{lang === 'zh' ? '暂未收录产品，可以先看看其他分类。' : 'No products listed yet. Explore another category for now.'}</p></div>;
}
