import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { tools } from '@/lib/tool-catalog';

const games = tools.filter(tool => ['qigugu', 'numgugu', 'catbox'].includes(tool.slug));

export const metadata: Metadata = {
  title: 'MacUtil 汉化插件下载',
  description: 'MacUtil 2.0.9 汉化插件下载，包含一键制作脚本、源码和使用说明。支持 macOS 13 及以上版本。',
  alternates: { canonical: '/macutil' },
};

export default function MacUtilPage() {
  return <InfoPage title="MacUtil 汉化插件" intro="为 MacUtil 2.0.9 提供中文界面，安装脚本、汉化资源和源码一起打包。" backHref="/share" backLabel="返回好物分享">
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2>激活序列号</h2>
      <p>在 MacUtil 的激活界面输入下方序列号，完成激活后使用。</p>
      <label htmlFor="macutil-serial" className="sr-only">MacUtil 激活序列号</label>
      <input id="macutil-serial" type="text" readOnly value="MACU-0F65-F912-53B9-4179-A2DB-7772" className="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-900" />
      <p className="!mt-3 text-sm">选中上方序列号即可复制。</p>
    </section>
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <span className="text-xs font-semibold tracking-widest text-blue-600">MACUTIL · 中文界面补丁</span>
      <h2 className="mt-3">下载汉化包</h2>
      <p>适用 MacUtil 2.0.9，需要 macOS 13 或更高版本，以及 Python 3.8 或更高版本。请先从官网下载并安装原版 MacUtil。</p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a href="/downloads/macutil-chinese-selection-test.zip" download="MacUtil汉化一键安装.zip" className="!text-white !no-underline rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700">下载汉化包</a>
        <a href="https://macutil.com/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">前往 MacUtil 官网 ↗</a>
      </div>
      <p className="!mt-4 text-sm">非官方汉化资源，原软件由 MacUtil 官方提供。本包包含一键制作脚本、中文界面资源、本地翻译模块、源码与「先看说明.txt」，需要配合原版 MacUtil 使用。</p>
    </section>
    <section>
      <h2>安装与使用</h2>
      <ol className="list-decimal space-y-3 pl-6">
        <li>下载并完整解压汉化包，先阅读「先看说明.txt」。</li>
        <li>正常退出正在运行的 MacUtil，再运行「一键制作汉化.command」。</li>
        <li>打开桌面新生成的「MacUtil-汉化版-随机字符」文件夹，启动其中的「MacUtil-汉化版.app」。</li>
        <li>如需磁盘访问，在「系统设置 → 隐私与安全 → 完全磁盘访问权限」添加本次生成的应用，开启后退出并重新打开。</li>
      </ol>
      <p>脚本制作独立副本，不覆盖原软件。恢复使用时，退出汉化副本，再打开原安装位置的 MacUtil 即可。副本与原应用可能共用设置、授权和应用数据。</p>
    </section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <h2>汉化包说明</h2>
      <p>保留 Select All / Deselect All 等选择操作按钮的英文，其他界面提供中文翻译，动态内容可能仍有漏项。</p>
      <p>此前文件列表刷新及全选操作的闪退问题已解决，本包已包含全选兼容修正。</p>
      <p>汉化副本使用本地签名，并非官方公证版本。重新制作后可能需要重新授予磁盘访问权限。</p>
    </section>
    <section aria-labelledby="macutil-games">
      <h2 id="macutil-games">休息一下，玩个小游戏</h2>
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
