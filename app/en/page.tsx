'use client';

import { useState } from 'react';
import { ProductCategories, EmptyCategory, productType, productCategories } from '@/components/product-categories';
import { ArrowUpRight, Code2, HeartHandshake, ShieldCheck, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { LabStory } from '@/components/lab-story';


const tools = [
{"name": "INSTANTQR", "title": "InstantQR", "href": "https://qr.tinylabpro.com/", "description": "Turn selected text and page links into QR codes with a right click. Decode images, share WiFi, generate in batches and create short links.", "category": "Plugins", "status": "Live", "logo": "/instantqr-logo.png", "tone": "blue", "tags": ["Browser extension", "QR codes"]},
{"name": "2WX", "title": "Mac Dual Account Helper", "href": "https://2.tinylabpro.com/", "description": "Prepare and maintain a second WeChat app copy on your Mac, with separate account windows and original app update detection.", "category": "Software", "status": "Live", "logo": "/2wx-logo.svg", "tone": "green", "tags": ["macOS", "Dual accounts"]},
{"name": "QIGUGU", "href": "https://qi.gugujoy.com/", "logo": "/qigugu-logo.png", "tone": "amber", "title": "QiGugu", "description": "Classic board games with offline AI opponents. Visit the official site for rules and the WeChat mini-game entry.", "category": "Games", "status": "Live", "tags": ["Board games", "WeChat mini-game"]},
{"name": "NUMGUGU", "href": "https://num.gugujoy.com/", "logo": "/numgugu-logo.png", "tone": "blue", "title": "NumGugu", "description": "18 number puzzles, including Sudoku and 2048. Play in your browser or add to your home screen.", "category": "Games", "status": "Live", "tags": ["Puzzles", "Browser game"]},
{"name": "CATBOX", "href": "https://catbox.gugujoy.com/", "logo": "/catbox-logo.webp", "tone": "rose", "title": "Catbox — Cat & Box Puzzle", "description": "A cozy cat-and-box logic puzzle with 600 levels to explore in your browser.", "category": "Games", "status": "Live", "tags": ["Puzzles", "Browser game"]},
{"name": "NCONVO", "href": "https://nconvo.tinylabpro.com/", "logo": "/nconvo-logo.png", "tone": "blue", "title": "NConvo", "description": "SSH terminal, RDP remote desktop, LAN transfers and network diagnostics in a mobile toolkit.", "tags": ["SSH / RDP", "Network tools", "Mobile"], "category": "Software", "status": "Live"},
{"name": "MOONSPROUT", "href": "https://moonsprout.tinylabpro.com/", "logo": "/moonsprout-logo.png", "tone": "violet", "title": "MoonSprout Story Island", "description": "Original picture books, narrated stories and parent recordings for shared bedtime reading.", "tags": ["Picture books", "Audio stories", "iOS"], "category": "Software", "status": "Live"},
  { name: 'UNMARK', title: 'NotebookLM Watermark Remover', description: 'Batch-remove watermarks from PDF / PPTX exports, then add your own logo or text label.', href: 'https://unmark.tinylabpro.com/', category: 'Documents', status: 'NEW', logo: '/unmark-logo-128.webp', tone: 'blue', tags: ['Documents', 'Mobile-friendly'] },
  { name: 'TEACH', title: 'Teacher Toolkit', description: 'Lightweight tools for lesson prep, classroom and daily teaching — less repetitive work.', href: 'https://teach.tinylabpro.com/', category: 'Teachers', status: 'Live', logo: '/teach-logo-128.webp', tone: 'green', tags: ['Teachers', 'No sign-up'] },
  { name: 'STUDY', title: 'Student Toolkit', description: 'Tools for self-study, practice and exam prep — make learning tasks easier to start.', href: 'https://study.tinylabpro.com/', category: 'Students', status: 'Live', logo: '/study-logo-128.webp', tone: 'violet', tags: ['Students', 'Self-study'] },
  { name: 'KEYSCAN', title: 'Password & OTP Security Box', description: 'Passwords, OTP, encrypted backups and local security tools — keep important data in your hands.', href: 'https://keyscan.tinylabpro.com/', category: 'Privacy & Security', status: 'Open Source', logo: '/keyscan-logo-128.webp', tone: 'amber', tags: ['Privacy', 'Local-first'] },
  { name: 'TINY OTP', title: 'OTP Authenticator', description: 'Manage 2FA codes without login, with encrypted backup and WebDAV sync.', href: 'https://otp.tinylabpro.com/', category: 'Privacy & Security', status: 'Live', logo: '/otp-logo-128.webp', tone: 'blue', tags: ['No login', 'WebDAV'] },
  { name: 'SECURE SURVEY', title: 'Encrypted Survey', description: 'Privacy-first survey tool with end-to-end encryption — extra protection for sensitive data.', href: 'https://survey.tinylabpro.com/', category: 'Privacy & Security', status: 'Live', logo: '/survey-logo-128.webp', tone: 'violet', tags: ['E2E encrypted', 'No install'] },
  { name: 'IMAGE', title: 'Online Image Toolbox', description: 'ID photos, compression, resize, background removal and more — photos stay in your browser by default.', href: 'https://image.tinylabpro.com/', category: 'Image', status: 'Live', logo: '/image-toolbox-logo-128.webp', tone: 'rose', tags: ['Image', 'In-browser'] },
  { name: 'ADDRESS GEN', title: 'Global Address & Test Data Generator', description: 'Generate addresses and personas for 249 countries/regions in local format, in-browser, bulk export.', href: 'https://addressgen.tinylabpro.com/', category: 'Utilities', status: 'Live', logo: '/address-generator-logo-128.webp', tone: 'green', tags: ['249 countries', 'Offline'] },
];


export default function HomeEn() {
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleTools = activeCategory === 'all' ? tools : tools.filter((tool) => productType(tool.name) === activeCategory);

  return <main className="lab-home min-h-screen bg-[radial-gradient(900px_360px_at_92%_-150px,rgba(41,84,232,.12),transparent_72%),#f7f8fc] text-slate-950">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8fc]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/en#top" className="flex items-center gap-3" aria-label="TinyProductLab home">
          <img src="/avatar-128.webp" alt="TinyProductLab avatar" width={128} height={128} className="size-10 rounded-xl object-cover ring-1 ring-slate-200" />
          <span><span className="block text-[15px] font-bold tracking-tight">TinyProductLab</span><span className="block font-mono text-[10px] tracking-[.12em] text-slate-500">TINY PRODUCT LAB</span></span>
        </a>
        <nav className="flex items-center gap-1.5" aria-label="Main navigation">

          <a href="/en#tools" className="hidden px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">All Tools</a>
          <a href="/messages" className="px-2 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 sm:px-3">Messages</a>
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" className="hidden h-9 px-2.5 text-sm text-slate-600 xl:inline-flex" />}>Privacy</DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-lg"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ShieldCheck className="size-6" /></div><DialogTitle className="text-xl font-bold">Privacy Notice</DialogTitle><DialogDescription className="pt-2 leading-7">TinyProductLab handles data minimally. The site never reads your location automatically; only after you click weather and confirm, the browser requests location permission.</DialogDescription></DialogHeader><div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600"><p className="font-semibold text-slate-900">Location & Weather</p><p>Coordinates are only used to query Apple WeatherKit for local weather. No location history is stored. Denying location does not affect other tools.</p></div></DialogContent>
          </Dialog>
          <a href="https://github.com/tinyproductlab" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'hidden h-9 rounded-xl border-slate-300 bg-white px-3 text-slate-800 sm:inline-flex')}><Code2 data-icon="inline-start" /><span>GitHub</span></a>
          <a href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-9 rounded-xl px-2.5 text-sm font-semibold text-slate-600 hover:text-slate-950')}><Globe className="size-4" /><span>中文</span></a>
          <Dialog>
            <DialogTrigger render={<Button aria-label="Support" className="h-9 rounded-xl bg-[#f3b53f] px-2.5 text-amber-950 hover:bg-[#e8a92f] sm:px-3" />}><HeartHandshake className="size-4" /><span className="hidden md:inline">Buy us a coffee</span><span className="hidden sm:inline md:hidden">Support</span></DialogTrigger>
            <DialogContent className="rounded-2xl p-6 sm:max-w-md"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><HeartHandshake className="size-6" /></div><DialogTitle className="text-xl font-bold">Buy us a coffee</DialogTitle><DialogDescription className="pt-2 leading-7">Thank you for supporting TinyProductLab. Donation options will open once the site is stable.</DialogDescription></DialogHeader></DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>


    <LabStory lang="en" />

    <section id="tools" className="scroll-mt-24 px-5 pb-14 pt-7 sm:px-8 sm:pb-18 sm:pt-8"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">Toolkit</p><h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Tools that just work</h2></div><span className="text-sm text-slate-500">{tools.length} products available</span></div>
      <ProductCategories lang="en" active={activeCategory} onChange={setActiveCategory} tools={tools} />
      <p role="status" className="mt-5 text-sm text-slate-500">{productCategories.find(category => category.id === activeCategory)?.en} · {visibleTools.length} products</p>
      <div id="product-results" className="mt-4 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleTools.length === 0 && <EmptyCategory lang="en" />}{visibleTools.map((tool) => { const body = <Card className={cn('product-card h-full min-h-66 min-w-0 gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 ring-1 ring-slate-200', tool.href && 'transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,42,75,.07)] group-focus-visible:ring-blue-600 motion-reduce:transform-none motion-reduce:transition-none')}><CardHeader className="gap-0 p-5 sm:p-6"><div className="mb-5 flex items-start justify-between"><span className={cn('grid size-12 place-items-center overflow-hidden rounded-2xl', `tool-icon-${tool.tone}`)}><img src={tool.logo} alt={`${tool.title} Logo`} width={128} height={128} className="size-9 rounded-lg object-cover" loading="lazy" /></span><Badge variant={tool.status === 'NEW' ? 'default' : 'secondary'} className={tool.status === 'NEW' ? 'bg-[#2954e8]' : 'bg-slate-100 text-slate-600'}>{tool.status}</Badge></div><p className="mb-2 text-xs font-medium text-[#2954e8]">{productCategories.find(category => category.id === productType(tool.name))?.en}</p><p className="font-mono text-[11px] tracking-[.13em] text-slate-400">{tool.name}</p><h3 className="mt-2 text-xl font-bold leading-snug tracking-tight">{tool.title}</h3></CardHeader><CardContent className="flex flex-1 flex-col justify-between gap-6 p-5 pt-0 sm:p-6 sm:pt-0"><p className="leading-6 text-slate-600">{tool.description}</p><div className="flex flex-wrap items-end justify-between gap-3"><div className="flex min-w-0 flex-wrap gap-2">{tool.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">{tag}</span>)}</div>{tool.href && <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2954e8]">{tool.status === 'Open Source' ? 'View project' : 'Open tool'}<ArrowUpRight className="size-4" /></span>}</div></CardContent></Card>; return tool.href ? <a key={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" className="group block min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">{body}</a> : <div key={tool.name} className="min-w-0">{body}</div>; })}</div>
    </div></section>

    <section aria-labelledby="about-heading" className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div><p className="font-mono text-xs font-semibold tracking-[.18em] text-[#2954e8]">About TinyProductLab</p><h2 id="about-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Small needs, no big software</h2><p className="mt-4 max-w-2xl leading-8 text-slate-600">TinyProductLab is a continuously updated collection of lightweight online tools covering image processing, study efficiency, teaching aids, privacy security, daily office and dev testing. We start from real needs and keep tools simple, focused and ready to use.</p></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#f7f8fc] p-5"><h3 className="font-bold">Simple & Direct</h3><p className="mt-2 text-sm leading-6 text-slate-600">Less registration, installation and setup — keep your attention on what you are doing.</p></div><div className="rounded-2xl bg-[#f7f8fc] p-5"><h3 className="font-bold">Privacy First</h3><p className="mt-2 text-sm leading-6 text-slate-600">Whatever can be done in the browser stays local. Online features honestly explain their data flow.</p></div><div className="rounded-2xl bg-[#f7f8fc] p-5 sm:col-span-2"><h3 className="font-bold">Continuously Updated</h3><p className="mt-2 text-sm leading-6 text-slate-600">We fix issues, add explanations and improve UX based on real feedback — no fake metrics.</p></div></div>
      </div>
    </section>

    <section aria-labelledby="faq-heading" className="bg-[#f7f8fc] px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto max-w-7xl"><h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">FAQ</h2><div className="mt-7 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">Do I need to register?</h3><p className="mt-3 text-sm leading-7 text-slate-600">No registration needed for the main site. Each tool states whether it requires network or sync.</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">Are files uploaded?</h3><p className="mt-3 text-sm leading-7 text-slate-600">Features marked "browser-local processing" do not upload files for processing; other features clearly explain their data flow.</p></div><div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-bold">Can I suggest new tools?</h3><p className="mt-3 text-sm leading-7 text-slate-600">Yes. Send your needs, use cases and expected outcomes via the contact page.</p></div></div></div></section>

    <aside className="ad-slot-left" aria-hidden="true" />
    <aside className="ad-slot-right" aria-hidden="true" />
    <SiteFooter lang="en" />
  </main>;
}
