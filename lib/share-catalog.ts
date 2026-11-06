export type ShareItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href: string;
  mark: string;
  tone: 'blue' | 'orange';
};

// Add future recommendations here; the collection page renders this list.
export const shareItems: ShareItem[] = [
  {
    slug: 'multi-assistant',
    title: 'Mac 多开助手',
    category: 'Mac 工具 · 多账号管理',
    description: 'Mac 微信双开、独立图标与菜单栏管理，附使用和领取说明。微信三开及 QQ 功能仍在测试，以项目页面为准。',
    href: 'https://2.tinylabpro.com/',
    mark: '2',
    tone: 'blue',
  },
  {
    slug: 'google-ai-pro',
    title: 'Google AI Pro 订阅插件拆解',
    category: '原理拆解 · 风险提示',
    description: '拆解优惠凭证替换原理与结账截图，说明自动续费和叠加风险。仅供研究，千万不要订阅使用。',
    href: '/google-ai-pro',
    mark: 'G',
    tone: 'blue',
  },
  {
    slug: 'macutil',
    title: 'MacUtil 汉化插件',
    category: 'Mac 工具 · 汉化资源',
    description: 'MacUtil 2.0.9 中文界面补丁，附一键制作脚本、源码和安装说明。已修复全选操作闪退问题。',
    href: '/macutil',
    mark: 'M',
    tone: 'blue',
  },
  {
    slug: 'google',
    title: 'Google / Gemini',
    category: '教程资源',
    description: 'Google / Gemini 教程相关链接、邀请入口和学生优惠资格验证资源，集中查看。',
    href: '/gemini',
    mark: 'G',
    tone: 'blue',
  },
  {
    slug: 'roogoo',
    title: 'Roogoo',
    category: '邀请注册',
    description: '邀请注册链接、邀请码和扫码海报，以及充值网络选择说明。',
    href: '/roogoo',
    mark: 'R',
    tone: 'orange',
  },
];
