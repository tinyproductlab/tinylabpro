import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() { return <main className="grid min-h-screen place-items-center bg-[#f7f8fc] px-5 text-center text-slate-950"><div><p className="font-mono text-sm font-bold tracking-[.2em] text-[#2954e8]">404</p><h1 className="mt-4 text-3xl font-black">没有找到这个页面</h1><p className="mt-3 text-slate-600">地址可能已变化，或者页面暂时不存在。</p><a href="/" className={cn(buttonVariants({ size: 'lg' }), 'mt-7 rounded-xl bg-[#2954e8]')}>返回首页</a></div></main>; }
