import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { InfoPage } from '@/components/info-page';
import { shareItems } from '@/lib/share-catalog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '好物分享',
  description: '小产品实验室的好物分享：收藏实用服务、教程资源和邀请入口，包含 Google / Gemini 与 Roogoo，持续更新。',
  alternates: { canonical: '/share' },
};

export default function SharePage() {
  return <InfoPage title="好物分享" intro="把值得收藏的服务、教程和邀请入口放在一起，持续更新。">
    <section aria-label="分享列表">
      <div className={styles.heading}><span>精选分享</span><span>{shareItems.length} 个分享</span></div>
      <div className={styles.grid}>
        {shareItems.map(item => <a key={item.slug} href={item.href} className={styles.card}>
          <div className={styles.cardTop}>
            <span className={`${styles.mark} ${styles[item.tone]}`} aria-hidden="true">{item.mark}</span>
            <span className={styles.category}>{item.category}</span>
          </div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <span className={styles.open}>查看分享 <ArrowUpRight size={16} aria-hidden="true" /></span>
        </a>)}
      </div>
    </section>
    <p className={styles.note}>部分分享包含邀请链接。具体优惠、资格要求及服务规则，请以对应平台的实时说明为准。</p>
  </InfoPage>;
}
