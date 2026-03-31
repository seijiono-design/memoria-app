import { CalendarDays, Heart } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow">
        <CalendarDays className="h-5 w-5 opacity-90" />
        <Heart className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-white/90" />
      </div>
      <span className="font-semibold tracking-wide text-slate-800">Memoria</span>
    </div>
  );
}