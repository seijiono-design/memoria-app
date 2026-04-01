import { UserCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/memoria/app-shell";
import { Logo } from "@/components/memoria/logo";
import { useLanguage } from "@/lib/memoria/language-context";
import { Lang } from "@/lib/memoria/i18n";

export function AuthScreen({ onContinue }: { onContinue: () => void }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <AppShell title={t.titles.welcome} withBottomPadding={false}>
      {/* Language selector */}
      <div className="flex justify-end mb-2">
        <div className="flex rounded-full bg-slate-100 p-1 gap-1">
          {(["ja", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                lang === l
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {l === "ja" ? "日本語" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-10rem)] items-center">
        <Card className="w-full rounded-[32px] border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="mb-8 flex justify-center">
              <div className="scale-125">
                <Logo />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{t.auth.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{t.auth.subtitle}</p>
            </div>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-3">
                <UserCircle2 className="h-5 w-5 text-slate-700" />
                <div className="text-sm font-medium text-slate-700">{t.auth.whyGoogle}</div>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <div>• {t.auth.benefit1}</div>
                <div>• {t.auth.benefit2}</div>
                <div>• {t.auth.benefit3}</div>
              </div>
            </div>
            <Button
              onClick={onContinue}
              className="mt-6 h-12 w-full rounded-2xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-bold text-slate-700 ring-1 ring-slate-200">
                G
              </span>
              {t.auth.continueWithGoogle}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
