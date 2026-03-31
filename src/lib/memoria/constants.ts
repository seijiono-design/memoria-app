import { AnniversaryItem, EnrichedAnniversaryItem } from "@/types/memoria";

export const STORAGE_KEY = "memoria-app-state-v1";

export const initialAnniversaries: AnniversaryItem[] = [
  {
    id: "1",
    icon: "🎂",
    title: "Mom's Birthday",
    titleJa: "母の誕生日",
    date: "2026-04-04",
    category: "Birthday",
    memo: "Buy flowers and cake.",
    recurring: true,
    notifyWeekBefore: true,
    notifyMilestoneBefore: true,
    googleCalendar: true,
  },
  {
    id: "2",
    icon: "💍",
    title: "Wedding Anniversary",
    titleJa: "結婚記念日",
    date: "2026-04-10",
    category: "Anniversary",
    memo: "Reserve dinner at the favorite restaurant.",
    recurring: true,
    notifyWeekBefore: true,
    notifyMilestoneBefore: true,
    googleCalendar: true,
  },
  {
    id: "3",
    icon: "🎉",
    title: "First Date",
    titleJa: "初デート",
    date: "2026-05-01",
    category: "Relationship",
    memo: "Create a photo album.",
    recurring: true,
    notifyWeekBefore: true,
    notifyMilestoneBefore: true,
    googleCalendar: false,
  },
  {
    id: "4",
    icon: "💼",
    title: "Joined Company",
    titleJa: "入社日",
    date: "2026-06-01",
    category: "Work",
    memo: "Reflect on yearly growth.",
    recurring: true,
    notifyWeekBefore: false,
    notifyMilestoneBefore: true,
    googleCalendar: false,
  },
];

export const defaultCategories = ["Birthday", "Anniversary", "Relationship", "Work"];

export const SPECIAL_MILESTONE_DAYS = [
  100, 111, 200, 222, 300, 333, 365, 500, 777, 1000, 1234, 1500, 2000, 2500, 3000, 5000,
  10000,
];

export const shareThemes = [
  {
    id: "midnight",
    label: "Midnight",
    card: "from-slate-900 via-slate-800 to-slate-700",
    accent: "bg-white/15 text-white border-white/20",
  },
  {
    id: "stone",
    label: "Stone",
    card: "from-stone-800 via-stone-700 to-amber-700",
    accent: "bg-white/15 text-white border-white/20",
  },
  {
    id: "ocean",
    label: "Ocean",
    card: "from-sky-900 via-cyan-800 to-teal-700",
    accent: "bg-white/15 text-white border-white/20",
  },
] as const;

export const shareCopy = {
  ja: {
    label: "日本語",
    shareTitle: "この記念日をシェア",
    shareDescription: "SNSやメッセージで大切な日を共有できます。",
    previewTitle: "投稿プレビュー",
    generateImage: "PNGを生成",
    saveTemplate: "テンプレート保存",
    copied: "リンクをコピーしました",
    nativeShare: "システム共有",
    pngExported: "PNGを書き出しました",
    pngExportFailed: "PNGの書き出しに失敗しました",
    shareSuccess: "シェアしました",
    shareFallback: "共有文をコピーしました",
    shareUnavailable: "この環境では共有できません",
    xLabel: "X / Twitter",
    instagramLabel: "Instagram",
    lineLabel: "LINE / Message",
    copyLinkLabel: "リンクをコピー",
    hashtags: ["#Memoria", "#記念日"],
    caption: (item: EnrichedAnniversaryItem) =>
      `${item.icon} ${item.title} まであと${item.daysLeft}日。次のキリ番は${item.nextMilestone.label}。`,
    xText: (item: EnrichedAnniversaryItem) =>
      `${item.icon} ${item.title} まであと${item.daysLeft}日。Memoriaで大切な日を忘れずに。`,
    instagramText: (item: EnrichedAnniversaryItem) =>
      `${item.title} まであと${item.daysLeft}日。思い出をMemoriaで残そう。`,
    lineText: (item: EnrichedAnniversaryItem) => `リマインド: ${item.title} はあと${item.daysLeft}日です。`,
  },
  en: {
    label: "English",
    shareTitle: "Share this anniversary",
    shareDescription: "Celebrate or remind others on social apps.",
    previewTitle: "Preview caption",
    generateImage: "Generate PNG",
    saveTemplate: "Save Template",
    copied: "Link copied",
    nativeShare: "System Share",
    pngExported: "PNG exported",
    pngExportFailed: "PNG export failed",
    shareSuccess: "Shared successfully",
    shareFallback: "Share text copied",
    shareUnavailable: "Sharing is not available here",
    xLabel: "X / Twitter",
    instagramLabel: "Instagram",
    lineLabel: "LINE / Message",
    copyLinkLabel: "Copy Link",
    hashtags: ["#Memoria", "#SpecialDay"],
    caption: (item: EnrichedAnniversaryItem) =>
      `${item.icon} ${item.title} is coming up in ${item.daysLeft} days. Next milestone: ${item.nextMilestone.label}.`,
    xText: (item: EnrichedAnniversaryItem) =>
      `Celebrating ${item.title} in ${item.daysLeft} days with Memoria.`,
    instagramText: (item: EnrichedAnniversaryItem) =>
      `${item.title} is coming up in ${item.daysLeft} days. Save the moment with Memoria.`,
    lineText: (item: EnrichedAnniversaryItem) => `Reminder: ${item.title} is in ${item.daysLeft} days.`,
  },
} as const;