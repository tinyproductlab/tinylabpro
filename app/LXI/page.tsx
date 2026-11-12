import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { article } from './article';
import { tools } from '@/lib/tool-catalog';

const games = tools.filter(tool => ['qigugu', 'numgugu', 'catbox'].includes(tool.slug));

export const metadata: Metadata = {
  title: '用 SSH 一键部署邮箱验证码登录',
  description: '从已开好的云主机开始，配置 HTTPS 与发信，用脚本安装自己的邮箱验证码账号系统。',
  alternates: { canonical: '/LXI' },
};

export default function EmailCodeLoginPage() {
  return <InfoPage
    title="用 SSH 一键部署邮箱验证码登录"
    intro="在自己的云主机上搭建账号系统。访客输入邮箱和六位验证码，即可注册或登录。"
    backHref="/share"
    backLabel="返回好物分享"
  >
    <section aria-label="安装文件" className="flex flex-wrap gap-3">
      <a href="/downloads/email-code-login.zip" download className="rounded-xl bg-blue-600 px-5 py-3 font-semibold !text-white !no-underline hover:bg-blue-700">下载完整安装包</a>
      <a href="/downloads/email-code-login-paste.txt" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold !no-underline">打开 SSH 粘贴脚本</a>
    </section>
    <div className="min-w-0 overflow-x-auto" dangerouslySetInnerHTML={{ __html: article }} />
    <section aria-labelledby="lxi-games">
      <h2 id="lxi-games">休息一下，玩个小游戏</h2>
      <p>小产品实验室出品，选一个喜欢的玩法，轻松玩一会儿。</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {games.map(game => <a key={game.slug} href={game.href} target="_blank" rel="noopener noreferrer" className="!text-inherit !no-underline rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          <img src={game.logo} alt="" width={56} height={56} loading="lazy" className="size-14 rounded-2xl object-cover" />
          <h3 className="mt-4 text-base font-bold">{game.title}</h3>
          <p className="!mt-2 text-sm !leading-6">{game.description}</p>
          <span className="mt-4 inline-block text-sm font-semibold text-blue-600">去看看 ↗</span>
        </a>)}
      </div>
    </section>
  </InfoPage>;
}
