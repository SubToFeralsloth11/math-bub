import { Link, useParams } from "react-router-dom";

import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { NotFound } from "../../components/NotFound";
import { RewardBar } from "../../components/RewardBar";
import { findSubject, tracksForSubject } from "../../content";
import { trackProgress } from "../../domain/progress/unlock";
import { useProgress } from "../../state/progressContext";
import { trackAccent } from "../../theme/tokens";

import type { Track } from "../../domain/content/types";

interface TrackCardProps {
  track: Track;
}

function TrackCard({ track }: Readonly<TrackCardProps>) {
  const { state } = useProgress();
  const { completed, total } = trackProgress(track, state.saved);
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const accent = trackAccent[track.id];
  const subject = findSubject(track.subjectId);

  return (
    <Link
      to={`/subject/${track.subjectId}/track/${track.id}`}
      className="group block rounded-bub focus-visible:outline-none"
    >
      <Card className="flex items-center gap-4 p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-bub-lg">
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded-bub text-3xl"
          style={{ backgroundColor: `${accent}1f` }}
          aria-hidden
        >
          {subject?.icon ?? "✨"}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-lg font-semibold text-ink">
            {track.title}
          </h2>
          <p className="text-sm text-muted">
            {total} {total === 1 ? "lesson" : "lessons"} · {completed} complete
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
 *
 */
export function SubjectScreen() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = findSubject(subjectId ?? "");
  const tracks = tracksForSubject(subjectId ?? "");

  if (!subject) {
    return <NotFound title="Subject not found" />;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
      <AppHeader back={{ to: "/", label: "Subjects" }} right={<RewardBar />} />
      <main className="flex-1 px-5 py-6">
        <div className="flex items-center gap-4">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-bub text-3xl"
            style={{ backgroundColor: `${subject.accent}1f` }}
            aria-hidden
          >
            {subject.icon}
          </div>
          <div>
            <h1 className="text-3xl text-ink md:text-4xl">{subject.title}</h1>
            <p className="mt-1 text-muted">{subject.description}</p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tracks.length === 0 ? (
            <p className="text-muted">No tracks yet — check back soon.</p>
          ) : (
            tracks.map((track) => (
              <div key={track.id} className="animate-bub-rise">
                <TrackCard track={track} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
