import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MessageBoard } from '@/components/message-board';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: '匿名留言板',
  description: '想要什么软件？在小产品实验室匿名留言板提出软件需求、分享使用感受，或通过公众号私信与文章评论反馈，查看版主回复。',
  alternates: { canonical: '/messages' },
};

export default function MessagesPage() {
  return <main className="message-board-page min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6"><div className="mx-auto max-w-5xl"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#2954e8]"><ArrowLeft className="size-4" />返回小产品实验室</Link></div></header>
    <MessageBoard />
    <SiteFooter />
  </main>;
}
