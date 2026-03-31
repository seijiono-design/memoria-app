import { useMemo, useState } from "react";
import { Search, ChevronRight, Gift, Briefcase, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/memoria/app-shell";
import { EnrichedAnniversaryItem } from "@/types/memoria";

export function ListScreen({
  anniversaries,
  onOpenDetail,
}: {
  anniversaries: EnrichedAnniversaryItem[];
  onOpenDetail: (id: string) => void;
}) {
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const dynamic = [...new Set(anniversaries.map((a) => a.category).filter(Boolean))];
    return [
      { id: 1, label: "All", icon: Star },
      ...dynamic.map((label, index) => ({
        id: index + 2,
        label,
        icon: index % 2 === 0 ? Gift : Briefcase,
      })),
    ];
  }, [anniversaries]);

  const filtered = useMemo(() => {
    return anniversaries.filter((a) => {
      const categoryOk = selected === "All" || a.category === selected;
      const queryOk =
        !query || `${a.title} ${a.titleJa || ""} ${a.category || ""}`.toLowerCase().includes(query.toLowerCase());
      return categoryOk && queryOk;
    });
  }, [anniversaries, query, selected]);

  return (
    <AppShell title="All Anniversaries">
      <div className="relative">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anniversaries"
          className="rounded-2xl border-0 bg-white pl-9 shadow-sm"
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = selected === cat.label;
          return (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.label)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium ${
                active ? "bg-slate-900 text-white" : "bg-white text-slate-600 shadow-sm"
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((item) => (
          <Card key={item.id} onClick={() => onOpenDetail(item.id)} className="cursor-pointer rounded-3xl border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.date}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="rounded-full bg-slate-100 text-slate-800 hover:bg-slate-100">
                        {item.category}
                      </Badge>
                      {item.notifyWeekBefore ? (
                        <Badge variant="secondary" className="rounded-full">
                          1 week alert
                        </Badge>
                      ) : null}
                      <Badge variant="secondary" className="rounded-full">
                        {item.nextMilestone.label}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  {item.daysLeft}d
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}