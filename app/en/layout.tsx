import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TinyProductLab | Simple, Practical Online Tools',
  description: 'TinyProductLab is a continuously updated collection of lightweight online tools: image processing, study efficiency, teaching aids, privacy security, daily office and dev testing. Open and use, no sign-up required.',
  alternates: {
    canonical: '/en',
    languages: { 'zh-CN': '/', en: '/en' },
  },
  openGraph: {
    title: 'TinyProductLab | Simple, Practical Online Tools',
    description: 'Simple, practical online tools you can open and use right away. No sign-up required.',
    url: '/en',
    siteName: 'TinyProductLab',
    type: 'website',
  },
};
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
