import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { LearnCardView } from "./LearnCardView";
import { LessonComplete } from "./LessonComplete";
import {
  initLessonFlow,
  lessonFlowReducer,
  masteryAccuracy,
} from "./lessonFlow";
import { QuestionView } from "./QuestionView";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { localDateIso } from "../../domain/progress/dates";
import { accuracy } from "../../domain/progress/xp";
import { useProgress } from "../../state/progressContext";

import type { Lesson } from "../../domain/content/types";

/**
 * Computes the learner's progress through a lesson as a 0..1 fraction.
 *
 * @param phase - The current phase.
 * @param index - The index within the phase.
 * @param totals - The per-phase item counts.
 * @returns The completion fraction.
 */
function progressFraction(
  phase: string,
  index: number,
  totals: { learn: number; practice: number; mastery: number },
): number {
  const total = totals.learn + totals.practice + totals.mastery;
  if (total === 0) return 1;
  let done = 0;
  switch (phase) {
    case "learn": {
      done = index;
      break;
    }
    case "practice": {
      done = totals.learn + index;
      break;
    }
    case "mastery": {
      done = totals.learn + totals.practice + index;
      break;
    }
    default: {
      done = total;
    }
  }
  return done / total;
}

interface LessonRunnerProps {
  /** The lesson being played. */
  lesson: Lesson;
  /** The track the lesson belongs to (for navigation). */
  trackId: string;
  /** Replays the lesson from the beginning. */
  onReview: () => void;
}

/**
 * Drives a single play-through of a lesson: learn cards, practice, mastery, and
 * the outcome. Holds the pure lesson-flow state and bridges correct answers and
 * mastery passes to the global progress store.
 *
 * @param props - The component props.
 * @param props.lesson - The lesson being played.
 * @param props.trackId - The owning track id.
 * @param props.onReview - Replays the lesson from the start.
 * @returns The rendered lesson run.
 */
