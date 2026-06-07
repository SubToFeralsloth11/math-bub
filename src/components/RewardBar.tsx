import { LevelBadge } from "./LevelBadge";
import { StreakChip } from "./StreakChip";
import { XpBar } from "./XpBar";
import { levelFor } from "../domain/progress/xp";
import { useProgress } from "../state/progressContext";

/**
 * The persistent reward indicator shown in the header: the daily streak, the
 * current level, and an XP-to-next-level bar. It updates immediately as the
 * learner earns XP (FR-019).
 *
 * @returns The reward indicators.
 */
export function RewardBar() {
  const { state } = useProgress();
  const { xp, streak } = state.saved;

  return (
    <div className="flex items-center gap-2">
      <StreakChip count={streak.count} />
      <LevelBadge level={levelFor(xp)} />
      <span className="hidden sm:block">
        <XpBar xp={xp} />
      </span>
    </div>
  );
}
