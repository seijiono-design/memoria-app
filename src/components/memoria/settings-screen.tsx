import { Globe, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/memoria/app-shell";

export function SettingsScreen({
  setCurrent,
  onSignOut,
  categories,
  onReset,
}: {
  setCurrent: (screen: string) => void;
  onSignOut: () => void;
  categories: string[];
  onReset: () => void;
}) {
  return (
    <AppShell title="Settings">
      <div className="space-y-4">
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <div className="text-sm text-slate-500">Account</div>
              <div className="mt-1 font-semibold">Seiji Ohno</div>
              <div className="text-sm text-slate-500">Signed in with Google</div>
            </div>
            <Badge className="rounded-full bg-slate-100 text-slate-800 hover:bg-slate-100">Google</Badge>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <Globe className="h-5 w-5 text-slate-800" />
              <div className="font-semibold">Language</div>
            </div>
            <Tabs defaultValue="en">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                <TabsTrigger value="ja" className="rounded-2xl">
                  日本語
                </TabsTrigger>
                <TabsTrigger value="en" className="rounded-2xl">
                  English
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="space-y-4 p-5">
            <div className="font-semibold">Categories</div>
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
                <div className="font-medium">Default notification</div>
                <div className="text-sm text-slate-500">1 week before each event</div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Milestone notification</div>
                <div className="text-sm text-slate-500">3 days before 1000, 2000, 3000 days</div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Google Calendar</div>
                <div className="text-sm text-slate-500">Connected to seiji@example.com</div>
              </div>
              <Badge className="rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="space-y-3 p-5">
            <div className="font-semibold">Quick actions</div>
            <Button variant="outline" className="h-11 w-full rounded-2xl" onClick={() => setCurrent("home")}>
              Go to Home
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-2xl" onClick={onReset}>
              Reset sample data
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-2xl" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}