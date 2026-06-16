interface LevelBadgeProps {
  /** The level to display. */
  level: number;
  /** Called when the badge is clicked. */
  onClick?: () => void;
  /** Whether the associated popover is open (adds a visual distinction). */
  active?: boolean;
}

/**
 * A compact level indicator. When an onClick handler is provided the badge
 * renders as a button.
 *
 * @param props - The component props.
 * @param props.level - The level to display.
 * @param props.onClick - Optional click handler.
 * @param props.active - Whether the badge is in its active/popover-open state.
 * @returns The rendered level badge.
 */
export function LevelBadge({
  level,
  onClick,
  active = false,
}: Readonly<LevelBadgeProps>) {
  const Tag = onClick ? "button" : "span";
  const ringClass = active ? "ring-2 ring-brand-dark" : "";

  return (
    <Tag
      className={`flex items-center gap-1 rounded-pill bg-brand px-3 py-1.5 font-display text-sm font-semibold text-white ${ringClass} cursor-pointer transition`}
      aria-label={`Level ${level}`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      <span aria-hidden className="opacity-80">
        Lvl
      </span>
      {level}
    </Tag>
  );
}
