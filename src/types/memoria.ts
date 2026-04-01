export type AnniversaryItem = {
  id: string;
  icon: string;
  title: string;
  titleJa?: string;
  date: string;
  category: string;
  memo?: string;
  recurring: boolean;
  notifyWeekBefore: boolean;
  notifyMilestoneBefore: boolean;
  googleCalendar: boolean;
  calendarEventId?: string;
};

export type MilestoneInfo = {
  day: number;
  daysLeft: number;
  label: string;
};

export type EnrichedAnniversaryItem = AnniversaryItem & {
  totalDays: number;
  elapsed: string;
  daysLeft: number;
  nextRecurringDate: Date;
  nextMilestone: MilestoneInfo;
};

export type ShareLanguage = "ja" | "en";

export type ShareTheme = {
  id: string;
  label: string;
  card: string;
  accent: string;
};