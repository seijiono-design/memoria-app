"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { HomeScreen } from "@/components/memoria/home-screen";
import { ListScreen } from "@/components/memoria/list-screen";
import { DetailScreen } from "@/components/memoria/detail-screen";
import { FormScreen } from "@/components/memoria/form-screen";
import { SettingsScreen } from "@/components/memoria/settings-screen";
import { BottomNav } from "@/components/memoria/bottom-nav";
import { defaultCategories, initialAnniversaries } from "@/lib/memoria/constants";
import { enrichAnniversaries } from "@/lib/memoria/enrich";
import { loadAppState, saveAppState } from "@/lib/memoria/storage";
import { supabase } from "@/lib/supabase";
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/google-calendar";
import { AnniversaryItem } from "@/types/memoria";

export default function ProtectedPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [providerToken, setProviderToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [current, setCurrent] = useState("home");
  const [selectedId, setSelectedId] = useState("2");
  const [anniversaries, setAnniversaries] = useState(initialAnniversaries);
  const [categories, setCategories] = useState(defaultCategories);

  // ── Auth: load session on mount ──────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!s) {
        router.replace("/login");
        return;
      }
      setSession(s);
      setProviderToken(s.provider_token ?? null);
      setAuthReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!s) {
        router.replace("/login");
        return;
      }
      setSession(s);
      setProviderToken(s.provider_token ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  // ── Persist app state ────────────────────────────────────────────────────
  useEffect(() => {
    if (!authReady) return;
    const saved = loadAppState();
    if (!saved) return;
    if (saved.anniversaries) setAnniversaries(saved.anniversaries);
    if (saved.categories) setCategories(saved.categories);
  }, [authReady]);

  useEffect(() => {
    if (!authReady) return;
    saveAppState({ anniversaries, categories });
  }, [anniversaries, categories, authReady]);

  // ── Derived data ─────────────────────────────────────────────────────────
  const enrichedAnniversaries = useMemo(
    () => enrichAnniversaries(anniversaries),
    [anniversaries]
  );
  const selectedItem =
    enrichedAnniversaries.find((item) => item.id === selectedId) ||
    enrichedAnniversaries[0] ||
    null;
  const selectedRawItem = anniversaries.find((item) => item.id === selectedId) || null;

  // ── Save (create / update) ───────────────────────────────────────────────
  const handleSave = async (item: AnniversaryItem) => {
    const nextId = item.id || String(Date.now());
    let nextItem: AnniversaryItem = { ...item, id: nextId };

    // Google Calendar sync — wrapped in try-catch so a failed sync
    // never prevents the anniversary from being saved locally.
    if (providerToken) {
      try {
        const existing = anniversaries.find((a) => a.id === nextId);

        if (nextItem.googleCalendar) {
          if (existing?.calendarEventId) {
            // Update existing calendar event
            await updateCalendarEvent(providerToken, existing.calendarEventId, nextItem);
            nextItem = { ...nextItem, calendarEventId: existing.calendarEventId };
          } else {
            // Create new calendar event
            const eventId = await createCalendarEvent(providerToken, nextItem);
            if (eventId) nextItem = { ...nextItem, calendarEventId: eventId };
          }
        } else if (existing?.calendarEventId) {
          // googleCalendar was turned off — delete the event
          await deleteCalendarEvent(providerToken, existing.calendarEventId);
          nextItem = { ...nextItem, calendarEventId: undefined };
        }
      } catch (calendarError) {
        console.error("Calendar sync failed, saving locally:", calendarError);
      }
    }

    setAnniversaries((prev) => {
      const exists = prev.some((a) => a.id === nextId);
      if (exists) return prev.map((a) => (a.id === nextId ? nextItem : a));
      return [nextItem, ...prev];
    });

    if (nextItem.category && !categories.includes(nextItem.category)) {
      setCategories((prev) => [...prev, nextItem.category]);
    }

    setSelectedId(nextId);
  };

  // ── In-place toggle update (from detail screen) ──────────────────────────
  const handleUpdate = async (id: string, patch: Record<string, unknown>) => {
    const existing = anniversaries.find((a) => a.id === id);
    if (!existing) return;

    let finalPatch = { ...patch };

    // Handle googleCalendar toggle in-place — wrapped in try-catch so a
    // failed sync never prevents the local update from being applied.
    if ("googleCalendar" in patch && providerToken) {
      try {
        const mergedItem = { ...existing, ...patch } as AnniversaryItem;

        if (patch.googleCalendar === true) {
          const eventId = await createCalendarEvent(providerToken, mergedItem);
          if (eventId) finalPatch = { ...finalPatch, calendarEventId: eventId };
        } else if (patch.googleCalendar === false && existing.calendarEventId) {
          await deleteCalendarEvent(providerToken, existing.calendarEventId);
          finalPatch = { ...finalPatch, calendarEventId: undefined };
        }
      } catch (calendarError) {
        console.error("Calendar sync failed, updating locally:", calendarError);
      }
    }

    setAnniversaries((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...finalPatch } : a))
    );
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const existing = anniversaries.find((a) => a.id === id);

    if (providerToken && existing?.calendarEventId) {
      try {
        await deleteCalendarEvent(providerToken, existing.calendarEventId);
      } catch (calendarError) {
        console.error("Calendar event deletion failed:", calendarError);
      }
    }

    setAnniversaries((prev) => prev.filter((a) => a.id !== id));
    setSelectedId((prev) => (prev === id ? "" : prev));
  };

  // ── Reset ────────────────────────────────────────────────────────────────
  // "Reset sample data" clears ALL anniversaries so the user starts fresh.
  const handleReset = () => {
    setAnniversaries([]);
    setSelectedId("");
    setCurrent("home");
  };

  // ── Sign out ─────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const openDetail = (id: string) => {
    setSelectedId(id);
    setCurrent("detail");
  };

  // Show nothing while we verify auth (avoids flash of content)
  if (!authReady) return null;

  const userName = session?.user?.user_metadata?.full_name ?? session?.user?.email ?? "User";

  return (
    <div className="min-h-screen bg-slate-200 py-6">
      {current === "home" && (
        <HomeScreen
          setCurrent={setCurrent}
          anniversaries={enrichedAnniversaries}
          onOpenDetail={openDetail}
        />
      )}

      {current === "list" && (
        <ListScreen anniversaries={enrichedAnniversaries} onOpenDetail={openDetail} />
      )}

      {current === "detail" && (
        <DetailScreen
          setCurrent={setCurrent}
          item={selectedItem}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      {current === "form" && (
        <FormScreen
          setCurrent={setCurrent}
          initialValue={selectedRawItem}
          onSave={handleSave}
          allCategories={categories}
        />
      )}

      {current === "settings" && (
        <SettingsScreen
          setCurrent={setCurrent}
          onSignOut={handleSignOut}
          categories={categories}
          onReset={handleReset}
          userName={userName}
          calendarConnected={!!providerToken}
        />
      )}

      <BottomNav
        current={current === "detail" ? "list" : current}
        setCurrent={(screen) => {
          if (screen === "form") setSelectedId("");
          setCurrent(screen);
        }}
      />
    </div>
  );
}
