/**
 * Shared test helper for rendering components inside the app's router and
 * progress provider.
 *
 * @module test/renderApp
 * @author John Grimes
 */

import { render, type RenderResult } from "@testing-library/react";
import {
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

import { appContent } from "../content";
import { AiConfigProvider } from "../state/aiConfigContext";
import { ProgressProvider } from "../state/progressContext";
import { routeTree } from "../routeTree.gen";

import type { ReactElement } from "react";

/**
 * Creates a test router that can render components within the app's routing
 * and progress context.
 *
 * @param element - Optional element to render as a route.
 * @returns The testing library render result.
 */
export function renderApp(
  element: ReactElement,
): RenderResult {
  const router = createRouter({
    routeTree,
    scrollRestoration: false,
  });

  return render(
    <ProgressProvider content={appContent}>
      <AiConfigProvider>
        <RouterProvider router={router} />
        {element}
      </AiConfigProvider>
    </ProgressProvider>,
  );
}
