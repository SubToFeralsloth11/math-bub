interface StreakPopoverProps {
  /** The current streak count. */
  streakCount: number;
  /** Seven booleans for the last 7 days (index 6 = today). */
  activeDays: boolean[];
  /** The contextual message string. */
  message: string;
}

/** Abbreviated day labels for the 7-day strip. */
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * The streak detail popover content: streak count, a 7-day activity strip, and
 * a contextual message.
 *
 * @param props - The component props.
 * @param props.streakCount - The current streak count.
 * @param props.activeDays - Seven booleans for recent activity.
 * @param props.message - The contextual message.
 * @returns The rendered popover content.
 */
export function StreakPopover({
  streakCount,
  activeDays,
  message,
}: Readonly<StreakPopoverProps>) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-display text-lg font-bold text-ink">
        🔥 {streakCount > 0 ? `${streakCount}-day streak` : "No streak yet"}
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent activity
        </div>
        <div className="flex gap-1">
          {activeDays.map((active, i) => {
            const isToday = i === 6;
            return (
              <div
                key={i}
                className={`flex h-9 w-9 flex-col items-center justify-center rounded text-xs font-semibold transition ${
                  active ? "bg-brand/15 text-brand" : "bg-cream-deep text-muted"
                } ${isToday ? "ring-1 ring-brand/40" : ""}`}
                aria-label={`${DAY_LABELS[i]}${isToday ? " today" : ""} ${active ? "active" : "inactive"}`}
              >
                <span>{DAY_LABELS[i]}</span>
                <span aria-hidden>{active ? "✓" : "—"}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted italic">{message}</p>
    </div>
  );
}
