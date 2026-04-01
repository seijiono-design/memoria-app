import { AnniversaryItem } from "@/types/memoria";

const CALENDAR_API = "https://www.googleapis.com/calendar/v3";

function buildEventBody(anniversary: AnniversaryItem) {
  const title = anniversary.titleJa || anniversary.title;

  return {
    summary: `${anniversary.icon} ${title}`,
    description: anniversary.memo || "",
    start: { date: anniversary.date },
    end: { date: anniversary.date },
    recurrence: anniversary.recurring ? ["RRULE:FREQ=YEARLY"] : undefined,
    reminders: {
      useDefault: false,
      overrides: anniversary.notifyWeekBefore
        ? [{ method: "popup", minutes: 10080 }] // 7 days before
        : [],
    },
  };
}

export async function createCalendarEvent(
  providerToken: string,
  anniversary: AnniversaryItem
): Promise<string | null> {
  try {
    const res = await fetch(`${CALENDAR_API}/calendars/primary/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildEventBody(anniversary)),
    });

    if (!res.ok) {
      console.error("createCalendarEvent failed:", res.status, await res.text());
      return null;
    }

    const event = await res.json();
    return event.id as string;
  } catch (err) {
    console.error("createCalendarEvent error:", err);
    return null;
  }
}

export async function updateCalendarEvent(
  providerToken: string,
  eventId: string,
  anniversary: AnniversaryItem
): Promise<boolean> {
  try {
    const res = await fetch(`${CALENDAR_API}/calendars/primary/events/${eventId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${providerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildEventBody(anniversary)),
    });

    return res.ok;
  } catch (err) {
    console.error("updateCalendarEvent error:", err);
    return false;
  }
}

export async function deleteCalendarEvent(
  providerToken: string,
  eventId: string
): Promise<boolean> {
  try {
    const res = await fetch(`${CALENDAR_API}/calendars/primary/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
    });

    return res.ok || res.status === 410; // 410 = already deleted
  } catch (err) {
    console.error("deleteCalendarEvent error:", err);
    return false;
  }
}
