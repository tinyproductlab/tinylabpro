import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = { title: '关于 TinyProductLab', description: '了解小产品实验室为什么创建这些轻量在线工具。', alternates: { canonical: '/about' } };

export default function AboutPage() { return <InfoPage title="关于 TinyProductLab" intro="TinyProductLab（小产品实验室）是一个独立开发的小工具项目。">
  <section><h2>我们在做什么</h2><p>我们把图片处理、学习效率、教师辅助、隐私安全、日常办公和开发测试中的小需求，做成无需复杂配置、打开即可使用的网页工具。</p></section>
  <section><h2>为什么创建这些工具</h2><p>很多临时需求并不值得安装一套大型软件。我们希望用更轻、更直接的方式解决它们，同时尽量减少注册、上传和不必要的数据收集。</p></section>
  <section><h2>持续改进</h2><p>工具会根据真实使用反馈逐步更新。部分项目开放源码，欢迎通过联系页面反馈问题或提出建议。</p></section>
</InfoPage>; }
