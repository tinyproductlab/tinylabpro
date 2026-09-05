import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tinylabpro.com'),
  title: { default: 'TinyProductLab - 简单实用的在线工具集合', template: '%s - TinyProductLab' },
  description: 'TinyProductLab 是持续更新的轻量在线工具集合，涵盖图片处理、学习效率、教师辅助、隐私安全和开发测试。',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { title: 'TinyProductLab - 简单实用的在线工具集合', description: '打开即可使用的图片、学习、教学、隐私安全和开发测试工具。', url: '/', siteName: 'TinyProductLab', type: 'website', images: ['/tiny-product-lab-avatar.png'] },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
