import { Home, List, Plus, Settings } from "lucide-react";
import { useLanguage } from "@/lib/memoria/language-context";

export function BottomNav({ current, setCurrent }: { current: string; setCurrent: (key: string) => void }) {
  const { t } = useLanguage();

  const items = [
    { key: "home", label: t.nav.home, icon: Home },
    { key: "list", label: t.nav.list, icon: List },
    { key: "form", label: t.nav.add, icon: Plus },
    { key: "settings", label: t.nav.settings, icon: Settings },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-3xl border bg-white p-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-2">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setCurrent(key)}
            className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
              current === key ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
