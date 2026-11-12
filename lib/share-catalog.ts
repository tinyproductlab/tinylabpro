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
    slug: 'email-code-login',
    title: '邮箱验证码账号系统',
    category: '云主机 · 部署教程',
    description: '从 SSH 登录开始，配置 HTTPS 和发信，在自己的云主机上部署邮箱验证码登录。提供可直接粘贴的脚本和完整安装包。',
    href: '/LXI',
    mark: '＠',
    tone: 'blue',
  },
  {
    slug: 'gpt-half-price',
    title: 'GPT Plus 半价资格号',
    category: '账号与订阅 · 费用说明',
    description: '一月规格 10 元账号费＋10 美元订阅费，合计约 77 元人民币；说明自行付款、优惠期限与 Roogoo 页面入口。',
    href: '/gpt-half-price',
    mark: '½',
    tone: 'blue',
  },
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
    description: '日本归属地账号实测正常领取一年，未做叠加，附插件原理与研究资料。仅供研究，不建议拿大号订阅使用。',
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
    description: '乐享卡开卡步骤、用途与费用说明，附邀请注册链接、邀请码、扫码海报和充值网络截图。',
    href: '/roogoo',
    mark: 'R',
    tone: 'orange',
  },
];
