import { Globe, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/memoria/app-shell";
import { useLanguage } from "@/lib/memoria/language-context";
import { Lang } from "@/lib/memoria/i18n";

export function SettingsScreen({
  setCurrent,
  onSignOut,
  categories,
  onReset,
  userName,
  calendarConnected,
}: {
  setCurrent: (screen: string) => void;
  onSignOut: () => void;
  categories: string[];
  onReset: () => void;
  userName?: string;
  calendarConnected?: boolean;
}) {
  const { lang, setLang, t } = useLanguage();

  return (
    <AppShell title={t.titles.settings}>
      <div className="space-y-4">
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <div className="text-sm text-slate-500">{t.settings.account}</div>
              <div className="mt-1 font-semibold text-slate-900">{userName || "Seiji Ohno"}</div>
              <div className="text-sm text-slate-500">{t.settings.signedIn}</div>
            </div>
            <Badge className="rounded-full bg-slate-100 text-slate-800 hover:bg-slate-100">Google</Badge>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <Globe className="h-5 w-5 text-slate-800" />
              <div className="font-semibold text-slate-900">{t.settings.language}</div>
            </div>
            <div className="flex rounded-2xl bg-slate-100 p-1 gap-1">
              {(["ja", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                    lang === l
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {l === "ja" ? "日本語" : "English"}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="space-y-4 p-5">
            <div className="font-semibold text-slate-900">{t.settings.categories}</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} className="rounded-full bg-slate-100 text-slate-800 hover:bg-slate-100">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.settings.defaultNotification}</div>
                <div className="text-sm text-slate-500">{t.settings.defaultNotificationDesc}</div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.settings.milestoneNotification}</div>
                <div className="text-sm text-slate-500">{t.settings.milestoneNotificationDesc}</div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.settings.googleCalendar}</div>
                <div className="text-sm text-slate-500">
                  {calendarConnected ? t.settings.connected : "Not connected"}
                </div>
              </div>
              {calendarConnected ? (
                <Badge className="rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
                  {t.settings.connected}
                </Badge>
              ) : (
                <Badge className="rounded-full bg-slate-100 text-slate-500 hover:bg-slate-100">
                  —
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="space-y-3 p-5">
            <div className="font-semibold text-slate-900">{t.settings.quickActions}</div>
            <Button variant="outline" className="h-11 w-full rounded-2xl" onClick={() => setCurrent("home")}>
              {t.settings.goToHome}
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-2xl" onClick={onReset}>
              {t.settings.resetData}
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-2xl" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> {t.settings.signOut}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
