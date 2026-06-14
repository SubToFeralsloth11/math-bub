import { useMemo, useState } from "react";

import { RichBlocks } from "../../../components/RichBlocks";

import type { MatchingPair } from "../../../domain/content/types";

interface MatchingInputProps {
  pairs: MatchingPair[];
  onSubmit: (mapping: string) => void;
  revealed: boolean;
  result: "correct" | "incorrect" | null;
}

/**
 *
 */
export function MatchingInput({
  pairs,
  onSubmit,
  revealed,
  result,
}: Readonly<MatchingInputProps>) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, string>>({});

  // Shuffle the right column deterministically for display.
  const rightItems = useMemo(() => {
    const items = pairs.map((p) => ({ id: p.id, content: p.right }));
    // Stable shuffle using pair id as seed.
    return [...items].toSorted((a, b) => a.id.localeCompare(b.id));
  }, [pairs]);

  function handleLeftClick(leftId: string) {
    if (revealed) return;
    setSelectedLeft(leftId);
  }

  function handleRightClick(rightId: string) {
    if (revealed || !selectedLeft) return;
    const next = { ...connections };
    // If the right item is already connected to another left, remove that connection.
    for (const [left, right] of Object.entries(next)) {
      if (right === rightId && left !== selectedLeft) {
        delete next[left];
      }
    }
    next[selectedLeft] = rightId;
    setConnections(next);
    setSelectedLeft(null);
  }

  function handleSubmit() {
    if (Object.keys(connections).length !== pairs.length) return;
    onSubmit(JSON.stringify(connections));
  }

  const allMatched = Object.keys(connections).length === pairs.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_2rem_1fr] gap-2">
        {/* Left column */}
        <div className="flex flex-col gap-2">
          {pairs.map((pair) => {
            const isSelected = selectedLeft === pair.id;
            const isConnected = pair.id in connections;
            const isCorrect =
              result === "correct" ||
              (result === "incorrect" && connections[pair.id] === pair.id);
            const isWrong =
              result === "incorrect" && connections[pair.id] !== pair.id;

            return (
              <button
                key={pair.id}
                type="button"
                disabled={revealed}
                onClick={() => handleLeftClick(pair.id)}
                className={`rounded-bub p-3 text-left transition ${
                  isSelected
                    ? "ring-2 ring-brand bg-brand-soft"
                    : isConnected
                      ? "bg-card"
                      : "bg-card"
                } ${isCorrect ? "ring-2 ring-success" : ""} ${isWrong ? "ring-2 ring-warn" : ""} ${revealed ? "" : "hover:ring-2 hover:ring-hairline"}`}
              >
                <RichBlocks blocks={pair.left} />
              </button>
            );
          })}
        </div>

        {/* Connection indicators */}
        <div className="flex flex-col justify-around">
          {pairs.map((pair) => {
            const connected = connections[pair.id];
            return (
              <div key={pair.id} className="flex items-center justify-center">
                {connected ? (
                  <span className="text-xl text-brand">—</span>
                ) : (
                  <span className="text-lg text-hairline">·</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2">
          {rightItems.map((item) => {
            const isConnectedTo = Object.entries(connections).find(
              ([, rid]) => rid === item.id,
            );
            const isConnected = !!isConnectedTo;

            return (
              <button
                key={item.id}
                type="button"
                disabled={revealed}
                onClick={() => handleRightClick(item.id)}
                className={`rounded-bub p-3 text-left transition ${
                  isConnected ? "ring-2 ring-brand bg-brand-soft" : "bg-card"
                } ${revealed ? "" : "hover:ring-2 hover:ring-hairline"}`}
              >
                <RichBlocks blocks={item.content} />
              </button>
            );
          })}
        </div>
      </div>

      {!revealed && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allMatched}
            className="rounded-pill bg-brand px-6 py-3 font-display font-semibold text-white shadow-bub transition hover:bg-brand-deep disabled:opacity-50"
          >
            Check answer
          </button>
        </div>
      )}
    </div>
  );
}
