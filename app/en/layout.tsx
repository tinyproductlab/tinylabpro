import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = { title: 'TinyProductLab | Simple, practical tools', description: 'Discover small, focused products for everyday tasks, learning, privacy and productivity.', alternates: { canonical: '/en', languages: { 'zh-CN': '/', en: '/en' } }, openGraph: { url: '/en', title: 'TinyProductLab | Simple, practical tools', description: 'Small, focused products for everyday tasks.' } };
export default function EnglishLayout({children}: {children: ReactNode}) { return children; }
