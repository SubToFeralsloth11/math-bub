/**
 * Shared test helper for rendering components inside the app's router and
 * progress provider.
 *
 * Uses TanStack Router's RouterProvider with createBrowserHistory for
 * route matching. The router is pre-loaded before rendering so that route
 * components resolve synchronously for Testing Library assertions.
 *
 * @module test/renderApp
 * @author John Grimes
 */

import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { act, render, type RenderResult } from "@testing-library/react";

import { appContent } from "../content";
import { AiConfigProvider } from "../state/aiConfigContext";
import { ProgressProvider } from "../state/progressContext";

import type { AppContent } from "../domain/content/types";
import type { ReactElement } from "react";

interface RenderOptions {
  /** Initial router entry (URL). */
  route?: string;
  /** The TanStack Router path pattern (use $param syntax, relative to root). */
  path?: string;
  /** Content to provide; defaults to the real authored content. */
  content?: AppContent;
}

/**
 * Renders an element within TanStack Router's RouterProvider and
 * ProgressProvider, optionally mounting it at a specific route path so
 * URL params resolve via useParams.
 *
 * Pre-loads the router so that route components render synchronously.
 * Callers must `await` the returned promise for assertions to work
 * against the rendered content.
 *
 * @param element - The element (or route element) to render.
 * @param options - Routing and content options.
 * @returns A promise resolving to the Testing Library render result.
 */
export async function renderApp(
  element: ReactElement,
  options: RenderOptions = {},
): Promise<RenderResult> {
  const { route = "/", path, content = appContent } = options;

  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const history = createBrowserHistory();

  let router;
  if (path) {
    const testRoute = createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: () => element,
    });
    const routeTree = rootRoute.addChildren([testRoute]);
    // Push history before creating the router so it picks up the correct
    // initial location.
    history.push(route);
    router = createRouter({ routeTree, history });
  } else {
    const testRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => element,
    });
    const routeTree = rootRoute.addChildren([testRoute]);
    router = createRouter({ routeTree, history });
  }

  // Pre-load the router so route components resolve synchronously.
  await router.load();

  let result: RenderResult;
  await act(async () => {
    result = render(
      <ProgressProvider content={content}>
        <AiConfigProvider>
          <RouterProvider router={router} />
        </AiConfigProvider>
      </ProgressProvider>,
    );
  });
  // Flush any pending effects from providers (hydration).
  await act(async () => {});
  return result!;
}

/**
 * Renders an element inside a minimal TanStack Router context, without
 * the full app provider stack. The router is pre-loaded so that Link and
 * other router-dependent hooks work synchronously.
 *
 * @param element - The element to render inside the router context.
 * @param route - Optional initial route (defaults to "/").
 * @returns A promise resolving to the Testing Library render result.
 */
export async function renderInRouter(
  element: ReactElement,
  route: string = "/",
): Promise<RenderResult> {
  const rootRoute = createRootRoute({
    component: () => <>{element}</>,
  });
  const routeTree = rootRoute.addChildren([]);
  const history = createBrowserHistory();
  if (route !== "/") {
    history.push(route);
  }
  const router = createRouter({ routeTree, history });
  await router.load();

  let result: RenderResult;
  await act(async () => {
    result = render(<RouterProvider router={router} />);
  });
  // Flush any pending effects from providers.
  await act(async () => {});
  return result!;
}
