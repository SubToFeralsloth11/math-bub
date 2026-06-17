import { levelProgress } from "../domain/progress/xp";

interface XpBarProps {
  /** The total accumulated XP. */
  xp: number;
  /** Whether to show the "x / y XP" label beneath the bar. */
  showLabel?: boolean;
}

/**
 * A progress bar showing how far the learner is through their current level.
 *
 * @param props - The component props.
 * @param props.xp - The total accumulated XP.
 * @param props.showLabel - Whether to render the numeric XP label.
 * @returns The rendered XP bar.
 */
export function XpBar({ xp, showLabel = false }: Readonly<XpBarProps>) {
  const progress = levelProgress(xp);
  const percent = Math.round(progress.fraction * 100);

  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-2.5 w-32 min-w-0 max-w-full shrink overflow-hidden rounded-pill bg-cream-deep"
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
      {showLabel ? (
        <span className="text-xs text-muted">
          {progress.intoLevel} / {progress.span} XP to level{" "}
          {progress.level + 1}
        </span>
      ) : null}
    </div>
  );
}
