import { Card } from "../../components/Card";
import { RichBlocks } from "../../components/RichBlocks";

import type { Question } from "../../domain/content/types";
import type { MarkResult } from "../../domain/marking/markResult";

interface FeedbackProps {
  /** The marking result to communicate. */
  result: MarkResult;
  /** The question, for its XP value and worked explanation. */
  question: Question;
}

/**
 * Immediate answer feedback: a clear correct/incorrect/unreadable banner and a
 * worked explanation (always shown on a wrong answer, available on a correct
 * one). It is a polite live region so screen readers announce the outcome.
 *
 * @param props - The component props.
 * @param props.result - The marking result.
 * @param props.question - The question being answered.
 * @returns The rendered feedback panel.
 */
export function Feedback({ result, question }: Readonly<FeedbackProps>) {
  if (result.status === "unreadable") {
    return (
      <Card
        role="status"
        aria-live="polite"
        className="animate-bub-pop border-l-4 border-l-warn bg-warn-soft/50 p-4"
      >
        <p className="font-display font-semibold text-ink">
          Hmm, I couldn&apos;t read that
        </p>
        <p className="text-ink/70">
          Check your expression and try again - for example use{" "}
          <code className="rounded bg-card px-1">2(a+b)</code>.
        </p>
      </Card>
    );
  }

  const correct = result.status === "correct";

  return (
    <Card
      role="status"
      aria-live="polite"
      className={`animate-bub-pop border-l-4 p-5 ${
        correct
          ? "border-l-success bg-success-soft/50"
          : "border-l-warn bg-warn-soft/50"
      }`}
    >
      <p className="mb-2 font-display text-lg font-semibold text-ink">
        {correct ? (
          <>
            <span aria-hidden>🎉</span> Correct!{" "}
            <span className="text-success">+{question.xp} XP</span>
          </>
        ) : (
          <>
            <span aria-hidden>💭</span> Not quite - here&apos;s how it works
          </>
        )}
      </p>
      <div className="text-ink/80">
        <span className="font-semibold text-ink">Why: </span>
        <RichBlocks blocks={question.explanation} />
      </div>
    </Card>
  );
}
