import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/memoria/logo";

type Props = {
  children: ReactNode;
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  withBottomPadding?: boolean;
};

export function AppShell({ children, title, onBack, right, withBottomPadding = true }: Props) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-gradient-to-b from-slate-50 via-gray-50 to-white text-slate-800 shadow-2xl">
      <div className="sticky top-0 z-20 border-b border-white/60 bg-white/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack ? (
              <button onClick={onBack} className="rounded-full p-2 transition hover:bg-slate-100">
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <Logo />
            )}
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
          {right}
        </div>
      </div>
      <div className={`px-4 pt-4 ${withBottomPadding ? "pb-28" : "pb-8"}`}>{children}</div>
    </div>
  );
}