import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { RewardBar } from "../../components/RewardBar";
import { useProgress } from "../../state/progressContext";

import type { Badge } from "../../domain/content/types";

interface BadgeTileProps {
  /** The badge definition. */
  badge: Badge;
  /** Whether the learner has earned this badge. */
  earned: boolean;
}

/**
 * A single badge tile, rendered at full strength when earned and dimmed with a
 * hidden icon when not yet earned.
 *
 * @param props - The component props.
 * @param props.badge - The badge definition.
 * @param props.earned - Whether the badge is earned.
 * @returns The rendered badge tile.
 */
function BadgeTile({ badge, earned }: Readonly<BadgeTileProps>) {
  return (
    <Card
      aria-label={`${badge.title}: ${earned ? "earned" : "not yet earned"}`}
      className={`flex flex-col items-center gap-2 p-5 text-center ${earned ? "" : "opacity-60 ring-dashed"}`}
    >
      <div
        className={`flex size-14 items-center justify-center rounded-full text-2xl ${earned ? "bg-xp-soft" : "bg-cream-deep"}`}
        aria-hidden
      >
        {earned ? badge.icon : "?"}
      </div>
      <div className="font-display font-semibold text-ink">{badge.title}</div>
      <div className="text-xs text-muted">{badge.description}</div>
    </Card>
  );
}

/**
 * The badges collection screen, showing every badge with its earned or
 * not-yet-earned state and a count of progress.
 *
 * @returns The rendered badges screen.
 */
export function BadgesScreen() {
  const { content, state } = useProgress();
  const earned = new Set(state.saved.badges);
  const earnedCount = content.badges.filter((badge) =>
    earned.has(badge.id),
  ).length;

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
      <AppHeader
        back={{ to: "/", label: "Home" }}
        title="Badges"
        right={<RewardBar />}
      />
      <main className="flex-1 px-5 py-6">
        <p className="mb-5 text-muted">
          {earnedCount} of {content.badges.length} earned
        </p>
        {content.badges.length === 0 ? (
          <p className="text-muted">No badges to earn yet - check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {content.badges.map((badge) => (
              <BadgeTile
                key={badge.id}
                badge={badge}
                earned={earned.has(badge.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
