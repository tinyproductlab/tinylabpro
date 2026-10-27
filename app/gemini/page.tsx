import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { CopyInvite } from './copy-invite';
import { tools } from '@/lib/tool-catalog';
import styles from './page.module.css';

const games = tools.filter(tool => ['qigugu', 'numgugu', 'catbox'].includes(tool.slug));

export const metadata: Metadata = {
  title: 'Gemini 教程资源',
  description: '复制 Gemini 教程中使用的 Telegram 邀请链接和 Google 学生优惠资格验证链接。',
  alternates: { canonical: '/gemini' },
};

export default function GeminiPage() {
  return <InfoPage className={styles.compact} title="Gemini 教程资源" intro="邀请链接与学生优惠资格验证，复制或直接打开即可。">
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <span className="text-xs font-semibold tracking-widest text-blue-600">TELEGRAM</span>
      <h2 className="mt-3">领取你的邀请链接</h2>
      <CopyInvite />
    </section>
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <span className="text-xs font-semibold tracking-widest text-blue-600">GOOGLE</span>
      <h2 className="mt-3">Google 学生优惠资格验证</h2>
      <CopyInvite url="https://tinyplab.com/RNuIN6" id="google-student-verification" label="Google 学生优惠资格验证链接" buttonLabel="复制资格验证链接" qrImage="/gemini/student-verification.png" />
    </section>
    <p className="text-sm">微信内无法打开时，请复制链接到系统浏览器。</p>
    <section aria-labelledby="gemini-games">
      <h2 id="gemini-games">休息一下，玩个小游戏</h2>
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
    <section><h2>关于这个页面</h2><p>本页提供教程资源入口，具体使用步骤请参照公众号教程。</p></section>
    <section><h2>发现更多实用工具</h2><p><a href="https://tinylabpro.com">小产品实验室</a> · <a href="https://renguanwang.com">认官网</a></p></section>
  </InfoPage>;
}
