import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { tools } from '@/lib/tool-catalog';
import { InviteActions } from './invite-actions';
import { inviteCode } from './invitation';
import styles from './page.module.css';

const games = tools.filter(tool => ['qigugu', 'numgugu', 'catbox'].includes(tool.slug));

export const metadata: Metadata = {
  title: 'Roogoo 乐享卡开卡步骤与用途',
  description: 'Roogoo 乐享卡（Enjoy Card）开卡步骤：邀请注册、选择卡片、充值、实名认证与使用。说明 App Store、Google Play 等用途，以及 Apple Pay 和 AI 订阅的验证情况。',
  alternates: { canonical: '/roogoo' },
};

export default function RoogooPage() {
  return <InfoPage className={styles.page} title="Roogoo 乐享卡开卡指南" intro="从注册到申请乐享卡，再到充值和使用。本文只介绍乐享卡（Enjoy Card），保留邀请入口与充值网络截图。" backHref="/share" backLabel="返回好物分享">
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

    <nav aria-label="开卡指南目录" className={styles.guideNav}>
      <a href="#enjoy-uses">能用来做什么</a><a href="#enjoy-steps">如何开卡</a><a href="#roogoo-network">充值网络</a><a href="#enjoy-fees">费用与注意事项</a>
    </nav>

    <section className={styles.network} aria-labelledby="enjoy-uses">
      <span className={styles.eyebrow}>ENJOY CARD · 乐享卡</span>
      <h2 id="enjoy-uses">先看这张卡能帮你做什么</h2>
      <p>乐享卡是美国归属地、美元结算的 Visa 虚拟预付卡，需要先充值再消费，没有信用卡透支额度。这里只讲这一张卡，申请时认准“乐享卡 / Enjoy Card”。</p>
      <div className={styles.useGrid}>
        <div><h3>应用商店与日常线上支付</h3><p>官方乐享卡说明列有 App Store、Google Play 和 Google Pay 支持，可作为相应支付场景的候选卡。实际是否接受，仍取决于商户、账号地区及支付审核。</p></div>
        <div><h3>美区 Apple Pay 绑卡</h3><p>本文作者在提供的记录中反馈已绑卡成功，但官方中文帮助页仍标注“待定”，并写明处于测试中。这是个人实测结果，不能保证所有设备、账号或商户都能使用。</p></div>
        <div><h3>AI 与其他会员订阅</h3><p>官方介绍把 AI 订阅列为用途之一，但本次记录尚未测试 ChatGPT 购买，也未验证 Claude、Gemini 等具体服务。不要把“支持订阅场景”理解为每个平台一定支付成功。</p></div>
      </div>
      <p className={styles.networkNote}>原文中的 Apple 账单截图显示“处理中”，不能单独证明扣款成功，也不能据此证明 ChatGPT 等订阅已可用。</p>
      <p className={styles.source}>核对日期：2026 年 11 月 6 日。<a href="https://help.roogoo.com/zh-CN/articles/14086084-乐享卡-enjoy-card-介绍-费用和规则" target="_blank" rel="noopener noreferrer">查看官方乐享卡说明 ↗</a></p>
    </section>

    <section className={styles.network} aria-labelledby="enjoy-steps">
      <span className={styles.eyebrow}>开卡步骤</span>
      <h2 id="enjoy-steps">如何申请乐享卡</h2>
      <p>开卡资格由平台与发卡方审核。开始前先查看当前费用、身份认证和地区要求，再决定是否申请；不要为了开卡填写虚假身份资料。</p>
      <ol className={styles.steps}>
        <li><h3>通过邀请链接注册并登录</h3><p>使用本页上方的注册链接，填写邮箱、邮箱验证码与登录密码；链接已携带邀请码。若需手动填写，备用邀请码为 {inviteCode}。</p></li>
        <li><h3>进入“卡片”，选择乐享卡</h3><p>找到“乐享卡（Enjoy Card）”，核对 Visa、美元结算及费用规则，再点击申请。不要把其他卡种当成同一张卡。</p></li>
        <li><h3>准备首充余额</h3><p>本次开卡截图显示首张卡开卡费 0 USD、首充 10 USD。10 USD 是首次充入供消费的金额，不是 10 USD 开卡手续费；如资金账户余额不足，平台会提示先充币。到账后回到申请流程。</p></li>
        <li><h3>按提示完成身份认证</h3><p>提交真实个人资料，按页面要求填写英文姓名并完成证件、人脸等认证项目，等待平台及发卡方审核。实际顺序可能因账号状态不同而变化。</p></li>
        <li><h3>确认卡内余额，再添加付款方式</h3><p>审核通过、卡片生成后，先确认首充是否已进入卡内可用余额。资金账户与卡内余额要分开看：如果钱仍在资金账户，按平台入口转入卡片，避免重复充值。随后按目标平台要求添加卡片与真实账单资料。</p></li>
      </ol>
      <div className={styles.shots}>
        <figure className={styles.guide}><a href="/roogoo/enjoy-card.png" target="_blank" rel="noopener noreferrer"><img src="/roogoo/enjoy-card.png" alt="乐享卡申请截图，卡片名称为 Enjoy Card，显示 Visa 与首充说明" width={1122} height={1028} loading="lazy" /></a><figcaption>认准乐享卡；截图是开卡记录，当前条件以页面为准。</figcaption></figure>
        <figure className={styles.guide}><a href="/roogoo/initial-balance.png" target="_blank" rel="noopener noreferrer"><img src="/roogoo/initial-balance.png" alt="账户余额不足提示：开卡费零美元，首充用于消费十美元，合计需要十美元" width={870} height={1048} loading="lazy" /></a><figcaption>余额不足提示：区分开卡费与首次充入金额。</figcaption></figure>
      </div>
      <p className={styles.source}><a href="https://help.roogoo.com/zh-CN/articles/11761257-roogoo-card-开卡流程" target="_blank" rel="noopener noreferrer">官方开卡流程 ↗</a> · 截图和实测叙述来自作者提供的开卡记录。</p>
    </section>

    <section className={styles.network} aria-labelledby="roogoo-network">
      <span className={styles.eyebrow}>充值网络</span>
      <h2 id="roogoo-network">充值时，币种与网络要一致</h2>
      <p>本页截图使用 <strong>USDT / BNB Smart Chain（BEP20）</strong>。只有当前收款页面支持该组合时才按此选择；不要仅凭旧截图转账。</p>
      <figure className={styles.guide}>
        <a href="/roogoo/network-guide.png" target="_blank" rel="noopener noreferrer" aria-label="在新窗口放大查看充值网络截图">
          <img src="/roogoo/network-guide.png" alt="充值页面示意：币种选择 USDT，网络选择 BNB Smart Chain（BEP20），红框标出了本次使用的网络" width={1360} height={576} loading="lazy" />
        </a>
        <figcaption>点击图片可放大查看</figcaption>
      </figure>
      <p className={styles.networkNote}>转出端与收款端须选择相同的币种和网络。实际可用网络以平台充值页面为准。</p>
    </section>

    <section className={styles.network} aria-labelledby="enjoy-fees">
      <span className={styles.eyebrow}>费用与用卡</span>
      <h2 id="enjoy-fees">免费开卡，不代表消费没有费用</h2>
      <p>官方中文规则目前列明：首张卡可免开卡费、首充 10 USD 起；标准交易费为 1%，非美元区消费另有 1.6% 跨境费。月、年管理费正处于减免活动中，不能理解为永久免费。</p>
      <ul className={styles.notes}>
        <li><strong>绑定卡片也可能产生费用：</strong>零元授权、退款、拒付和销卡等另有规则，申请前请阅读完整费用表。</li>
        <li><strong>不靠余额不足来停止续费：</strong>不用的会员要在商户端取消，并解绑卡片。余额不足导致拒付仍可能收费，销卡也不等于取消商户订阅。</li>
        <li><strong>小额按需充值：</strong>平台停运、卡片停发或余额冻结都有风险，不把它当储蓄账户；卡内余额低于 2 USD 可能冻卡，处理办法以平台最新规则为准。</li>
        <li><strong>保护卡片信息：</strong>卡号、有效期、CVV、证件和账单资料不要公开，截图分享前先打码。</li>
      </ul>
      <p className={styles.source}>费用与规则核对于 2026 年 11 月 6 日。<a href="https://help.roogoo.com/zh-CN/articles/14086084-乐享卡-enjoy-card-介绍-费用和规则" target="_blank" rel="noopener noreferrer">开卡前查看官方完整规则 ↗</a>。本页不展开质押或“终身零费率”升级。</p>
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
