import { Link } from "react-router-dom";

import { ResetProgress } from "./ResetProgress";
import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { RewardBar } from "../../components/RewardBar";
import { isBossUnlocked, trackProgress } from "../../domain/progress/unlock";
import { useProgress } from "../../state/progressContext";
import { trackAccent } from "../../theme/tokens";

import type { Track } from "../../domain/content/types";

const TRACK_ICON: Record<string, string> = {
  algebra: "🧮",
  geometry: "📐",
  time: "⏰",
};

interface TrackCardProps {
  /** The track to summarise. */
  track: Track;
}

/**
 * A single track card on the home screen, showing per-track progress and
 * linking to that track's map.
 *
 * @param props - The component props.
 * @param props.track - The track to summarise.
 * @returns The rendered track card.
 */
function TrackCard({ track }: Readonly<TrackCardProps>) {
  const { state } = useProgress();
  const { completed, total } = trackProgress(track, state.saved);
  const bossReady = isBossUnlocked(track, state.saved);
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const accent = trackAccent[track.id];

  return (
    <Link
      to={`/track/${track.id}`}
      className="group block rounded-bub focus-visible:outline-none"
    >
      <Card className="flex items-center gap-4 p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-bub-lg">
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded-bub text-3xl"
          style={{ backgroundColor: `${accent}1f` }}
          aria-hidden
        >
          {TRACK_ICON[track.id] ?? "✨"}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-lg font-semibold text-ink">
            {track.title}
          </h2>
          <p className="text-sm text-muted">
            {total} {total === 1 ? "lesson" : "lessons"} · {completed} complete
            · boss challenge {bossReady ? "available" : "locked"}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-pill bg-cream-deep">
            <div
              className="h-full rounded-pill transition-[width] duration-500"
              style={{ width: `${percent}%`, backgroundColor: accent }}
            />
          </div>
        </div>
        <span
          aria-hidden
          className="text-2xl text-muted transition group-hover:translate-x-0.5 group-hover:text-ink"
        >
          →
        </span>
      </Card>
    </Link>
  );
}

/**
 * The home screen: a welcome, the persistent reward indicators, and a card for
 * each track linking to its map.
 *
 * @returns The rendered home screen.
 */
export function HomeScreen() {
  const { content } = useProgress();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
      <AppHeader right={<RewardBar />} />
      <main className="flex-1 px-5 py-6">
        <h1 className="text-3xl text-ink md:text-4xl">Choose a track</h1>
        <p className="mt-1 text-muted">
          Pick a topic to keep learning. Your progress is saved on this device.
        </p>

        <div className="mt-7 flex flex-col gap-4">
          {content.tracks.map((track) => (
            <div key={track.id} className="animate-bub-rise">
              <TrackCard track={track} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between text-sm">
          <Link
            to="/badges"
            className="font-display font-semibold text-brand hover:text-brand-deep"
          >
            View badges →
          </Link>
          <ResetProgress />
        </div>
      </main>
    </div>
  );
}
