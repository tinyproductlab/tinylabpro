import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Google AI Pro 订阅插件拆解｜仅供研究',
  description: '拆解 Google AI Pro Offer Injector 的优惠凭证替换原理、结账截图与账号风险。仅供研究，千万不要订阅使用。',
  alternates: { canonical: '/google-ai-pro' },
};

const card = 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8';

export default function GoogleAiProPage() {
  return <InfoPage title="Google AI Pro 订阅插件拆解" intro="记录插件原理与结账截图，供技术研究参考。" backHref="/share" backLabel="返回好物分享">
    <section aria-labelledby="research-risk" className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
      <h2 id="research-risk" className="!mt-0 !text-red-900">风险提醒</h2>
      <p>可能存在账号受限、封号或优惠失效等风险。仅供研究，请勿订阅使用。</p>
    </section>

    <section className={card}>
      <h2>研究资料与地址生成器</h2>
      <p>插件源码与地址生成器入口，集中放在这里。</p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a href="/downloads/google-pro-research.zip" download="google-pro-research.zip" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">下载原始插件包 · 仅供研究</a>
        <a href="https://addressgen.tinylabpro.com/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">地址生成器 · 测试数据 ↗</a>
      </div>
    </section>



    <section className={card}>
      <h2>一句话看懂：它把优惠凭证换掉了</h2>
      <p>你正常打开订阅结账页时，网页会向 Google 提交商品和优惠信息。这个插件尝试把其中的优惠凭证，换成作者预先准备好的 offer token，让 Google 按另一组促销条件结账。</p>
      <p>它不能自己生成会员。是否接受优惠、账号是否符合资格，最终由 Google 后台决定。</p>
      <p>插件不是只改页面文字：源码会拦截部分网络请求和结账窗口链接，替换订阅商品及优惠凭证，还会加入一个 YouTube Premium 附加商品。</p>
    </section>

    <section className={card}>
      <h2>“两年”是作者的叠加设想</h2>
      <p>界面把内置凭证标为“12 个月”“6 个月（SS）”“6 个月”和一个备用选项，想通过 12＋6＋6 凑成 24 个月。</p>
      <p>代码会保存已有订阅 ID，并尝试把后续优惠接到现有订阅上。但这些名称是作者自己标的，源码没有交代凭证来源，也不能证明 Google 允许叠加两年。</p>
      <figure className="mt-6">
        <img src="/images/google-ai-pro/popup.png" alt="插件弹窗，包含作者标注的十二个月、六个月及备用优惠选项" width={399} height={614} loading="lazy" className="mx-auto max-h-[620px] max-w-full rounded-xl border border-slate-200 object-contain" />
        <figcaption className="mt-3 text-sm text-slate-500">“已挂载”只表示插件已启用，不等于优惠领取成功。</figcaption>
      </figure>
    </section>

    <section className={card}>
      <h2>日本区截图：一年 AI Pro，并非已经拿到两年</h2>
      <p>插件说明写着美国区，但这组截图的结账页显示日元价格，并出现了试用条款。这只能说明当时该结账页的展示结果，不能推断所有日本区账号都适用。</p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">截图中的试用期限和后续费用</caption>
          <thead><tr><th scope="col" className="border-b p-3">项目 / 日期</th><th scope="col" className="border-b p-3">截图显示</th></tr></thead>
          <tbody>
            <tr><th scope="row" className="border-b p-3 font-medium">今天</th><td className="border-b p-3">JP¥0</td></tr>
            <tr><th scope="row" className="border-b p-3 font-medium">Google AI Pro（5TB）</th><td className="border-b p-3">免费试用 12 个月</td></tr>
            <tr><th scope="row" className="border-b p-3 font-medium">YouTube Premium 附加订阅</th><td className="border-b p-3">免费试用 1 个月</td></tr>
            <tr><th scope="row" className="border-b p-3 font-medium">2026 年 12 月 5 日起</th><td className="border-b p-3">YouTube 每月 JP¥1,100</td></tr>
            <tr><th scope="row" className="p-3 font-medium">2027 年 11 月 5 日起</th><td className="p-3">两项合计每月 JP¥4,000</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>结账预览不是订阅成功凭证，也不是两年叠加成功的证据。</strong>截图中的价格和期限只对应这次展示，不是当前通用报价。源码商品标识含 2TB，截图实际显示 5TB，也不能只按代码名称判断权益。</p>
      <figure className="mt-6"><img src="/images/google-ai-pro/checkout.png" alt="日本区 Google Play 结账预览：今天零日元，AI Pro 免费十二个月，YouTube 免费一个月，后续自动收费" width={579} height={647} loading="lazy" className="mx-auto h-auto max-w-full rounded-xl border border-slate-200" /><figcaption className="mt-3 text-sm text-slate-500">顶部绿条由插件生成；下面的结账条款显示了不同的免费期限和扣费日期。</figcaption></figure>
    </section>

    <section className={card}>
      <h2>加载机制与界面说明</h2>
      <p>这是一个解压后加载的 Chrome 扩展。截图中的入口位于扩展程序管理页：开启“开发者模式”，通过“加载已解压的扩展程序”选择包含 manifest.json 的文件夹。这里解释的是扩展加载机制，不建议实际安装。</p>
      <figure className="mt-6"><img src="/images/google-ai-pro/extensions.png" alt="Chrome 扩展管理页，红框标出开发者模式与加载已解压的扩展程序入口" width={1625} height={681} loading="lazy" className="h-auto w-full rounded-xl border border-slate-200" /></figure>
      <p>加载后，插件弹窗已列出其操作步骤。本文不复述订阅和叠加步骤，千万不要照着订阅使用。流程原理是：选择内置优惠 → 插件改写请求 → Google 返回结账条款。</p>
      <figure className="mt-6"><img src="/images/google-ai-pro/plans.png" alt="日本区 Google One 方案页，展示 Google AI Pro 套餐入口" width={1185} height={785} loading="lazy" className="h-auto w-full rounded-xl border border-slate-200" /><figcaption className="mt-3 text-sm text-slate-500">方案入口本身不能证明特殊优惠资格。</figcaption></figure>
    </section>

    <section className={card}>
      <h2>“免费可订”的绿条怎么判断？</h2>
      <p>它读取页面文字，查找 free trial、$0.00、charged today 等关键词，再显示红、绿或灰色提示。它不是账单验证工具，没有任何阻止扣款的功能。</p>
      <p>源码还存在一个默认状态不一致的问题：弹窗没有设置时显示关闭，页面脚本没有设置时却默认启用“12 个月”。不要仅凭弹窗外观判断实际状态。</p>
    </section>

    <details id="cancel-subscription" className={card}>
      <summary className="cursor-pointer font-semibold">已经订阅？查看取消方式</summary>
      <p>如果已经订阅，建议立即取消整套组合的自动续费。操作方式如下。</p>
      <p>Google Play 官方说明：取消基础订阅，会自动取消关联的加购项，两者都停止自动续订。因此，如果 AI Pro 和 YouTube 确实属于同一组合订阅，取消整套后，附带的 YouTube 也会一起停止续费。免费期限不同，不代表取消整套后 YouTube 仍必然扣费。</p>
      <h3 className="mt-6 text-lg font-bold">电脑网页取消方式</h3>
      <ol className="list-decimal space-y-3 pl-6">
        <li>打开 <a href="https://play.google.com/store/account/subscriptions" target="_blank" rel="noopener noreferrer">Google Play 订阅管理</a>，确认登录的是实际订阅的 Google 账号。</li>
        <li>找到 Google One / Google AI Pro 对应的组合订阅，核对商品详情中是否包含 YouTube Premium 附加订阅。</li>
        <li>点击“管理” → “取消订阅”，选择原因，按页面提示继续并完成最后确认。不同语言或地区的按钮名称可能略有不同。</li>
        <li>返回订阅详情，确认已显示“已取消”或明确停止续费的提示，核对到期日期，并保存确认邮件或截图。只进入取消页面不算完成。</li>
        <li>再打开 <a href="https://www.youtube.com/paid_memberships" target="_blank" rel="noopener noreferrer">YouTube 购买与会员资格</a>，检查有没有另一笔仍在续费的独立订阅。如有，需要另行取消；关联项可能标注“由 Google One 提供”。</li>
      </ol>
      <p><strong>取消自动续费不一定立即失去权益。</strong>Google 的一般规则是保留至相应结算周期结束；这笔试用的实际终止时间与保留权益，以取消确认页为准，不能承诺一定保留完整一年。</p>
      <p>找不到订阅时，先检查账号是否正确；若仍无法确认，查看订阅收据中的管理入口或联系 Google 支持。卸载插件、关闭网页或卸载应用都不等于取消订阅。</p>
      <p className="!mt-5 text-sm">官方依据：<a href="https://support.google.com/googleplay/answer/16296331?hl=zh-Hans" target="_blank" rel="noopener noreferrer">包含加购项的订阅</a> · <a href="https://support.google.com/googleplay/answer/7018481?hl=zh-Hans&amp;co=GENIE.Platform%3DDesktop" target="_blank" rel="noopener noreferrer">Google Play 取消订阅说明</a> · <a href="https://support.google.com/googleone/answer/9056360?hl=zh-Hans" target="_blank" rel="noopener noreferrer">取消 Google One 后的权益</a></p>
    </details>
  </InfoPage>;
}
