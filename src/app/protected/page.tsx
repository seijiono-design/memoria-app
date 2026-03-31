"use client";

import { useEffect, useMemo, useState } from "react";
import { HomeScreen } from "@/components/memoria/home-screen";
import { ListScreen } from "@/components/memoria/list-screen";
import { DetailScreen } from "@/components/memoria/detail-screen";
import { FormScreen } from "@/components/memoria/form-screen";
import { SettingsScreen } from "@/components/memoria/settings-screen";
import { BottomNav } from "@/components/memoria/bottom-nav";
import { defaultCategories, initialAnniversaries } from "@/lib/memoria/constants";
import { enrichAnniversaries } from "@/lib/memoria/enrich";
import { loadAppState, saveAppState } from "@/lib/memoria/storage";
import { AnniversaryItem } from "@/types/memoria";

export default function ProtectedPage() {
  const [current, setCurrent] = useState("home");
  const [selectedId, setSelectedId] = useState("2");
  const [anniversaries, setAnniversaries] = useState(initialAnniversaries);
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    const saved = loadAppState();
    if (!saved) return;
    if (saved.anniversaries) setAnniversaries(saved.anniversaries);
    if (saved.categories) setCategories(saved.categories);
  }, []);

  useEffect(() => {
    saveAppState({ anniversaries, categories });
  }, [anniversaries, categories]);

  const enrichedAnniversaries = useMemo(() => enrichAnniversaries(anniversaries), [anniversaries]);
  const selectedItem = enrichedAnniversaries.find((item) => item.id === selectedId) || enrichedAnniversaries[0] || null;
  const selectedRawItem = anniversaries.find((item) => item.id === selectedId) || null;

  const handleSave = (item: AnniversaryItem) => {
    const nextId = item.id || String(Date.now());
    const nextItem = { ...item, id: nextId };

    setAnniversaries((prev) => {
      const exists = prev.some((entry) => entry.id === nextId);
      if (exists) return prev.map((entry) => (entry.id === nextId ? nextItem : entry));
      return [nextItem, ...prev];
    });

    if (nextItem.category && !categories.includes(nextItem.category)) {
      setCategories((prev) => [...prev, nextItem.category]);
    }

    setSelectedId(nextId);
  };

  const handleUpdate = (id: string, patch: Record<string, unknown>) => {
    setAnniversaries((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const handleDelete = (id: string) => {
    setAnniversaries((prev) => prev.filter((item) => item.id !== id));
    setSelectedId((prev) => (prev === id ? "" : prev));
  };

  const handleReset = () => {
    setAnniversaries(initialAnniversaries);
    setCategories(defaultCategories);
    setSelectedId("2");
    setCurrent("home");
  };

  const openDetail = (id: string) => {
    setSelectedId(id);
    setCurrent("detail");
  };

  return (
    <div className="min-h-screen bg-slate-200 py-6">
      {current === "home" && (
        <HomeScreen setCurrent={setCurrent} anniversaries={enrichedAnniversaries} onOpenDetail={openDetail} />
      )}

      {current === "list" && <ListScreen anniversaries={enrichedAnniversaries} onOpenDetail={openDetail} />}

      {current === "detail" && (
        <DetailScreen setCurrent={setCurrent} item={selectedItem} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}

      {current === "form" && (
        <FormScreen setCurrent={setCurrent} initialValue={selectedRawItem} onSave={handleSave} allCategories={categories} />
      )}

      {current === "settings" && (
        <SettingsScreen
          setCurrent={setCurrent}
          onSignOut={() => {
            window.location.href = "/login";
          }}
          categories={categories}
          onReset={handleReset}
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