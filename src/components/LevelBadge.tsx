interface LevelBadgeProps {
  /** The level to display. */
  level: number;
}

/**
 * A compact level indicator.
 *
 * @param props - The component props.
 * @param props.level - The level to display.
 * @returns The rendered level badge.
 */
export function LevelBadge({ level }: Readonly<LevelBadgeProps>) {
  return (
    <span
      className="flex items-center gap-1 rounded-pill bg-brand px-3 py-1.5 font-display text-sm font-semibold text-white"
      aria-label={`Level ${level}`}
    >
      <span aria-hidden className="opacity-80">
        Lvl
      </span>
      {level}
    </span>
  );
}
