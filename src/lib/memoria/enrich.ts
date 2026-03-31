import { diffInDays, formatElapsed, getNextMilestone, getNextRecurringDate } from "@/lib/memoria/date-utils";
import { AnniversaryItem, EnrichedAnniversaryItem } from "@/types/memoria";

export function enrichAnniversary(item: AnniversaryItem, today = new Date()): EnrichedAnniversaryItem {
  const originalDate = new Date(item.date);
  const totalDays = diffInDays(originalDate, today);
  const nextRecurringDate = getNextRecurringDate(item.date, today);
  const daysLeft = diffInDays(today, nextRecurringDate);
  const nextMilestone = getNextMilestone(totalDays);

  return {
    ...item,
    totalDays,
    elapsed: formatElapsed(item.date, today),
    daysLeft,
    nextRecurringDate,
    nextMilestone,
  };
}

export function enrichAnniversaries(items: AnniversaryItem[]) {
  return items.map((item) => enrichAnniversary(item)).sort((a, b) => a.daysLeft - b.daysLeft);
}