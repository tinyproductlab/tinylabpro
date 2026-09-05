import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = { title: '隐私政策', description: 'TinyProductLab 如何处理位置、文件、日志、Cookie 与第三方服务。', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() { return <InfoPage title="隐私政策" intro="我们遵循按需和最少处理原则。本政策最后更新于 2026 年 9 月 5 日。">
  <section><h2>我们处理的信息</h2><p>主站无需注册。服务器和托管服务可能为安全、排错和稳定运行记录必要的访问日志，例如访问时间、请求地址、浏览器类型和 IP 地址。</p></section>
  <section><h2>位置与天气</h2><p>只有在你主动点击天气功能并同意浏览器定位后，主站才读取当前位置。经纬度仅用于向本站天气接口和 Apple WeatherKit 查询当地天气，本站不建立位置历史。</p></section>
  <section><h2>工具文件与数据</h2><p>各工具的数据处理方式可能不同。标明“浏览器本地处理”的功能在本机完成；需要网络同步或服务器处理的功能会在对应页面说明。上传前请阅读工具页面提示，不要上传无权处理的内容。</p></section>
  <section><h2>Cookie 与第三方服务</h2><p>网站托管和安全服务可能使用维持运行所需的 Cookie。本站准备申请 Google AdSense；广告启用后，Google 及其合作方可能依其政策使用 Cookie 提供、衡量和优化广告。若未来启用需要同意的广告或分析功能，我们会同步更新提示和本政策。</p></section>
  <section><h2>外部链接与儿童隐私</h2><p>本站包含第三方网站链接，它们适用各自的隐私政策。本站不以主动收集儿童个人信息为目的；未成年人应在监护人指导下使用涉及个人数据的工具。</p></section>
  <section><h2>政策更新与联系</h2><p>功能或第三方服务变化时，本政策会相应更新。如有隐私问题，请发送邮件至 <a href="mailto:userfeedback@zohomail.com">userfeedback@zohomail.com</a>。</p></section>
</InfoPage>; }
