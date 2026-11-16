import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { ShareGames } from '@/components/share-games';

export const metadata: Metadata = {
  title: 'Mac 多开助手',
  description: 'Mac 微信双开助手介绍与官网入口，附小产品实验室小游戏。',
  alternates: { canonical: '/multi-assistant' },
};

export default function MultiAssistantPage() {
  return <InfoPage title="Mac 多开助手" intro="在 Mac 上管理第二个微信副本，使用说明和最新版本请以产品官网为准。" backHref="/share" backLabel="返回好物分享">
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2>查看产品说明</h2>
      <p>官网介绍 Mac 微信双开、独立图标与菜单栏管理等功能，也会说明当前支持范围和领取方式。</p>
      <a href="https://2.tinylabpro.com/" target="_blank" rel="noopener noreferrer" className="!text-white !no-underline mt-4 inline-flex rounded-xl bg-[#2954e8] px-5 py-3 font-semibold hover:bg-blue-700">前往 Mac 多开助手官网 ↗</a>
    </section>
    <ShareGames />
  </InfoPage>;
}
