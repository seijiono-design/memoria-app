import { UserCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/memoria/app-shell";
import { Logo } from "@/components/memoria/logo";

export function AuthScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <AppShell title="Welcome" withBottomPadding={false}>
      <div className="flex min-h-[calc(100vh-8rem)] items-center">
        <Card className="w-full rounded-[32px] border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="mb-8 flex justify-center">
              <div className="scale-125">
                <Logo />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Welcome to Memoria</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in with your Google account to save anniversaries, sync Google Calendar,
                and keep reminders across devices.
              </p>
            </div>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-3">
                <UserCircle2 className="h-5 w-5 text-slate-700" />
                <div className="text-sm font-medium text-slate-700">Why Google sign-in?</div>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <div>• Quick account creation with one tap</div>
                <div>• Secure sign-in without a separate password</div>
                <div>• Easy Google Calendar connection</div>
              </div>
            </div>
            <Button
              onClick={onContinue}
              className="mt-6 h-12 w-full rounded-2xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-bold text-slate-700 ring-1 ring-slate-200">
                G
              </span>
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}