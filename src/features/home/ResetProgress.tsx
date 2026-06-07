import { useRef } from "react";

import { Button } from "../../components/Button";
import { resetProgress } from "../../domain/persistence/storage";
import { useProgress } from "../../state/progressContext";

/**
 * A "Reset progress" control guarded by an explicit confirmation dialog, so a
 * learner cannot wipe their progress by accident (FR-026). The native dialog
 * element provides modal focus management and Escape-to-close for free.
 *
 * @returns The reset control and its confirmation dialog.
 */
export function ResetProgress() {
  const { dispatch } = useProgress();
  const dialogRef = useRef<HTMLDialogElement>(null);

  function confirmReset() {
    resetProgress();
    dispatch({ type: "RESET" });
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="font-display text-sm font-semibold text-muted transition hover:text-warn"
      >
        Reset progress
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="reset-title"
        className="m-auto rounded-bub p-0 backdrop:bg-ink/40"
      >
        <div className="max-w-sm p-6">
          <h2 id="reset-title" className="text-xl text-ink">
            Reset all progress?
          </h2>
          <p className="mt-2 text-muted">
            This clears every completed lesson, your XP, level, streak and
            badges on this device. It can&apos;t be undone.
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </Button>
            <Button onClick={confirmReset} className="bg-warn hover:bg-warn">
              Reset everything
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
