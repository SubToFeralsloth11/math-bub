import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

/**
 * Creates a new TanStack Router instance for the StudyBub application.
 * The route tree is auto-generated from the file-based routes under
 * `src/routes/`.
 *
 * @returns A configured router instance.
 */
export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
  });
}

// Register the router instance for type safety across the application.
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
