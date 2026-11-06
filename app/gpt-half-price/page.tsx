import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'GPT Plus 半价资格号：费用与开通说明',
  description: '拆清第三方 GPT Plus 半价资格号的两笔费用：一月规格账号费用约人民币 10 元，另需自行支付截图中的 10 美元订阅费。附优惠期限说明与 Roogoo 页面入口。',
  alternates: { canonical: '/gpt-half-price' },
};

const card = 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8';
const sellerUrl = 'https://chong.nerver.cc/';

export default function GptHalfPricePage() {
  return <InfoPage title="GPT Plus 半价资格号" intro="分享一个发现的第三方站点，以及它的费用构成。买到的是带优惠资格的账号，Plus 订阅仍需自己另外付款。" backHref="/share" backLabel="返回好物分享">
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
      <h2>先分清：资格账号，不是已开通的 Plus</h2>
      <p>这是第三方商家出售的账号，不是 OpenAI 官方售号渠道。账号来源、后续控制权、售后与优惠能否兑现均需自行核对；本页没有验证卖家的授权、账号安全或长期稳定性。</p>
      <p>本次结账截图写的是<strong>“享 50% 优惠，为期 1 个月”</strong>。不要据此理解为永久半价，也不要仅凭卖家标注的一月、二月或三月规格判断实际优惠期限。</p>
    </section>

    <section className={card}>
      <h2>“半价”是怎么回事？</h2>
      <p>网站是 <a href={sellerUrl} target="_blank" rel="noopener noreferrer">chong.nerver.cc ↗</a>。买到的是带半价优惠资格的账号，不是已经开通的 Plus。登录后会看到优惠提示，<strong>订阅费还需要自己付款，所以你得有一张结账页面接受的支付卡。</strong></p>
      <p>如果没有卡，商家网站也提供支付卡购买入口，不过我没有测试过，不清楚实际使用情况。我自己用的是 <a href="/roogoo">Roogoo →</a>。这里说的是我使用的卡，不代表这笔 ChatGPT 优惠订阅已用它支付成功。</p>
      <p>本次记录中的优惠卡片显示原价 US$20、优惠价 US$10 / 月；结账截图进一步显示减免 US$10，优惠持续 1 个月，今天应付 US$10。这里记录的是截图中的这笔报价，不保证其他账号、地区或后续月份相同。</p>
      <div className="mt-6 grid items-start gap-5 sm:grid-cols-2">
        <figure><a href="/images/gpt-half-price/offer.png" target="_blank" rel="noopener noreferrer"><img src="/images/gpt-half-price/offer.png" alt="提供的特别优惠截图：ChatGPT Plus 从二十美元降至十美元每月" width={884} height={1082} loading="lazy" className="h-auto w-full rounded-xl border border-slate-200" /></a><figcaption className="mt-3 text-sm text-slate-500">优惠卡片只展示价格，期限还要看结账条款。</figcaption></figure>
        <figure><a href="/images/gpt-half-price/checkout.png" target="_blank" rel="noopener noreferrer"><img src="/images/gpt-half-price/checkout.png" alt="提供的结账截图：月付二十美元，减免十美元，百分之五十优惠为期一个月，今日应付十美元" width={1178} height={1350} loading="lazy" className="h-auto w-full rounded-xl border border-slate-200" /></a><figcaption className="mt-3 text-sm text-slate-500">本次截图明确写着：50% 优惠，为期 1 个月。</figcaption></figure>
      </div>
    </section>

    <section className={card}>
      <h2>一个月合计约 77 元人民币</h2>
      <p><strong>10 RMB＋US$10 ≈ 77 元人民币。</strong>按 2026 年 11 月 6 日参考汇率 1 美元约合 6.68 元人民币估算：10＋10×6.68＝76.80 元，约 77 元。按一月规格举例，费用分成两笔，收款方也不同：</p>
      <div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">一月规格的两笔费用</caption><thead><tr><th scope="col" className="border-b p-3">项目</th><th scope="col" className="border-b p-3">金额</th><th scope="col" className="border-b p-3">付给谁</th></tr></thead><tbody><tr><th scope="row" className="border-b p-3 font-medium">购买资格账号</th><td className="border-b p-3">约 ¥10</td><td className="border-b p-3">第三方商家</td></tr><tr><th scope="row" className="p-3 font-medium">优惠期 Plus 订阅</th><td className="p-3">US$10</td><td className="p-3">ChatGPT 的订阅结账页面</td></tr></tbody></table></div>
      <p><strong>不是花 10 元就买到一个月 Plus。</strong>上述约 77 元的估算未包含可能产生的税费、汇率差或支付卡手续费，最终以商家订单和订阅结账页各自显示的金额为准。</p>
      <p>商家网站当前列有微信支付、支付宝等方式，用于购买资格号；这不等于后续 ChatGPT 的美元订阅也能用同样方式支付。</p>
    </section>

    <section className={card}>
      <h2>购买与开通流程要分开看</h2>
      <ol className="list-decimal space-y-4 pl-6">
        <li><strong>进入商家网站。</strong>按站内提示注册或登录，选择“GPT Plus 半价资格号”，核对所选月份规格、价格、交付内容及退款条件。</li>
        <li><strong>购买资格账号。</strong>按页面提供的微信、支付宝等方式支付商家订单，收到的是账号资料，不是已经生效的 Plus 会员。</li>
        <li><strong>在 ChatGPT 官方网站核对优惠。</strong>登录对应账号，查看升级页面。确认域名为 chatgpt.com，不向不明页面提交银行卡资料。</li>
        <li><strong>自己支付订阅费。</strong>核对优惠是否显示、实际持续几个月、今天应付金额及后续续费价格。没有显示预期优惠时先停止，不按原价盲目付款。</li>
        <li><strong>完成后核对订阅并管理续费。</strong>以实际订阅状态和账单为准。只打算使用优惠期的话，及时通过订阅管理取消自动续费，并核对确认信息；不要通过把卡刷空来代替取消。</li>
      </ol>
      <figure className="mt-6"><a href="/images/gpt-half-price/seller.jpg" target="_blank" rel="noopener noreferrer"><img src="/images/gpt-half-price/seller.jpg" alt="第三方商品截图：GPT Plus 半价资格号，当前选中两月规格并显示二十元" width={1422} height={2684} loading="lazy" className="mx-auto h-auto w-full max-w-sm rounded-xl border border-slate-200" /></a><figcaption className="mt-3 text-center text-sm text-slate-500">这张截图选中的是“两月规格”，显示 ¥20；不是一月规格的价格截图。图片中的宣传用语来自商家，不代表本页核验或背书。</figcaption></figure>
      <div className="mt-6"><a href={sellerUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl border border-slate-300 px-5 py-3 font-semibold">查看第三方网站 ↗</a></div>
    </section>

    <section className={card}>
      <h2>下单前再核对这几件事</h2>
      <ul className="list-disc space-y-3 pl-5">
        <li>账号能否由你独立控制，邮箱、找回方式和后续售后是否明确。不要在控制权不清楚的账号中保存私密或工作资料。</li>
        <li>半价资格的来源和适用条件尚未得到验证，登录后有优惠卡片也不等于付款一定成功。</li>
        <li>商家首页公告写明：退款退到站内余额，余额提现另扣支付渠道 5.5% 手续费及 USDT 转账手续费。实际商品售后仍需单独核对。</li>
        <li>本次截图只证明当时显示的价格与期限，不证明所有商品均能兑现，也不保证以后仍有库存或同价。</li>
      </ul>
      <p className="!mt-5 text-sm text-slate-500">记录日期：2026 年 11 月 6 日。资料来自本次三张截图与<a href="https://chong.nerver.cc/product/06653049-3466-44b3-9838-f82f1848b2c2" target="_blank" rel="noopener noreferrer">商家商品页</a>。商家一月、二月、三月规格与详情里的“三个月”文案并不完全对应，实际优惠以所购账号的结账条款为准。汇率估算参考 <a href="https://www.exchangerate24.com/us-dollar-to-chinese-yuan/" target="_blank" rel="noopener noreferrer">USD / CNY 换算</a>，不是支付机构的实际结算报价。常规计划价格可查看 <a href="https://learn.chatgpt.com/docs/pricing" target="_blank" rel="noopener noreferrer">OpenAI 官方价格说明</a>。</p>
    </section>
  </InfoPage>;
}
