import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Google AI Pro 订阅插件拆解｜仅供研究',
  description: '拆解 Google AI Pro Offer Injector 的优惠凭证替换原理、结账截图与自动续费风险。仅供研究，千万不要订阅使用。',
  alternates: { canonical: '/google-ai-pro' },
};

const card = 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8';

export default function GoogleAiProPage() {
  return <InfoPage title="Google AI Pro 订阅插件拆解" intro="仅供研究，千万不要订阅使用。下文记录代码原理和结账截图，不作为领取会员的推荐。" backHref="/share" backLabel="返回好物分享">
    <section aria-labelledby="research-risk" className="rounded-3xl border-2 border-red-300 bg-red-50 p-6 sm:p-8">
      <p className="!mt-0 text-sm font-bold tracking-wide !text-red-700">风险提醒 · 请先阅读</p>
      <h2 id="research-risk" className="!text-red-900">仅供研究，千万不要订阅使用</h2>
      <p>插件会改写 Google 的结账请求。显示免费不等于符合优惠资格，也不保证优惠长期有效，更不代表没有后续扣费。</p>
      <ul className="list-disc space-y-3 pl-5">
        <li><strong>自动续费：</strong>AI Pro 与附带的 YouTube 免费期限可能不同，YouTube 可能先开始收费。</li>
        <li><strong>绿条不保障安全：</strong>绿色横幅由插件自己添加，只识别页面关键词，不能核验资格或阻止扣款。</li>
        <li><strong>优惠与账号风险：</strong>优惠可能无法领取、无法叠加或后续被撤回；是否触发账号限制无法确定。</li>
        <li><strong>扩展权限：</strong>插件能修改其获准访问的结账页面。本次源码未见向第三方上传密码或银行卡的逻辑，这不代表其他版本也安全。</li>
      </ul>
      <p><strong>请勿使用生成地址冒充真实账单地址或规避地区资格要求。</strong></p>
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

    <section className={card}>
      <h2>研究资料与地址生成器</h2>
      <p>原始插件包供查看代码、核对本文分析，不作为订阅推荐。地址生成器提供软件演示和表单测试用的模拟资料，不代表真实个人或账单地址。</p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a href="/downloads/google-pro-research.zip" download="google-pro-research.zip" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">下载原始插件包 · 仅供研究</a>
        <a href="https://addressgen.tinylabpro.com/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">地址生成器 · 测试数据 ↗</a>
      </div>
      <p className="!mt-5 text-sm"><strong>仅供研究，千万不要订阅使用。</strong>不要把生成资料用于虚假账单、身份冒用或规避平台资格验证。</p>
    </section>
  </InfoPage>;
}
