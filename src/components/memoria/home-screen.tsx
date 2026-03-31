import { Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IconButton } from "@/components/memoria/icon-button";
import { AppShell } from "@/components/memoria/app-shell";
import { EnrichedAnniversaryItem } from "@/types/memoria";

export function HomeScreen({
  setCurrent,
  anniversaries,
  onOpenDetail,
}: {
  setCurrent: (screen: string) => void;
  anniversaries: EnrichedAnniversaryItem[];
  onOpenDetail: (id: string) => void;
}) {
  const nextAnniversary = anniversaries[0];
  const nextMilestoneItem = [...anniversaries].sort(
    (a, b) => a.nextMilestone.daysLeft - b.nextMilestone.daysLeft
  )[0];

  return (
    <AppShell
      title="Home"
      right={
        <IconButton label="Open settings" onClick={() => setCurrent("settings")}>
          <Settings className="h-5 w-5" />
        </IconButton>
      }
    >
      {nextAnniversary ? (
        <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-xl">
          <CardContent className="p-5">
            <div className="text-sm opacity-90">Next anniversary</div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-bold">
                  {nextAnniversary.icon} {nextAnniversary.title}
                </div>
                <div className="mt-2 text-4xl font-black">{nextAnniversary.daysLeft} days</div>
                <div className="mt-1 text-sm opacity-90">{nextAnniversary.date}</div>
              </div>
              <div className="rounded-2xl bg-white/20 px-3 py-2 text-center text-sm backdrop-blur">
                <div>Milestone</div>
                <div className="font-bold">{nextAnniversary.nextMilestone.label}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-8 text-center text-slate-500">
            No anniversaries yet. Add your first one.
          </CardContent>
        </Card>
      )}

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-4">
            <div className="text-sm text-slate-500">Saved</div>
            <div className="mt-2 text-2xl font-bold">{anniversaries.length}</div>
            <div className="text-sm text-slate-500">events</div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-4">
            <div className="text-sm text-slate-500">Milestone</div>
            <div className="mt-2 text-lg font-bold">
              {nextMilestoneItem ? nextMilestoneItem.nextMilestone.label : "-"}
            </div>
            <div className="text-sm text-slate-500">
              {nextMilestoneItem ? `in ${nextMilestoneItem.nextMilestone.daysLeft} days` : "-"}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-4">
            <div className="text-sm text-slate-500">Synced</div>
            <div className="mt-2 text-2xl font-bold">
              {anniversaries.filter((a) => a.googleCalendar).length}
            </div>
            <div className="text-sm text-slate-500">calendar</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Upcoming</h2>
        <button onClick={() => setCurrent("list")} className="text-sm font-medium text-slate-800">
          View all
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {anniversaries.slice(0, 3).map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer rounded-3xl border-0 shadow-md transition hover:-translate-y-0.5"
            onClick={() => onOpenDetail(item.id)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-2xl">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-slate-500">{item.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800">{item.daysLeft} days</div>
                <div className="text-sm text-slate-500">left</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}