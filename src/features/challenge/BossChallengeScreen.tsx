import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ConfettiBurst } from "../../components/ConfettiBurst";
import { Figure } from "../../components/Figure";
import { NotFound } from "../../components/NotFound";
import { RichBlocks } from "../../components/RichBlocks";
import { markAnswer } from "../../domain/marking/markAnswer";
import { localDateIso } from "../../domain/progress/dates";
import { isBossUnlocked } from "../../domain/progress/unlock";
import { useAiConfig } from "../../state/aiConfigContext";
import { useProgress } from "../../state/progressContext";
import { useTrackFromRoute } from "../../state/useTrackFromRoute";
import { ExpressionInput } from "../lesson/inputs/ExpressionInput";
import { FillInTheBlankInput } from "../lesson/inputs/FillInTheBlankInput";
import { MatchingInput } from "../lesson/inputs/MatchingInput";
import { McqInput } from "../lesson/inputs/McqInput";
import { NumericInput } from "../lesson/inputs/NumericInput";
import { ShortTextInput } from "../lesson/inputs/ShortTextInput";

import type { BossChallenge, Track } from "../../domain/content/types";

interface ChallengeRunnerProps {
  /** The track the challenge belongs to. */
  track: Track;
  /** The boss challenge to play. */
  challenge: BossChallenge;
}

type Phase = "intro" | "playing" | "result";

/**
 * Drives a boss challenge: an intro, the question run (no learn cards and no
 * per-question feedback), and an end-of-run result with the score and rewards.
 *
 * @param props - The component props.
 * @param props.track - The owning track.
 * @param props.challenge - The boss challenge.
 * @returns The rendered challenge run.
 */
function ChallengeRunner({ track, challenge }: Readonly<ChallengeRunnerProps>) {
  const navigate = useNavigate();
  const { dispatch, state } = useProgress();
  const { aiConfig } = useAiConfig();
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [value, setValue] = useState("");

  // Clear any stale celebration so the result screen reflects only this run.
  useEffect(() => {
    dispatch({ type: "DISMISS_CELEBRATION" });
  }, [dispatch]);

  const questions = challenge.questions;
  const question = questions[index];
  const total = questions.length;
  const hasAnswer =
    question?.type === "mcq" ? selectedId !== null : value.trim() !== "";

  async function handleSubmit(matchInput?: string) {
    if (!hasAnswer && !matchInput) return;
    const input =
      matchInput ?? (question.type === "mcq" ? (selectedId ?? "") : value);
    const result = await markAnswer(question, input, {
      aiConfig: aiConfig ?? undefined,
    });
    const correct = result.status === "correct";
    const newScore = score + (correct ? 1 : 0);
    setScore(newScore);
    if (index + 1 >= total) {
      dispatch({
        type: "COMPLETE_CHALLENGE",
        challengeId: challenge.id,
        score: newScore,
        total,
        bonusXp: challenge.bonusXp,
        today: localDateIso(),
      });
      setPhase("result");
      return;
    }
    setIndex(index + 1);
    setSelectedId(null);
    setValue("");
  }

  if (phase === "intro") {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-5 py-10">
        <Card raised className="p-8 text-center">
          <div className="mb-3 text-5xl" aria-hidden>
            👑
          </div>
          <h1 className="text-2xl text-ink">{challenge.title}</h1>
          <p className="mt-3 text-muted">
            Unlocked because you finished every {track.title} lesson. No
            teaching here - show what you know. {total} questions, with bonus XP
            and a badge for finishing.
          </p>
        </Card>
        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(`/track/${track.id}`)}
          >
            ← Back to map
          </Button>
          <Button onClick={() => setPhase("playing")}>Start challenge →</Button>
        </div>
      </main>
    );
  }

  if (phase === "result") {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <ConfettiBurst />
        <div className="flex size-28 animate-bub-pop items-center justify-center rounded-full bg-xp-soft text-5xl shadow-bub">
          🏆
        </div>
        <h1 className="text-3xl text-ink">Challenge complete!</h1>
        <Card raised className="w-full p-6">
          <div className="font-display text-4xl font-bold text-ink">
            {score} / {total}
          </div>
          <p className="mt-2 text-muted">
            +{challenge.bonusXp} bonus XP
            {state.celebration.newBadges.length > 0
              ? " · new badge earned!"
              : ""}
          </p>
        </Card>
        <Button onClick={() => navigate(`/track/${track.id}`)}>
          Back to map →
        </Button>
      </main>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
      <header className="flex items-center gap-4 px-5 py-4">
        <Link
          to={`/track/${track.id}`}
          aria-label="Leave challenge"
          className="text-2xl text-muted transition hover:text-ink"
        >
          ✕
        </Link>
        <div
          className="h-3 flex-1 overflow-hidden rounded-pill bg-cream-deep"
          role="progressbar"
          aria-label="Challenge progress"
          aria-valuenow={Math.round((index / total) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-pill bg-brand transition-[width] duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-sm text-muted">
          Q {index + 1} / {total}
        </span>
      </header>

      <main className="flex flex-1 flex-col gap-5 px-5 py-6">
        <Card className="p-6 md:p-8">
          <div className="mb-5 text-xl text-ink md:text-2xl">
            <RichBlocks blocks={question.prompt} />
          </div>
          {question.figure ? <Figure figure={question.figure} /> : null}

          {question.type === "mcq" ? (
            <McqInput
              question={question}
              selectedId={selectedId}
              onSelect={setSelectedId}
              revealed={false}
            />
          ) : question.type === "expression" ? (
            <ExpressionInput
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              revealed={false}
            />
          ) : question.type === "shortText" ? (
            <ShortTextInput
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              revealed={false}
            />
          ) : question.type === "fillInTheBlank" ? (
            <FillInTheBlankInput
              template={question.template}
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              revealed={false}
            />
          ) : question.type === "matching" ? (
            <MatchingInput
              pairs={question.pairs}
              onSubmit={(mapping) => handleSubmit(mapping)}
              revealed={false}
              result={null}
            />
          ) : (
            <NumericInput
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              revealed={false}
              unit={question.unit}
            />
          )}

          <div className="mt-5 flex justify-end">
            <Button onClick={() => handleSubmit()} disabled={!hasAnswer}>
              {index + 1 >= total ? "Finish" : "Submit answer"} →
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

/**
 * The boss-challenge route. Shows a locked state until every lesson in the track
 * is complete, then plays the challenge.
 *
 * @returns The rendered boss-challenge screen.
 */
export function BossChallengeScreen() {
  const { track, state } = useTrackFromRoute();

  if (!track) {
    return <NotFound title="Challenge not found" />;
  }

  if (!isBossUnlocked(track, state.saved)) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-cream-deep text-3xl">
          🔒
        </div>
        <h1 className="text-2xl text-ink">Boss challenge locked</h1>
        <p className="text-muted">
          Finish every {track.title} lesson to unlock this challenge.
        </p>
        <Link
          to={`/track/${track.id}`}
          className="rounded-pill bg-brand px-6 py-3 font-display font-semibold text-white shadow-bub"
        >
          Back to map
        </Link>
      </div>
    );
  }

  return <ChallengeRunner track={track} challenge={track.challenge} />;
}
