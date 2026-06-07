import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ConfettiBurst } from "../../components/ConfettiBurst";
import { findBadge } from "../../content";

import type { BadgeId } from "../../domain/content/types";

interface LessonCompleteProps {
  /** The lesson title. */
  lessonTitle: string;
  /** XP earned during the lesson. */
  xpEarned: number;
  /** Mastery accuracy as a fraction 0..1. */
  accuracy: number;
  /** Correct answers in the mastery check. */
  masteryCorrect: number;
  /** Total mastery questions. */
  masteryTotal: number;
  /** Current daily streak count (shown from US4 onward). */
  streak?: number;
  /** The level just reached, if a level-up occurred. */
  levelUpTo?: number | null;
  /** Ids of badges newly earned by completing this lesson. */
  newBadges?: BadgeId[];
  /** Replays the lesson from the start. */
  onReview: () => void;
  /** Returns to the track map. */
  onBackToMap: () => void;
}

/** One stat tile for the completion summary. */
function Stat({ value, label }: Readonly<{ value: string; label: string }>) {
  return (
    <Card className="flex-1 p-4 text-center">
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted">
        {label}
      </div>
    </Card>
  );
}

/**
 * The lesson-complete celebration screen: a summary of XP, accuracy and streak,
 * plus any level-up and newly-earned badges, with a path back to the map.
 *
 * @param props - The component props.
 * @returns The rendered completion screen.
 */
export function LessonComplete({
  lessonTitle,
  xpEarned,
  accuracy,
  masteryCorrect,
  masteryTotal,
  streak,
  levelUpTo,
  newBadges = [],
  onReview,
  onBackToMap,
}: Readonly<LessonCompleteProps>) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 py-10 text-center">
      <ConfettiBurst />
      <div className="flex size-28 animate-bub-pop items-center justify-center rounded-full bg-xp-soft text-5xl shadow-bub">
        🎉
      </div>
      <div>
        <h1 className="text-3xl text-ink">Lesson mastered!</h1>
        <p className="mt-1 text-muted">
          {lessonTitle} · mastery check passed ({masteryCorrect} /{" "}
          {masteryTotal})
        </p>
      </div>

      <div className="flex w-full gap-3">
        <Stat value={`+${xpEarned}`} label="XP earned" />
        <Stat value={`${Math.round(accuracy * 100)}%`} label="Accuracy" />
        {typeof streak === "number" ? (
          <Stat value={`🔥 ${streak}`} label="Day streak" />
        ) : null}
      </div>

      {typeof levelUpTo === "number" ? (
        <Card className="w-full animate-bub-pop bg-brand-soft p-4 font-display font-semibold text-brand-deep">
          ⬆ Level up! You reached Level {levelUpTo}.
        </Card>
      ) : null}

      {newBadges.map((badgeId) => {
        const badge = findBadge(badgeId);
        if (!badge) return null;
        return (
          <Card
            key={badgeId}
            className="flex w-full animate-bub-pop items-center justify-center gap-3 bg-xp-soft p-4"
          >
            <span className="text-2xl" aria-hidden>
              {badge.icon}
            </span>
            <span className="text-ink">
              New badge: <strong>{badge.title}</strong> - {badge.description}.
            </span>
          </Card>
        );
      })}

      <div className="flex w-full gap-3">
        <Button variant="secondary" className="flex-1" onClick={onReview}>
          Review lesson
        </Button>
        <Button className="flex-1" onClick={onBackToMap}>
          Back to map →
        </Button>
      </div>
    </main>
  );
}
