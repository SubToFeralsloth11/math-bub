import { Link } from "react-router-dom";

import { AppHeader } from "../../components/AppHeader";
import { NotFound } from "../../components/NotFound";
import { RewardBar } from "../../components/RewardBar";
import { findSubjectForTrack } from "../../content";
import {
  isBossUnlocked,
  lessonState,
  type LessonState,
} from "../../domain/progress/unlock";
import { useTrackFromRoute } from "../../state/useTrackFromRoute";
import { trackAccent } from "../../theme/tokens";

import type { Lesson, Track } from "../../domain/content/types";

const NODE_BASE =
  "flex size-20 flex-col items-center justify-center rounded-full text-center text-xs font-semibold ring-4 transition";

interface LessonNodeProps {
  /** The lesson this node represents. */
  lesson: Lesson;
  /** The track id (for navigation). */
  trackId: string;
  /** The derived lesson state. */
  state: LessonState;
  /** The track accent colour. */
  accent: string;
}

/**
 * A single lesson node on the map. Complete and available lessons are links;
 * locked lessons are non-interactive and announce their locked state.
 *
 * @param props - The component props.
 * @returns The rendered node.
 */
function LessonNode({
  lesson,
  trackId,
  state,
  accent,
}: Readonly<LessonNodeProps>) {
  const label = `Lesson ${lesson.order}: ${lesson.title}`;

  if (state === "locked") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className={`${NODE_BASE} bg-cream-deep text-muted ring-hairline`}
          aria-label={`${label} (locked)`}
          aria-disabled="true"
        >
          <span aria-hidden className="text-xl">
            🔒
          </span>
        </div>
        <span className="max-w-24 text-xs text-muted">{lesson.title}</span>
      </div>
    );
  }

  const complete = state === "complete";
  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        to={`/lesson/${trackId}/${lesson.id}`}
        aria-label={`${label} (${state})`}
        className={`${NODE_BASE} ${complete ? "text-white" : "bg-card text-ink"} hover:-translate-y-0.5`}
        style={
          complete
            ? { backgroundColor: accent, boxShadow: "var(--shadow-bub)" }
            : { boxShadow: `0 0 0 4px ${accent}33, var(--shadow-bub)` }
        }
      >
        <span aria-hidden className="text-2xl">
          {complete ? "✓" : "★"}
        </span>
      </Link>
      <span
        className={`max-w-24 text-xs font-semibold ${complete ? "text-ink" : "text-brand"}`}
      >
        {lesson.title}
      </span>
    </div>
  );
}

interface BossNodeProps {
  /** The track. */
  track: Track;
  /** Whether the boss is unlocked. */
  unlocked: boolean;
  /** The track accent colour. */
  accent: string;
}

/**
 * The end-of-track boss-challenge node, locked until every lesson is complete.
 *
 * @param props - The component props.
 * @returns The rendered boss node.
 */
function BossNode({ track, unlocked, accent }: Readonly<BossNodeProps>) {
  const inner = (
    <>
      <span aria-hidden className="text-2xl">
        {unlocked ? "👑" : "🔒"}
      </span>
      <span className="mt-1 px-1 text-xs">Boss challenge</span>
    </>
  );

  if (!unlocked) {
    return (
      <div
        className="flex size-32 flex-col items-center justify-center rounded-bub bg-cream-deep text-center text-muted ring-2 ring-dashed ring-hairline"
        aria-label="Boss challenge (locked)"
        aria-disabled="true"
      >
        {inner}
      </div>
    );
  }
  return (
    <Link
      to={`/challenge/${track.id}`}
      aria-label="Boss challenge (available)"
      className="flex size-32 flex-col items-center justify-center rounded-bub text-center font-display font-semibold text-white shadow-bub transition hover:-translate-y-0.5"
      style={{ backgroundColor: accent }}
    >
      {inner}
    </Link>
  );
}

/**
 * The track map screen: a vertical path of lesson nodes in their complete,
 * available, or locked states, ending in the boss-challenge node.
 *
 * @returns The rendered track map, or a not-found state.
 */
export function TrackMapScreen() {
  const { track, state } = useTrackFromRoute();

  if (!track) {
    return <NotFound title="Track not found" />;
  }

  const accent = trackAccent[track.id];
  const sorted = [...track.lessons].toSorted((a, b) => a.order - b.order);
  const bossUnlocked = isBossUnlocked(track, state.saved);
  const subject = findSubjectForTrack(track.id);

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
      <AppHeader
        back={{
          to: subject ? `/subject/${subject.id}` : "/",
          label: subject ? "Subjects" : "Home",
        }}
        title={track.title}
        right={<RewardBar />}
      />
      <main className="flex flex-1 flex-col items-center px-5 py-8">
        <ol className="flex flex-col items-center gap-0">
          {sorted.map((lesson) => (
            <li key={lesson.id} className="flex flex-col items-center">
              <LessonNode
                lesson={lesson}
                trackId={track.id}
                state={lessonState(track, lesson, state.saved)}
                accent={accent}
              />
              <span aria-hidden className="my-2 h-8 w-1 rounded bg-hairline" />
            </li>
          ))}
          <li>
            <BossNode track={track} unlocked={bossUnlocked} accent={accent} />
          </li>
        </ol>

        <p className="mt-8 max-w-md text-center text-sm text-muted">
          Lessons unlock in order. Finish the one that&apos;s ready to open the
          next. The boss challenge unlocks when every lesson is complete.
        </p>
      </main>
    </div>
  );
}
