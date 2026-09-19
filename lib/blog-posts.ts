export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'encrypted-surveys-can-be-simple',
    title: '调查问卷也可以这样做：少一点负担，多一点保护',
    excerpt: '把复杂密码从普通填写场景中拿掉，同时为需要保密的问卷保留加密选项。',
    category: '产品故事',
    publishedAt: '2026-09-19',
    readingTime: '3 分钟阅读',
    sections: [
      {
        heading: '问卷里最常见的麻烦，不在题目本身',
        paragraphs: [
          '临时收集活动反馈、课堂意见或小组信息时，很多人只是想快速做一份问卷，发一个链接或二维码，让大家填完就结束。但一旦涉及联系方式、匿名建议或敏感内容，普通问卷又会让人担心：内容会不会明文保存，分享链接会不会被随意打开，换一台电脑后自己还能不能找到原来的问卷。',
          '为了处理这些问题，工具往往把流程做得很重：创建者要设置一串密码，填写者也得记住规则；真正需要快速填写时，反而被挡在第一步。',
        ],
      },
      {
        heading: '我们把它拆成两种模式',
        paragraphs: [
          '小产品实验室的加密调查问卷保留了两条清晰的路径。日常的轻量问卷可以直接扫码填写，适合课堂、活动报名和一般反馈；需要更高保护的内容，则选择加密模式，由创建者保管密钥。填写者不需要安装应用，问卷内容会在提交前完成加密。',
          '这样做不是为了把一个简单工具包装得很复杂，而是让不同场景各走适合自己的流程：该快的时候快，该保护的时候保护。',
        ],
      },
      {
        heading: '账号是可选的，方便把问卷带走',
        paragraphs: [
          '不登录也可以创建和使用问卷，数据默认留在当前浏览器。若你希望在另一台电脑继续编辑、查看自己创建的内容，可以选择使用小产品实验室账号同步。登录不会成为使用工具的门槛，它只是为“换设备后还能找到自己的问卷”提供一个选择。',
          '账号仅需要邮箱注册，不要求实名认证。对于更重视自主备份的用户，也仍然可以使用导入、导出功能保存自己的问卷内容。',
        ],
      },
      {
        heading: '从一个真实需求出发',
        paragraphs: [
          '加密调查问卷是 TinyProductLab 工具箱中的一个小工具。我们希望它解决的不是“做出一套更大的问卷系统”，而是让需要发一份问卷的人，少花一点时间处理设置，多保留一点对数据的控制权。',
        ],
      },
    ],
  },
  {
    slug: 'a-small-account-system',
    title: '11 元域名，搭起自己的账号系统',
    excerpt: '本地可用是基础；当用户需要换设备时，再用邮箱同步把数据带走。',
    category: '产品实践',
    publishedAt: '2026-09-09',
    readingTime: '2 分钟阅读',
    sections: [
      {
        heading: '登录不该成为开始使用的门槛',
        paragraphs: ['小产品实验室的大部分工具都可以直接使用，但“能把数据带走”是另一个问题。账号系统没有把登录变成门槛：本地功能仍然优先，只有在用户需要同步时才使用邮箱注册。'],
      },
      {
        heading: '为后续工具留一个共同入口',
        paragraphs: ['它运行在自己的服务器上，邮件来自自己的企业邮箱。后续会逐步接入需要备份的工具和游戏：用户可以继续本地自由使用，也可以选择登录，把自己的数据带到另一台设备。'],
      },
    ],
  },
  {
    slug: 'otp-local-first',
    title: 'OTP：本地可用，也能带着数据走',
    excerpt: '验证码默认留在本机；需要迁移时，用户可以自己选择备份方式。',
    category: '隐私安全',
    publishedAt: '2026-09-08',
    readingTime: '2 分钟阅读',
    sections: [
      {
        heading: '先本地使用，再谈同步',
        paragraphs: ['OTP 的核心是本地优先：不登录也能添加和使用验证码。需要换设备时，可以选择 WebDAV 备份，或使用账号同步。'],
      },
      {
        heading: '把选择权留给用户',
        paragraphs: ['账号同步只保留加密后的备份，并限制容量和版本数；用户不必为了使用一个验证码工具而先交出自己的数据。'],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
