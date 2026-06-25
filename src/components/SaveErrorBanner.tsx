import { useProgress } from "../state/progressContext";

/**
 * A banner displayed at the top of the app when progress persistence fails.
 * The message guides the learner to retry or check their connection.
 *
 * @returns The error banner element, or null when saves are healthy.
 */
export function SaveErrorBanner() {
  const { saveStatus } = useProgress();

  if (saveStatus !== "error") {
    return null;
  }

  return (
    <div className="bg-warn/10 px-4 py-2 text-center text-sm text-warn">
      Could not save your progress. Your answers are still recorded locally and
      will sync when the connection is restored.
    </div>
  );
}
