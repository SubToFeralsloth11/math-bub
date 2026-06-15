import { useMemo, useState, useRef } from "react";

import { RichBlocks } from "../../../components/RichBlocks";
import { shuffleMatchingPairs } from "../../../domain/content/shuffleOptions";
import { MATCHING_PAIR_COLOURS } from "../../../theme/tokens";

import type { MatchingPair, RichBlock } from "../../../domain/content/types";

interface MatchingInputProps {
  pairs: MatchingPair[];
  onSubmit: (mapping: string) => void;
  revealed: boolean;
  result: "correct" | "incorrect" | null;
}

/** A single connection the learner has made between a left and right item. */
interface Connection {
  leftId: string;
  rightId: string;
  number: number;
  colour: string;
}

/**
 * Extracts the plain-text content of the first text block in a RichBlock
 * array. Returns an empty string if the array is empty or the first block is
 * not a text block.
 *
 * @param blocks - The RichBlock array to extract text from.
 * @returns The plain-text content, or an empty string.
 */
function firstText(blocks: RichBlock[]): string {
  if (blocks.length === 0) return "";
  const first = blocks[0];
  return "text" in first ? first.text : "";
}

/**
 * A matching input where connected pairs are shown as colour-coded, numbered
 * boxes at the top of the question, and un-matched items live in a two-column
 * grid below. The right column is shuffled once per mount.
 *
 * Tapping a pair-box item un-pairs it. Tapping an already-paired right item
 * from a different left replaces the old connection.
 */
