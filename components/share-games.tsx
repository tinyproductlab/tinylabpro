import { tools } from '@/lib/tool-catalog';

const games = tools.filter(tool => ['qigugu', 'numgugu', 'catbox'].includes(tool.slug));

export function ShareGames() {
  return <section aria-labelledby="share-games-title" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold tracking-[.16em] text-emerald-700">TINYPRODUCTLAB · GAMES</p>
        <h2 id="share-games-title" className="!mt-2 !text-2xl !font-bold">看完了，玩个小游戏</h2>
      </div>
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">3 款轻松体验</span>
    </div>
    <p className="!mt-3">小产品实验室出品，挑一个喜欢的玩法，休息一下。</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {games.map(game => <a key={game.slug} href={game.href} target="_blank" rel="noopener noreferrer" className="!text-inherit !no-underline group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-emerald-400 hover:bg-emerald-50/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
        <div className="flex items-center gap-3">
          <img src={game.logo} alt="" width={48} height={48} loading="lazy" className="size-12 shrink-0 rounded-xl object-cover" />
          <h3 className="!m-0 text-base font-bold">{game.title}</h3>
        </div>
        <p className="!mt-3 text-sm !leading-6">{game.description}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">去玩一下 ↗</span>
      </a>)}
    </div>
  </section>;
}
