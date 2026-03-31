import { SPECIAL_MILESTONE_DAYS } from "@/lib/memoria/constants";
import { MilestoneInfo } from "@/types/memoria";

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function diffInDays(from: Date, to: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / msPerDay);
}

export function getElapsedParts(fromDateString: string, today = new Date()) {
  const from = new Date(fromDateString);
  let years = today.getFullYear() - from.getFullYear();
  let months = today.getMonth() - from.getMonth();
  let days = today.getDate() - from.getDate();

  if (days < 0) {
    const previousMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonthDate.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

export function formatElapsed(fromDateString: string, today = new Date()) {
  const { years, months, days } = getElapsedParts(fromDateString, today);
  return `${years} years ${months} months ${days} days`;
}

export function getNextRecurringDate(fromDateString: string, today = new Date()) {
  const source = new Date(fromDateString);
  const currentYear = today.getFullYear();
  let next = new Date(currentYear, source.getMonth(), source.getDate());

  if (next < startOfDay(today)) {
    next = new Date(currentYear + 1, source.getMonth(), source.getDate());
  }

  return next;
}

export function getMilestoneLabel(dayCount: number) {
  if (dayCount === 365) return "1 Year";
  if (dayCount === 1000) return "1000 Days";
  if (dayCount === 10000) return "10000 Days";
  return `${dayCount} Days`;
}

export function getNextMilestone(totalDays: number): MilestoneInfo {
  const next =
    SPECIAL_MILESTONE_DAYS.find((day) => day > totalDays) ??
    SPECIAL_MILESTONE_DAYS[SPECIAL_MILESTONE_DAYS.length - 1];

  return {
    day: next,
    daysLeft: Math.max(next - totalDays, 0),
    label: getMilestoneLabel(next),
  };
}