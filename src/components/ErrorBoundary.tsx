import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  /** The subtree this boundary protects. */
  children: ReactNode;
}

interface ErrorBoundaryState {
  /** True once a render error has been caught. */
  hasError: boolean;
}

/**
 * Application-level error boundary.
 *
 * This is the single class component permitted by the project's React rules,
 * because React exposes no functional error-boundary API. It catches render
 * errors in its subtree and shows a kind, actionable fallback rather than a
 * blank screen (FR-028), with a control to recover by reloading.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * Creates the boundary with a clean (no-error) state.
   *
   * @param props - The boundary props, including the protected children.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Maps a thrown render error to the error state.
   *
   * @returns The next state flagging that an error occurred.
   */
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  /**
   * Logs the caught error so the failure is observable rather than silent.
   *
   * @param error - The error that was thrown during rendering.
   * @param info - React-supplied component stack information.
   */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("MathBub render error:", error, info.componentStack);
  }

  /**
   * Renders the protected children, or a recovery fallback after an error.
   *
   * @returns The children when healthy, otherwise the fallback UI.
   */
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <div className="flex size-20 items-center justify-center rounded-full bg-warn-soft text-3xl">
            🫧
          </div>
          <h1 className="text-2xl text-ink">Something popped</h1>
          <p className="text-muted">
            MathBub hit an unexpected snag. Your saved progress is safe - reload
            to pick up where you left off.
          </p>
          <button
            type="button"
            onClick={() => globalThis.location.reload()}
            className="rounded-pill bg-brand px-6 py-3 font-display font-semibold text-white shadow-bub transition hover:bg-brand-deep"
          >
            Reload MathBub
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
