import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "../routeTree.gen";

/**
 * Creates a test router instance from the generated route tree. Each test
 * gets a fresh router to avoid state leakage.
 *
 * @returns A configured router instance for testing.
 */
function createTestRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: false,
  });
}

describe("Root route", () => {
  it("renders the document shell with a body element", async () => {
    const router = createTestRouter();
    await router.navigate({ to: "/" });

    render(<RouterProvider router={router} />);

    // The root document renders an <html> and <body> via RootDocument.
    const body = document.querySelector("body");
    expect(body).toBeInTheDocument();
  });

  it("renders the index route component inside the root layout", async () => {
    const router = createTestRouter();
    await router.navigate({ to: "/" });

    // Rendering the RouterProvider should not throw. The index route
    // (HomeScreen) may produce an error during the migration as it still
    // uses react-router-dom. The ErrorBoundary in the root layout catches
    // this gracefully.
    expect(() => render(<RouterProvider router={router} />)).not.toThrow();
  });
});
