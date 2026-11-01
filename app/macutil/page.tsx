import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'MacUtil 汉化插件下载',
  description: 'MacUtil 2.0.9 汉化插件下载，包含一键制作脚本、源码和使用说明。支持 macOS 13 及以上版本。',
  alternates: { canonical: '/macutil' },
};

export default function MacUtilPage() {
  return <InfoPage title="MacUtil 汉化插件" intro="为 MacUtil 2.0.9 提供中文界面，安装脚本、汉化资源和源码一起打包。" backHref="/share" backLabel="返回好物分享">
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <span className="text-xs font-semibold tracking-widest text-blue-600">MACUTIL · 中文界面补丁</span>
      <h2 className="mt-3">下载汉化包</h2>
      <p>适用 MacUtil 2.0.9，需要 macOS 13 或更高版本，以及 Python 3.8 或更高版本。请先从官网下载并安装原版 MacUtil。</p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a href="/downloads/macutil-chinese-selection-test.zip" download="MacUtil汉化一键安装-全选兼容测试.zip" className="!text-white !no-underline rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700">下载汉化测试包</a>
        <a href="https://macutil.com/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">前往 MacUtil 官网 ↗</a>
      </div>
      <p className="!mt-4 text-sm">非官方汉化资源，原软件由 MacUtil 官方提供。本包包含源码与「先看说明.txt」。</p>
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
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h2>当前版本：全选兼容测试包</h2>
      <p>保留 Select All / Deselect All 等选择操作按钮的英文，其他界面提供中文翻译，动态内容可能仍有漏项。</p>
      <p>此前在文件列表刷新时发生过闪退；当前兼容修正尚未确认能彻底解决。请先测试选择和取消选择，无需执行清理来验证。</p>
      <p>汉化副本使用本地签名，并非官方公证版本。重新制作后可能需要重新授予磁盘访问权限。</p>
    </section>
  </InfoPage>;
}
