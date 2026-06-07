interface StreakChipProps {
  /** The current streak count in days. */
  count: number;
}

/**
 * The daily-streak indicator. Renders a muted prompt when no streak is active so
 * the indicator is never an ambiguous "0".
 *
 * @param props - The component props.
 * @param props.count - The streak count in days.
 * @returns The rendered streak chip.
 */
export function StreakChip({ count }: Readonly<StreakChipProps>) {
  if (count <= 0) {
    return (
      <span
        className="flex items-center gap-1 rounded-pill bg-card px-3 py-1.5 text-sm text-muted ring-1 ring-hairline"
        aria-label="No streak yet"
      >
        <span aria-hidden>🔥</span> Start a streak
      </span>
    );
  }
  return (
    <span
      className="flex items-center gap-1 rounded-pill bg-card px-3 py-1.5 font-display text-sm font-semibold text-ink ring-1 ring-hairline"
      aria-label={`${count} day streak`}
    >
      <span aria-hidden>🔥</span> {count}
    </span>
  );
}
