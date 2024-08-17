import { format, isToday } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export function formatDate(timestamp: string) {
  return formatInTimeZone(
    new Date(timestamp),
    "Asia/Jakarta",
    "dd/MM/yyyy HH:mm"
  );
}

export function formatDateWithDayName(date: Date): string {
  if (isToday(date)) {
    return `Today ${format(date, "MMMM d, yyyy")}`;
  } else {
    return `${format(date, "EEEE MMMM d, yyyy")}`;
  }
}
