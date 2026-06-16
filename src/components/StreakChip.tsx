interface StreakChipProps {
  /** The current streak count in days. */
  count: number;
  /** Called when the chip is clicked. */
  onClick?: () => void;
  /** Whether the associated popover is open (adds a visual distinction). */
  active?: boolean;
}

/**
 * The daily-streak indicator. Renders a muted prompt when no streak is active so
 * the indicator is never an ambiguous "0". When an onClick handler is provided
 * the chip renders as a button.
 *
 * @param props - The component props.
 * @param props.count - The streak count in days.
 * @param props.onClick - Optional click handler.
 * @param props.active - Whether the chip is in its active/popover-open state.
 * @returns The rendered streak chip.
 */
export function StreakChip({
  count,
  onClick,
  active = false,
}: Readonly<StreakChipProps>) {
  const Tag = onClick ? "button" : "span";
  const ringClass = active ? "ring-2 ring-brand" : "ring-1 ring-hairline";

  if (count <= 0) {
    return (
      <Tag
        className={`flex items-center gap-1 rounded-pill bg-card px-3 py-1.5 text-sm text-muted ${ringClass} cursor-pointer transition`}
        aria-label="No streak yet"
        onClick={onClick}
        type={onClick ? "button" : undefined}
      >
        <span aria-hidden>🔥</span> Start a streak
      </Tag>
    );
  }
  return (
    <Tag
      className={`flex items-center gap-1 rounded-pill bg-card px-3 py-1.5 font-display text-sm font-semibold text-ink ${ringClass} cursor-pointer transition`}
      aria-label={`${count} day streak`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      <span aria-hidden>🔥</span> {count}
    </Tag>
  );
}
