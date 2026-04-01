import { Pencil, Trash2, Bell, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/memoria/app-shell";
import { IconButton } from "@/components/memoria/icon-button";
import { ShareSheet } from "@/components/memoria/share-sheet";
import { EnrichedAnniversaryItem } from "@/types/memoria";
import { useLanguage } from "@/lib/memoria/language-context";

export function DetailScreen({
  setCurrent,
  item,
  onUpdate,
  onDelete,
}: {
  setCurrent: (screen: string) => void;
  item: EnrichedAnniversaryItem | null;
  onUpdate: (id: string, patch: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const { t } = useLanguage();
  if (!item) return null;

  return (
    <AppShell
      title={t.titles.detail}
      onBack={() => setCurrent("list")}
      right={
        <IconButton label="Edit anniversary" onClick={() => setCurrent("form")}>
          <Pencil className="h-5 w-5" />
        </IconButton>
      }
    >
      <Card className="rounded-3xl border-0 bg-white shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-3xl">
              {item.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{item.title}</div>
              <div className="text-sm text-slate-500">{item.date}</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-rose-50 p-4">
              <div className="text-sm text-slate-500">{t.detail.elapsed}</div>
              <div className="mt-2 text-lg font-bold leading-snug text-slate-900">{item.elapsed}</div>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4">
              <div className="text-sm text-slate-500">{t.detail.nextEvent}</div>
              <div className="mt-2 text-3xl font-black text-slate-800">{item.daysLeft}</div>
              <div className="text-sm text-slate-500">{t.detail.daysLeft}</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">{t.detail.yearProgress}</span>
              <span className="font-medium text-slate-800">72%</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-slate-500">{t.detail.nextMilestone}</div>
                <div className="mt-1 text-xl font-bold text-slate-900">{item.nextMilestone.label}</div>
              </div>
              <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">
                {t.detail.inDays} {item.nextMilestone.daysLeft} {t.detail.days}
              </Badge>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm text-slate-500">{t.detail.totalDays}</div>
              <Badge variant="secondary" className="rounded-full">
                {t.detail.milestone} {item.nextMilestone.day}
              </Badge>
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{item.totalDays.toLocaleString()}</div>
            <div className="mt-3 text-sm text-slate-600">{item.memo || t.detail.noMemo}</div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 space-y-3">
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-800" />
              <div>
                <div className="font-medium text-slate-900">{t.detail.weekAlert}</div>
                <div className="text-sm text-slate-500">{t.detail.weekAlertDesc}</div>
              </div>
            </div>
            <Switch checked={item.notifyWeekBefore} onCheckedChange={(value) => onUpdate(item.id, { notifyWeekBefore: value })} />
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-slate-800" />
              <div>
                <div className="font-medium text-slate-900">{t.detail.googleCalendar}</div>
                <div className="text-sm text-slate-500">{t.detail.googleCalendarDesc}</div>
              </div>
            </div>
            <Switch checked={item.googleCalendar} onCheckedChange={(value) => onUpdate(item.id, { googleCalendar: value })} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <ShareSheet item={item} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12 rounded-2xl" onClick={() => setCurrent("form")}>
          <Pencil className="mr-2 h-4 w-4" /> {t.detail.edit}
        </Button>
        <Button
          variant="destructive"
          className="h-12 rounded-2xl"
          onClick={() => {
            onDelete(item.id);
            setCurrent("list");
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" /> {t.detail.delete}
        </Button>
      </div>
    </AppShell>
  );
}
