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
