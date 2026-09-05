import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = { title: '联系我们', description: '向 TinyProductLab 反馈问题或提出工具建议。', alternates: { canonical: '/contact' } };

export default function ContactPage() { return <InfoPage title="联系我们" intro="如果发现问题、有工具建议，或需要反馈隐私与版权事项，欢迎联系我们。">
  <section><h2>反馈邮箱</h2><p><a href="mailto:userfeedback@zohomail.com">userfeedback@zohomail.com</a></p><p>来信时请附上使用的工具名称、问题现象和可复现步骤。请勿通过邮件发送密码、动态验证码、私钥或其他敏感信息。</p></section>
  <section><h2>开源项目</h2><p>也可以在 <a href="https://github.com/tinyproductlab" target="_blank" rel="noopener noreferrer">GitHub</a> 查看已公开项目并提交问题。</p></section>
</InfoPage>; }
