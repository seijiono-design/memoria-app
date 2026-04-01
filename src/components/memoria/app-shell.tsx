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
    <div
      className="mx-auto min-h-screen max-w-md shadow-2xl"
      style={{
        background: "linear-gradient(to bottom, #f8fafc, #f1f5f9, #ffffff)",
        color: "#1e293b",
        colorScheme: "light",
      }}
    >
      <div
        className="sticky top-0 z-20 border-b px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "rgba(226,232,240,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack ? (
              <button
                onClick={onBack}
                className="rounded-full p-2 transition hover:bg-slate-100"
                style={{ color: "#1e293b" }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <Logo />
            )}
            <h1 className="text-lg font-bold" style={{ color: "#0f172a" }}>
              {title}
            </h1>
          </div>
          {right}
        </div>
      </div>
      <div className={`px-4 pt-4 ${withBottomPadding ? "pb-28" : "pb-8"}`}>{children}</div>
    </div>
  );
}
