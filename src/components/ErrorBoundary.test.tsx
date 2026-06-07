import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "./ErrorBoundary";

/** A component that throws during render, to trip the boundary. */
function Boom(): never {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("renders its children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("shows a recovery fallback when a child throws", () => {
    // The thrown error is expected; silence React's error logging for it.
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/something popped/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reload mathbub/i }),
    ).toBeInTheDocument();
  });
});
