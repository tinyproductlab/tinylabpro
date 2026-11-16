import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { ShareGames } from '@/components/share-games';

export const metadata: Metadata = {
  title: '网页铃声剪辑工具源码与说明',
  description: '在浏览器本地剪辑铃声、转换格式、拼接音频、变速变调或从视频提取音轨。这里提供工具介绍与源码包。',
  alternates: { canonical: '/ringtone' },
};

const card = 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8';

export default function RingtoneSharePage() {
  return <InfoPage title="网页铃声剪辑工具" intro="一个打开网页就能使用的音频工具箱。剪辑铃声、转换格式、拼接片段、调整速度和音调，或从视频提取音轨。" backHref="/share" backLabel="返回好物分享">
    <section className={card}>
      <span className="text-xs font-semibold tracking-widest text-rose-700">RINGTONE TOOL · 浏览器本地处理</span>
      <h2 className="mt-3">打开工具</h2>
      <p>选择设备中的音频或视频文件，处理完成后试听并下载结果。音频不上传到服务器。</p>
      <a href="https://ringtone.tinylabpro.com/" className="!text-white !no-underline mt-4 inline-flex rounded-xl bg-rose-700 px-5 py-3 font-semibold hover:bg-rose-800">立即剪辑铃声 ↗</a>
    </section>
    <section className={card}>
      <h2>源码与部署包</h2>
      <p>源码位于 GitHub 仓库的 <code>apps/ringtone-tool</code> 目录，包含网页、项目说明和原始源码包。</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href="https://ringtone.tinylabpro.com/source.zip" download className="!text-white !no-underline rounded-xl bg-slate-900 px-5 py-3 font-semibold hover:bg-slate-700">下载源码包</a>
        <a href="https://github.com/tinyproductlab/tinylabpro/tree/codex/ringtone-tool/apps/ringtone-tool" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">查看 GitHub 源码 ↗</a>
      </div>
      <p className="!mt-4 text-sm text-slate-500">源码随附说明写明可自由修改自用。转载或公开分发前，请以包内说明和源码中第三方组件各自的许可为准。</p>
    </section>
    <section className={card}>
      <h2>隐私与使用范围</h2>
      <ul className="list-disc space-y-3 pl-5">
        <li>页面使用浏览器本地能力处理你选中的文件，不会为处理音频而上传文件。</li>
        <li>页面不含统计、广告或追踪代码。</li>
        <li>请只处理你拥有合法使用或编辑权限的音频与视频。发布或传播导出内容前，也要确认相应权利。</li>
      </ul>
    </section>
    <ShareGames />
  </InfoPage>;
}
