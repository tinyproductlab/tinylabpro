import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { tools } from '@/lib/tool-catalog';
import { InviteActions } from './invite-actions';
import { inviteCode } from './invitation';
import styles from './page.module.css';

const games = tools.filter(tool => ['qigugu', 'numgugu', 'catbox'].includes(tool.slug));

export const metadata: Metadata = {
  title: 'Roogoo 邀请注册与充值网络说明',
  description: 'Roogoo 邀请码 n8x6n2，复制注册链接或扫描邀请海报注册。查看 USDT 与 BNB Smart Chain（BEP20）网络选择说明。',
  alternates: { canonical: '/roogoo' },
};

export default function RoogooPage() {
  return <InfoPage className={styles.page} title="Roogoo 邀请注册" intro="注册链接、邀请码和充值网络说明，都放在这里。" backHref="/share" backLabel="返回好物分享">
    <section className={styles.invitation} aria-label="邀请注册与海报">
      <div className={styles.details}>
        <span className={styles.eyebrow}>ROOGOO · INVITATION</span>
        <h2>复制邀请，一步直达</h2>
        <p>优先使用下方邀请链接注册，链接已附带邀请码；需要手动填写时，再使用下方备用邀请码。</p>
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
      <h2 id="roogoo-network">推荐使用充值网络</h2>
      <p>选择 <strong>BNB Smart Chain（BEP20）</strong>，如下图所示。</p>
      <figure className={styles.guide}>
        <a href="/roogoo/network-guide.png" target="_blank" rel="noopener noreferrer" aria-label="在新窗口放大查看充值网络截图">
          <img src="/roogoo/network-guide.png" alt="充值页面示意：币种选择 USDT，网络选择 BNB Smart Chain（BEP20），红框标出了推荐网络" width={1360} height={576} loading="lazy" />
        </a>
        <figcaption>点击图片可放大查看</figcaption>
      </figure>
      <p className={styles.networkNote}>转出端与收款端须选择相同的币种和网络。实际可用网络以平台充值页面为准。</p>
    </section>

    <section aria-labelledby="roogoo-games">
      <h2 id="roogoo-games">休息一下，玩个小游戏</h2>
      <p>小产品实验室出品，选一个喜欢的玩法，轻松玩一会儿。</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {games.map(game => <a key={game.slug} href={game.href} target="_blank" rel="noopener noreferrer" className="!text-inherit !no-underline rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
          <img src={game.logo} alt="" width={56} height={56} loading="lazy" className="size-14 rounded-2xl object-cover" />
          <h3 className="mt-4 text-base font-bold">{game.title}</h3>
          <p className="!mt-2 text-sm !leading-6">{game.description}</p>
          <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">去玩一下 ↗</span>
        </a>)}
      </div>
    </section>

    <section className={styles.about}>
      <h2>关于这个邀请页</h2>
      <p>本页包含邀请链接，注册时会携带邀请码 {inviteCode}。注册、账户及充值服务由 Roogoo 提供；海报中的优惠、费用与使用规则，以平台实时说明为准。</p>
      <p><a href="/gemini">Google / Gemini 教程资源</a><span aria-hidden="true"> · </span><a href="/">发现更多实用工具</a></p>
    </section>
  </InfoPage>;
}
