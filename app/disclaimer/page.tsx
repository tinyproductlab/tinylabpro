import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = { title: '免责声明', description: 'TinyProductLab 工具输出、第三方兼容性与品牌关系说明。', alternates: { canonical: '/disclaimer' } };

export default function DisclaimerPage() { return <InfoPage title="免责声明" intro="工具帮助减少重复操作，但不能代替用户对结果的核验和判断。">
  <section><h2>工具输出</h2><p>生成、转换、识别或计算结果可能受输入质量、浏览器环境和第三方格式变化影响。请在正式使用前核对，本站不保证所有第三方平台均兼容。</p></section>
  <section><h2>测试数据</h2><p>地址和人物资料等生成内容属于模拟测试数据，用于软件开发、UI、表单和数据格式测试，不代表真实个人、账户或支付工具。请勿用于身份冒用、金融交易、欺骗或违反第三方平台规则的用途。</p></section>
  <section><h2>版权与第三方品牌</h2><p>文档和图片处理功能仅应用于你拥有或有权编辑的内容。页面中出现的第三方产品名称和商标仅用于说明兼容性或相关场景；除明确说明外，本站与相关品牌不存在官方关系。</p></section>
</InfoPage>; }
