import { Wrench } from 'lucide-react';

export function DevelopmentNotice({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const english = lang === 'en';
  return (
    <aside aria-label={english ? 'Development notice' : '网站开发提示'} className="mx-auto max-w-7xl px-5 pt-5 sm:px-8 sm:pt-6">
      <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/70 px-4 py-2 text-amber-950 sm:items-center sm:px-5">
        <Wrench aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-700 sm:mt-0" />
        <p className="text-xs leading-5 sm:text-sm">
          <strong className="mr-2 font-semibold">{english ? 'Work in progress' : '部分功能正在开发中'}</strong>
          <span className="text-amber-900">{english ? 'The site is being improved step by step. Some features are still in development or testing. Thank you for your patience and feedback.' : '网站正在逐步完善，部分功能仍在开发或测试中，感谢你的耐心与反馈。'}</span>
        </p>
      </div>
    </aside>
  );
}