export function MatchingInput({
  pairs,
  onSubmit,
  revealed,
  result,
}: Readonly<MatchingInputProps>) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const nextNumber = useRef(1);

  // Shuffle the right column once per mount.
  const shuffledRightItems = useMemo(() => {
    const shuffled = shuffleMatchingPairs(pairs);
    return shuffled.map((p) => ({ id: p.id, content: p.right }));
  }, [pairs]);

  // Derive un-matched sets from the connections array.
  const matchedLeftIds = new Set(connections.map((c) => c.leftId));
  const matchedRightIds = new Set(connections.map((c) => c.rightId));

  const unmatchedLeft = pairs.filter((p) => !matchedLeftIds.has(p.id));
  const unmatchedRight = shuffledRightItems.filter(
    (r) => !matchedRightIds.has(r.id),
  );

  function handleLeftClick(leftId: string) {
    if (revealed) return;
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  }

  function handleRightClick(rightId: string) {
    if (revealed || !selectedLeft) return;

    // Don't create a new connection if the same left-right pair already exists.
    const alreadySame = connections.some(
      (c) => c.leftId === selectedLeft && c.rightId === rightId,
    );
    if (alreadySame) {
      setSelectedLeft(null);
      return;
    }

    // Remove any existing connection for this left (the learner is re-pairing).
    const remaining = connections.filter((c) => c.leftId !== selectedLeft);

    const count = nextNumber.current;
    nextNumber.current += 1;
    const connection: Connection = {
      leftId: selectedLeft,
      rightId,
      number: count,
      colour: MATCHING_PAIR_COLOURS[(count - 1) % MATCHING_PAIR_COLOURS.length],
    };
    setConnections([...remaining, connection]);
    setSelectedLeft(null);
  }

  function handleUnpair(leftId: string) {
    if (revealed) return;
    // If a different left is currently selected, re-assign the right item
    // to the selected left rather than un-pairing (FR-008 replace flow).
    if (selectedLeft && selectedLeft !== leftId) {
      const connection = connections.find((c) => c.leftId === leftId);
      if (connection) {
        const remaining = connections.filter(
          (c) => c.leftId !== leftId && c.leftId !== selectedLeft,
        );
        const count = nextNumber.current;
        nextNumber.current += 1;
        const newConnection: Connection = {
          leftId: selectedLeft,
          rightId: connection.rightId,
          number: count,
          colour:
            MATCHING_PAIR_COLOURS[(count - 1) % MATCHING_PAIR_COLOURS.length],
        };
        setConnections([...remaining, newConnection]);
        setSelectedLeft(null);
        return;
      }
    }
    setConnections((prev) => prev.filter((c) => c.leftId !== leftId));
  }

  function handleSubmit() {
    if (connections.length !== pairs.length) return;
    const mapping: Record<string, string> = {};
    for (const c of connections) {
      mapping[c.leftId] = c.rightId;
    }
    onSubmit(JSON.stringify(mapping));
  }

  const allMatched = connections.length === pairs.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Matched-pairs row */}
      <div
        className="flex flex-wrap gap-3 items-center rounded-bub border-2 border-dashed border-hairline p-4 min-h-[60px]"
        data-testid="matched-pairs-row"
      >
        {connections.length === 0 && (
          <span className="text-sm text-muted italic">
            No pairs yet. Tap an item from each column.
          </span>
        )}
        {connections.map((c) => {
          const leftPair = pairs.find((p) => p.id === c.leftId);
          const rightPair = shuffledRightItems.find((r) => r.id === c.rightId);
          // A pair is correct when the connected right id equals the left's pair id.
          const isCorrectConnection = c.leftId === c.rightId;
          const showCheck = revealed && isCorrectConnection;
          const showCross = revealed && !isCorrectConnection;
          // For the "correct" result, all pairs are correct.
          const showCheckAll = revealed && result === "correct";
          const shouldShowCheck = showCheckAll || showCheck;
          const shouldShowCross = !showCheckAll && showCross;

          return (
            <div
              key={c.leftId}
              data-testid="pair-box"
              className="flex items-center gap-2 rounded-bub px-3 py-2 border-2"
              style={{ borderColor: c.colour }}
              aria-label={`Pair ${c.number}: ${leftPair ? firstText(leftPair.left) : ""} and ${rightPair ? firstText(rightPair.content) : ""}`}
            >
              <span data-testid="pair-item-left">
                <button
                  type="button"
                  disabled={revealed}
                  onClick={() => handleUnpair(c.leftId)}
                  className="text-left"
                >
                  {leftPair ? <RichBlocks blocks={leftPair.left} /> : null}
                </button>
              </span>
              <div
                data-testid="pair-marker"
                className="flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: c.colour }}
              >
                {c.number}
              </div>
              <span data-testid="pair-item-right">
                <button
                  type="button"
                  disabled={revealed}
                  onClick={() => handleUnpair(c.leftId)}
                  className="text-left"
                >
                  {rightPair ? <RichBlocks blocks={rightPair.content} /> : null}
                </button>
              </span>
              {shouldShowCheck && (
                <span
                  data-testid="verdict-check"
                  className="flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-sm flex-shrink-0 bg-success"
                >
                  {"\u2713"}
                </span>
              )}
              {shouldShowCross && (
                <span
                  data-testid="verdict-cross"
                  className="flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-sm flex-shrink-0 bg-warn"
                >
                  {"\u2717"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Un-matched grid */}
      {!revealed && (unmatchedLeft.length > 0 || unmatchedRight.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-2">
            {unmatchedLeft.map((pair) => {
              const isSelected = selectedLeft === pair.id;
              return (
                <button
                  key={pair.id}
                  type="button"
                  disabled={revealed}
                  onClick={() => handleLeftClick(pair.id)}
                  className={`rounded-bub p-3 text-left transition ${
                    isSelected
                      ? "ring-2 ring-brand bg-brand-soft"
                      : "bg-card hover:ring-2 hover:ring-hairline"
                  }`}
                  aria-label={`Left: ${firstText(pair.left)}`}
                >
                  <RichBlocks blocks={pair.left} />
                </button>
              );
            })}
          </div>

          {/* Right column (shuffled) */}
          <div className="flex flex-col gap-2">
            {unmatchedRight.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={revealed}
                onClick={() => handleRightClick(item.id)}
                className={`rounded-bub p-3 text-left transition ${
                  selectedLeft
                    ? "bg-card hover:ring-2 hover:ring-hairline"
                    : "bg-card opacity-100"
                }`}
                aria-label={`Right: ${firstText(item.content)}`}
              >
                <RichBlocks blocks={item.content} />
              </button>
            ))}
          </div>
        </div>
      )}

      {revealed && (
        <p className="text-center text-sm text-muted italic">
          All pairs matched.
        </p>
      )}

      {!revealed && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allMatched}
            aria-disabled={!allMatched}
            className="rounded-pill bg-brand px-6 py-3 font-display font-semibold text-white shadow-bub transition hover:bg-brand-deep disabled:opacity-50"
          >
            Check answer
          </button>
        </div>
      )}
    </div>
  );
}
