import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: '实验记录',
  description: '小产品实验室的产品日志：记录小工具从真实需求、试用到持续改进的过程。',
  alternates: { canonical: '/notes' },
};

const notes = [
  {
    title: '11 元域名，搭起自己的账号系统',
    tag: '产品实践', date: '2026.09',
    body: '小产品实验室的大部分工具都可以直接使用，但“能把数据带走”是另一个问题。这个账号系统没有把登录变成门槛：本地功能仍然优先，只有在用户需要同步时才使用邮箱注册。它运行在自己的服务器上，邮件来自自己的企业邮箱，后续会逐步接入需要备份的工具和游戏。',
  },
  {
    title: 'OTP：本地可用，也能带着数据走',
    tag: '隐私安全', date: '2026.09',
    body: 'OTP 的核心是本地优先：不登录也能添加和使用验证码。需要换设备时，可以选择 WebDAV 备份，或使用账号同步。账号同步只保留加密后的备份，并限制容量和版本数；用户不必为了使用一个验证码工具而先交出自己的数据。',
  },
  {
    title: 'NotebookLM 去水印的修复过程',
    tag: '工具开发', date: '2026.09',
    body: '去水印不是简单盖一块白色。工具先从多页中定位同一位置反复出现的固定标识，再根据纯色、渐变或复杂背景决定修复方式。公开版方便临时处理，本地版则让文件完全留在电脑上；两条路径都保留原文件，并给出处理后的独立结果。',
  },
];

export default function NotesPage() {
  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950"><header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between"><Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#2954e8]"><ArrowLeft className="size-4" />小产品实验室</Link><span className="font-mono text-xs font-semibold tracking-[.16em] text-[#2954e8]">LAB NOTES</span></div></header><section className="px-5 pb-12 pt-14 sm:px-8 sm:pb-18 sm:pt-20"><div className="mx-auto max-w-5xl"><span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2954e8]"><FlaskConical className="size-3.5" />持续实验中</span><h1 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-6xl">实验记录</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">记录小产品从真实需求、试用到改进的过程。这里不写虚构数据，只说明正在做什么、为什么这样做，以及目前的限制。</p><div className="mt-12 grid gap-5">{notes.map((note, index) => <article id={`note-${index + 1}`} key={note.title} className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(27,42,75,.05)] sm:p-9"><div className="flex flex-wrap items-center gap-3"><span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[10px] font-semibold tracking-[.12em] text-[#2954e8]">{note.tag}</span><span className="text-xs text-slate-400">{note.date}</span></div><h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">{note.title}</h2><p className="mt-5 leading-8 text-slate-600">{note.body}</p></article>)}</div></div></section><SiteFooter lang="zh" /></main>;
}
