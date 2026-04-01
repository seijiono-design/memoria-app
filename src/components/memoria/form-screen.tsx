import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AppShell } from "@/components/memoria/app-shell";
import { AnniversaryItem } from "@/types/memoria";
import { useLanguage } from "@/lib/memoria/language-context";

type DraftAnniversary = AnniversaryItem;

function createEmptyAnniversary(category: string): DraftAnniversary {
  return {
    id: "",
    icon: "🎉",
    title: "",
    titleJa: "",
    date: "",
    category,
    memo: "",
    recurring: true,
    notifyWeekBefore: true,
    notifyMilestoneBefore: true,
    googleCalendar: false,
  };
}

export function FormScreen({
  setCurrent,
  initialValue,
  onSave,
  allCategories,
}: {
  setCurrent: (screen: string) => void;
  initialValue: AnniversaryItem | null;
  onSave: (item: AnniversaryItem) => void;
  allCategories: string[];
}) {
  const { t } = useLanguage();
  const [form, setForm] = useState<DraftAnniversary>(() => initialValue || createEmptyAnniversary(allCategories[0] || "Birthday"));
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setForm(initialValue || createEmptyAnniversary(allCategories[0] || "Birthday"));
  }, [initialValue, allCategories]);

  const effectiveCategory = newCategory.trim() || form.category;

  const handleSubmit = () => {
    if (!form.title.trim() || !form.date) return;
    onSave({ ...form, category: effectiveCategory });
    setCurrent("list");
  };

  return (
    <AppShell
      title={initialValue ? t.titles.editAnniversary : t.titles.addAnniversary}
      onBack={() => setCurrent(initialValue ? "detail" : "list")}
    >
      <Card className="rounded-3xl border-0 shadow-md">
        <CardContent className="space-y-5 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t.form.emoji}</label>
              <Input
                value={form.icon}
                onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value || "🎉" }))}
                className="rounded-2xl bg-white text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t.form.date}</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                className="rounded-2xl bg-white text-slate-900"
                style={{ colorScheme: "light" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.form.nameEn}</label>
            <Input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder={t.form.namePlaceholderEn}
              className="rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.form.nameJa}</label>
            <Input
              value={form.titleJa ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, titleJa: e.target.value }))}
              placeholder={t.form.namePlaceholderJa}
              className="rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t.form.category}</label>
              <Input
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Birthday"
                className="rounded-2xl bg-white text-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t.form.newCategory}</label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Custom"
                className="rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, category }))}
                className={`rounded-full px-3 py-1.5 text-sm ${form.category === category ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.form.repeatYearly}</div>
                <div className="text-sm text-slate-500">{t.form.repeatYearlyDesc}</div>
              </div>
              <Switch checked={form.recurring} onCheckedChange={(value) => setForm((prev) => ({ ...prev, recurring: value }))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.form.weekAlert}</div>
                <div className="text-sm text-slate-500">{t.form.weekAlertDesc}</div>
              </div>
              <Switch checked={form.notifyWeekBefore} onCheckedChange={(value) => setForm((prev) => ({ ...prev, notifyWeekBefore: value }))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.form.milestoneAlert}</div>
                <div className="text-sm text-slate-500">{t.form.milestoneAlertDesc}</div>
              </div>
              <Switch checked={form.notifyMilestoneBefore} onCheckedChange={(value) => setForm((prev) => ({ ...prev, notifyMilestoneBefore: value }))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.form.googleCalendar}</div>
                <div className="text-sm text-slate-500">{t.form.googleCalendarDesc}</div>
              </div>
              <Switch checked={form.googleCalendar} onCheckedChange={(value) => setForm((prev) => ({ ...prev, googleCalendar: value }))} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.form.memo}</label>
            <textarea
              value={form.memo ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, memo: e.target.value }))}
              className="min-h-[96px] w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder={t.form.memoPlaceholder}
            />
          </div>

          <Button onClick={handleSubmit} className="h-12 w-full rounded-2xl bg-slate-800 hover:bg-slate-900">
            {initialValue ? t.form.updateAnniversary : t.form.addAnniversary}
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