function LessonRunner({
  lesson,
  trackId,
  onReview,
}: Readonly<LessonRunnerProps>) {
  const navigate = useNavigate();
  const { dispatch, state } = useProgress();
  const [flow, flowDispatch] = useReducer(
    lessonFlowReducer,
    lesson,
    initLessonFlow,
  );

  // Clear any celebration left over from a previous lesson so this run's
  // level-up and badge banners reflect only what is earned here.
  useEffect(() => {
    dispatch({ type: "DISMISS_CELEBRATION" });
  }, [dispatch]);

  const totals = {
    learn: flow.learnTotal,
    practice: flow.practiceTotal,
    mastery: flow.masteryTotal,
  };
  const fraction = progressFraction(flow.phase, flow.index, totals);

  function handleAnswered(correct: boolean, xp: number) {
    flowDispatch({ type: "SUBMIT", correct, xp });
    if (correct) {
      dispatch({ type: "ANSWER_CORRECT", xp, today: localDateIso() });
    }
  }

  function handleContinue() {
    // Finishing the last mastery question with a passing accuracy completes the
    // lesson; record that before advancing the flow to its outcome.
    const finishingMastery =
      flow.phase === "mastery" && flow.index + 1 >= flow.masteryTotal;
    if (finishingMastery) {
      const acc = accuracy(flow.masteryCorrect, flow.masteryTotal);
      if (acc >= flow.passThreshold) {
        dispatch({
          type: "COMPLETE_LESSON",
          lessonId: lesson.id,
          accuracy: acc,
          passThreshold: flow.passThreshold,
          today: localDateIso(),
        });
      }
    }
    flowDispatch({ type: "NEXT" });
  }

  // Outcome: passed -> celebration; failed -> retry.
  if (flow.phase === "outcome") {
    if (flow.outcome === "passed") {
      return (
        <LessonComplete
          lessonTitle={lesson.title}
          xpEarned={flow.xpEarned}
          accuracy={masteryAccuracy(flow)}
          masteryCorrect={flow.masteryCorrect}
          masteryTotal={flow.masteryTotal}
          streak={state.saved.streak.count || undefined}
          levelUpTo={state.celebration.levelUpTo}
          newBadges={state.celebration.newBadges}
          onReview={onReview}
          onBackToMap={() => navigate(`/track/${trackId}`)}
        />
      );
    }
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-warn-soft text-4xl">
          💪
        </div>
        <h1 className="text-3xl text-ink">So close!</h1>
        <p className="text-muted">
          You got {flow.masteryCorrect} of {flow.masteryTotal}. Review the idea
          and try the check again - you&apos;ve got this.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onReview}>
            Review lesson
          </Button>
          <Button onClick={() => flowDispatch({ type: "RETRY_MASTERY" })}>
            Try the check again
          </Button>
        </div>
      </main>
    );
  }

  const isMastery = flow.phase === "mastery";
  const stepTotal = isMastery ? flow.masteryTotal : flow.practiceTotal;
  const stepLabel =
    flow.phase === "learn"
      ? `Learn ${flow.index + 1} / ${flow.learnTotal}`
      : `${isMastery ? "Mastery" : "Practice"} ${flow.index + 1} / ${stepTotal}`;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
      <header className="flex items-center gap-4 px-5 py-4">
        <Link
          to={`/track/${trackId}`}
          aria-label="Leave lesson"
          className="text-2xl text-muted transition hover:text-ink"
        >
          ✕
        </Link>
        <div
          className="h-3 flex-1 overflow-hidden rounded-pill bg-cream-deep"
          role="progressbar"
          aria-label="Lesson progress"
          aria-valuenow={Math.round(fraction * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-pill bg-brand transition-[width] duration-500"
            style={{ width: `${fraction * 100}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-sm text-muted">
          {stepLabel}
        </span>
      </header>

      <main className="flex flex-1 flex-col gap-5 px-5 py-6">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-brand">
          {lesson.title}
        </p>

        {flow.phase === "learn" ? (
          <>
            <LearnCardView card={lesson.learnCards[flow.index]} />
            <div className="flex justify-end">
              <Button onClick={() => flowDispatch({ type: "ADVANCE_LEARN" })}>
                {flow.index + 1 >= flow.learnTotal
                  ? "Start practice →"
                  : "Next →"}
              </Button>
            </div>
          </>
        ) : (
          <Card className="p-6 md:p-8">
            <QuestionView
              key={`${flow.phase}-${flow.index}`}
              question={
                isMastery
                  ? lesson.mastery[flow.index]
                  : lesson.practice[flow.index]
              }
              onAnswered={handleAnswered}
              onContinue={handleContinue}
              continueLabel={
                isMastery && flow.index + 1 >= flow.masteryTotal
                  ? "Finish"
                  : "Next"
              }
            />
          </Card>
        )}
      </main>
    </div>
  );
}

/**
 * The lesson screen route. Resolves the lesson from the URL and plays it,
 * showing a kind not-found state when the lesson does not exist.
 *
 * @returns The lesson screen.
 */
export function LessonScreen() {
  const { trackId, lessonId } = useParams();
  const { content } = useProgress();
  const [runKey, setRunKey] = useState(0);
  const lesson = content.tracks
    .find((track) => track.id === trackId)
    ?.lessons.find((candidate) => candidate.id === lessonId);

  if (!trackId || !lesson) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-4xl">🔍</div>
        <h1 className="text-2xl text-ink">Lesson not found</h1>
        <p className="text-muted">
          That lesson doesn&apos;t exist. Head back and pick another.
        </p>
        <Link
          to="/"
          className="rounded-pill bg-brand px-6 py-3 font-display font-semibold text-white shadow-bub"
        >
          Back home
        </Link>
      </main>
    );
  }

  return (
    <LessonRunner
      key={runKey}
      lesson={lesson}
      trackId={trackId}
      onReview={() => setRunKey((key) => key + 1)}
    />
  );
}
