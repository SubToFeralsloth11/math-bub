interface LevelPopoverProps {
  /** The current level. */
  level: number;
  /** XP earned into the current level. */
  intoLevel: number;
  /** Total XP span of the current level. */
  span: number;
  /** XP remaining until the next level. */
  toNext: number;
  /** The next level number. */
  nextLevel: number;
  /** The XP span of the next level (for the "each level costs X more" note). */
  nextSpan: number;
}

/**
 * The level detail popover content: current level, an XP progress bar with a
 * numeric label, remaining XP to the next level, and the next level target.
 *
 * @param props - The component props.
 * @param props.level - The current level number.
 * @param props.intoLevel - XP earned into the current level.
 * @param props.span - Total XP span of the current level.
 * @param props.toNext - XP remaining to the next level.
 * @param props.nextLevel - The next level number.
 * @param props.nextSpan - The XP span of the next level.
 * @returns The rendered popover content.
 */
export function LevelPopover({
  level,
  intoLevel,
  span,
  toNext,
  nextLevel,
  nextSpan,
}: Readonly<LevelPopoverProps>) {
  const percent = Math.round((intoLevel / Math.max(span, 1)) * 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="font-display text-lg font-bold text-ink">
        Level {level}{" "}
        <span className="font-normal text-muted">→ Level {nextLevel}</span>
      </div>

      <div>
        <div
          className="h-2.5 w-full overflow-hidden rounded-pill bg-cream-deep"
          role="progressbar"
          aria-label="XP toward next level"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-pill bg-xp transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="text-sm text-muted">
        {intoLevel} / {span} XP
      </div>

      <div className="font-semibold text-ink">
        {toNext} XP to Level {nextLevel}
      </div>

      <div className="text-xs text-muted">
        Each level costs {nextSpan - span} XP more than the last
      </div>
    </div>
  );
}
