/**
 * Local calendar-date helpers.
 *
 * Streak boundaries follow the learner's local calendar day, so dates are
 * formatted as `YYYY-MM-DD` in local time. The reference date is injectable to
 * keep callers testable.
 *
 * @module domain/progress/dates
 */

/**
 * Formats a date as a local `YYYY-MM-DD` string.
 *
 * @param date - The date to format; defaults to now.
 * @returns The local calendar date as `YYYY-MM-DD`.
 */
export function localDateIso(date: Date = new Date()): string {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
