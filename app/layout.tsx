import type { Metadata } from 'next';
import Script from 'next/script';
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
  title: { default: '小产品实验室 TinyProductLab｜免费实用的在线工具集合', template: '%s｜小产品实验室 TinyProductLab' },
  description: '小产品实验室 TinyProductLab 提供图片处理、教师与学生工具、隐私安全、OTP、调查问卷和开发测试等免费在线工具，无需注册，打开即可使用。',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { title: '小产品实验室 TinyProductLab｜免费实用的在线工具集合', description: '小产品实验室提供图片处理、学习、教学、隐私安全和开发测试等免费在线工具，无需注册，打开即可使用。', url: '/', siteName: '小产品实验室 TinyProductLab', type: 'website', images: ['/tiny-product-lab-avatar.png'] },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};


/* 结构化数据：站点 + 组织 + 工具列表 + 常见问题。
   FAQ 与工具列表页面上本来就有，这里只是让搜索引擎能直接读懂。 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://tinylabpro.com/#website',
      url: 'https://tinylabpro.com/',
      name: 'TinyProductLab · 小产品实验室',
      inLanguage: 'zh-CN',
      publisher: { '@id': 'https://tinylabpro.com/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://tinylabpro.com/#organization',
      name: '小产品实验室',
      alternateName: 'TinyProductLab',
      url: 'https://tinylabpro.com/',
      logo: 'https://tinylabpro.com/icon-192.png',
      sameAs: ['https://github.com/tinyproductlab'],
    },
    {
      '@type': 'ItemList',
      name: '小产品实验室工具集合',
      itemListElement: [
        ['NotebookLM 去水印', 'https://unmark.tinylabpro.com/'],
        ['教师工具箱', 'https://teach.tinylabpro.com/'],
        ['学生工具箱', 'https://study.tinylabpro.com/'],
        ['本地安全工具箱', 'https://keyscan.tinylabpro.com/'],
        ['OTP 动态验证码', 'https://otp.tinylabpro.com/'],
        ['加密调查问卷', 'https://survey.tinylabpro.com/'],
        ['图片工坊', 'https://image.tinylabpro.com/'],
        ['全球地址与人物资料生成器', 'https://addressgen.tinylabpro.com/'],
      ].map(([name, url], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        url,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        ['需要注册吗？', '主站无需注册。每个工具是否需要联网或同步，以对应页面说明为准。'],
        ['文件会上传吗？', '标明"浏览器本地处理"的功能不会为处理而上传文件；其他功能会明确说明数据流向。'],
        ['可以反馈新工具吗？', '可以。请通过联系页面发送实际需求、使用场景和期望结果。'],
      ].map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {adsenseClient ? <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" /> : null}
        {children}
      </body>
    </html>
  );
}
