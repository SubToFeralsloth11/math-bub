import { useState } from "react";

import { LevelBadge } from "./LevelBadge";
import { LevelPopover } from "./LevelPopover";
import { Popover } from "./Popover";
import { StreakChip } from "./StreakChip";
import { StreakPopover } from "./StreakPopover";
import { XpBar } from "./XpBar";
import { recentActiveDays } from "../domain/progress/activity";
import { localDateIso } from "../domain/progress/dates";
import { streakMessage } from "../domain/progress/streak";
import { levelFor, levelProgress, xpForLevel } from "../domain/progress/xp";
import { useProgress } from "../state/progressContext";

type PopoverId = "streak" | "level" | null;

/**
 * The persistent reward indicator shown in the header: the daily streak, the
 * current level, and an XP-to-next-level bar. It updates immediately as the
 * learner earns XP (FR-019). Clicking the streak chip or level badge opens a
 * detail popover; only one popover may be open at a time.
 *
 * @returns The reward indicators.
 */
export function RewardBar() {
  const { state } = useProgress();
  const { xp, streak, activeDates } = state.saved;
  const [openPopover, setOpenPopover] = useState<PopoverId>(null);

  const today = localDateIso();
  const days = recentActiveDays(activeDates, today, 7);
  const isTodayActive = days[6] ?? false;
  const isYesterdayActive = days[5] ?? false;
  const message = streakMessage(streak.count, isTodayActive, isYesterdayActive);
  const level = levelFor(xp);
  const progress = levelProgress(xp);

  const handleStreakClick = () => {
    setOpenPopover((prev) => (prev === "streak" ? null : "streak"));
  };

  const handleLevelClick = () => {
    setOpenPopover((prev) => (prev === "level" ? null : "level"));
  };

  const closePopover = () => setOpenPopover(null);

  return (
    <div className="flex min-w-0 items-center gap-1 pr-1 sm:gap-2">
      <Popover
        open={openPopover === "streak"}
        onClose={closePopover}
        placement="bottom-end"
        anchor={
          <StreakChip
            count={streak.count}
            onClick={handleStreakClick}
            active={openPopover === "streak"}
          />
        }
      >
        <StreakPopover
          streakCount={streak.count}
          activeDays={days}
          message={message}
        />
      </Popover>
      <Popover
        open={openPopover === "level"}
        onClose={closePopover}
        placement="bottom-end"
        anchor={
          <LevelBadge
            level={level}
            onClick={handleLevelClick}
            active={openPopover === "level"}
          />
        }
      >
        <LevelPopover
          level={progress.level}
          intoLevel={progress.intoLevel}
          span={progress.span}
          toNext={progress.toNext}
          nextLevel={progress.level + 1}
          nextSpan={
            xpForLevel(progress.level + 2) - xpForLevel(progress.level + 1)
          }
        />
      </Popover>
      <span className="hidden sm:block">
        <XpBar xp={xp} />
      </span>
    </div>
  );
}
