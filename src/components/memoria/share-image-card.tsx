import { shareCopy } from "@/lib/memoria/constants";
import { EnrichedAnniversaryItem, ShareLanguage, ShareTheme } from "@/types/memoria";

export function ShareImageCard({
  item,
  theme,
  language,
}: {
  item: EnrichedAnniversaryItem;
  theme: ShareTheme;
  language: ShareLanguage;
}) {
  const copy = shareCopy[language] ?? shareCopy.en;

  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${theme.card} p-5 text-white shadow-xl`}>
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/70">Memoria</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
              {item.icon}
            </div>
            <div>
              <div className="text-xl font-bold leading-tight">{item.title}</div>
              <div className="text-sm text-white/75">{item.date}</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-right backdrop-blur">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Next</div>
          <div className="text-2xl font-black">{item.daysLeft}d</div>
        </div>
      </div>
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
          <div className="text-[11px] uppercase tracking-[0.16em] text-white/60">Elapsed</div>
          <div className="mt-1 text-sm font-semibold leading-5">{item.elapsed}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
          <div className="text-[11px] uppercase tracking-[0.16em] text-white/60">Milestone</div>
          <div className="mt-1 text-sm font-semibold leading-5">{item.nextMilestone.label}</div>
        </div>
      </div>
      <div className="relative z-10 mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
        <div className="text-sm leading-6 text-white/90">{copy.caption(item)}</div>
        <div className="mt-3 flex gap-2 text-xs">
          {copy.hashtags.map((tag) => (
            <span key={tag} className={`rounded-full border px-3 py-1 ${theme.accent}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}