import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { InviteActions } from './invite-actions';
import { inviteCode } from './invitation';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Roogoo 邀请注册与充值网络说明',
  description: 'Roogoo 邀请码 n8x6n2，复制注册链接或扫描邀请海报注册。查看 USDT 与 BNB Smart Chain（BEP20）网络选择说明。',
  alternates: { canonical: '/roogoo' },
};

export default function RoogooPage() {
  return <InfoPage className={styles.page} title="Roogoo 邀请注册" intro="注册链接、邀请码和充值网络说明，都放在这里。">
    <section className={styles.invitation} aria-label="邀请注册与海报">
      <div className={styles.details}>
        <span className={styles.eyebrow}>ROOGOO · INVITATION</span>
        <h2>复制邀请，一步直达</h2>
        <p>通过下方链接前往 Roogoo。注册时确认邀请码为 <strong>{inviteCode}</strong>。</p>
        <InviteActions />
      </div>
      <figure className={styles.poster}>
        <a href="/roogoo/invite.png" target="_blank" rel="noopener noreferrer" aria-label="在新窗口查看完整 Roogoo 邀请海报">
          <img src="/roogoo/invite.png" alt="Roogoo 邀请海报，包含邀请码 n8x6n2 和注册二维码" width={688} height={1020} />
        </a>
        <figcaption>扫码注册 · 点击海报可放大</figcaption>
      </figure>
    </section>

    <section className={styles.network} aria-labelledby="roogoo-network">
      <span className={styles.eyebrow}>充值网络</span>
      <h2 id="roogoo-network">推荐使用 BNB Smart Chain（BEP20）</h2>
      <p>按下方截图，充值时选择 <strong>USDT</strong>，网络选择 <strong>BNB Smart Chain（BEP20）</strong>。</p>
      <ol className={styles.steps}>
        <li><span aria-hidden="true">01</span><div><h3>选择币种</h3><p>在充值页面选择 USDT。</p></div></li>
        <li><span aria-hidden="true">02</span><div><h3>选择网络</h3><p>选择 BNB Smart Chain（BEP20）。</p></div></li>
        <li><span aria-hidden="true">03</span><div><h3>核对后再操作</h3><p>转出端与收款端的币种、网络必须一致，并核对收款地址。</p></div></li>
      </ol>
      <p className={styles.networkNote}>BNB Smart Chain 是这里选择的网络名称，截图中的充值币种是 USDT。可用币种、网络及费用，以 Roogoo 当前充值页面为准。</p>
      <details className={styles.guide}>
        <summary>查看网络选择截图</summary>
        <img src="/roogoo/network-guide.png" alt="充值页面示意：币种选择 USDT，网络选择 BNB Smart Chain（BEP20）" width={1360} height={576} loading="lazy" />
      </details>
    </section>

    <section className={styles.about}>
      <h2>关于这个邀请页</h2>
      <p>本页包含邀请链接，注册时会携带邀请码 {inviteCode}。注册、账户及充值服务由 Roogoo 提供；海报中的优惠、费用与使用规则，以平台实时说明为准。</p>
      <p><a href="/gemini">Google / Gemini 教程资源</a><span aria-hidden="true"> · </span><a href="/">发现更多实用工具</a></p>
    </section>
  </InfoPage>;
}
