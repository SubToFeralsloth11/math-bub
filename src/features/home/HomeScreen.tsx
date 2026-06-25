import { Link } from "@tanstack/react-router";

import { ResetProgress } from "./ResetProgress";
import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Card";
import { RewardBar } from "../../components/RewardBar";
import { tracksForSubject } from "../../content";
import { useProgress } from "../../state/progressContext";

import type { Subject } from "../../domain/content/types";

interface SubjectCardProps {
  subject: Subject;
}

function SubjectCard({ subject }: Readonly<SubjectCardProps>) {
  const tracks = tracksForSubject(subject.id);
  const trackCount = tracks.length;

  return (
    <Link
      to={`/subject/${subject.id}`}
      className="group block rounded-bub focus-visible:outline-none"
    >
      <Card className="flex items-center gap-4 p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-bub-lg">
        <div
          className="flex size-16 shrink-0 items-center justify-center rounded-bub text-3xl"
          style={{ backgroundColor: `${subject.accent}1f` }}
          aria-hidden
        >
          {subject.icon}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-lg font-semibold text-ink">
            {subject.title}
          </h2>
          <p className="text-sm text-muted">
            {trackCount === 0
              ? "No tracks yet"
              : `${trackCount} ${trackCount === 1 ? "track" : "tracks"}`}
          </p>
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
export function HomeScreen() {
  const { content } = useProgress();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
      <AppHeader right={<RewardBar />} />
      <main className="flex-1 px-5 py-6">
        <h1 className="text-3xl text-ink md:text-4xl">Choose a subject</h1>
        <p className="mt-1 text-muted">
          Pick a subject to keep learning. Your progress is saved on this
          device.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.subjects.map((subject) => (
            <div key={subject.id} className="animate-bub-rise">
              <SubjectCard subject={subject} />
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
