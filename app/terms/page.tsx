import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = { title: '使用条款', description: '使用 TinyProductLab 在线工具时适用的基本规则。', alternates: { canonical: '/terms' } };

export default function TermsPage() { return <InfoPage title="使用条款" intro="使用本站即表示你同意以合法、负责的方式使用这些工具。">
  <section><h2>网站用途</h2><p>本站提供轻量在线工具，用于学习、教学、日常处理和开发测试。工具结果仅供参考，重要事项请自行复核。</p></section>
  <section><h2>用户责任</h2><p>你应确保有权处理所提交的文件与数据，不得将本站用于侵权、欺诈、冒用身份、绕过平台规则或其他违法活动。</p></section>
  <section><h2>第三方服务与知识产权</h2><p>第三方产品名称和商标归各自权利人所有，仅用于说明兼容性或使用场景。除明确说明外，TinyProductLab 与相关第三方不存在官方隶属、授权或合作关系。</p></section>
  <section><h2>服务与责任限制</h2><p>我们会努力保持服务可用，但不保证工具始终不中断或适合所有场景。功能可能更新、调整或停止；因使用工具结果产生的决定与后果由用户自行判断和承担。</p></section>
</InfoPage>; }
