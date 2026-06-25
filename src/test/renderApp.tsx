/**
 * Shared test helper for rendering components inside the app's router and
 * progress provider.
 *
 * @module test/renderApp
 */

import { render, type RenderResult } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { appContent } from "../content";
import { AiConfigProvider } from "../state/aiConfigContext";
import { ProgressProvider } from "../state/progressContext";

import type { AppContent } from "../domain/content/types";
import type { ReactElement } from "react";

interface RenderOptions {
  /** Initial router entry (URL). */
  route?: string;
  /** The route path pattern to match `element` against. */
  path?: string;
  /** Content to provide; defaults to the real authored content. */
  content?: AppContent;
}

/**
 * Renders an element within a MemoryRouter and ProgressProvider, optionally
 * mounting it at a specific route path so URL params resolve.
 *
 * @param element - The element (or route element) to render.
 * @param options - Routing and content options.
 * @returns The Testing Library render result.
 */
export function renderApp(
  element: ReactElement,
  options: RenderOptions = {},
): RenderResult {
  const { route = "/", path, content = appContent } = options;
  return render(
    <ProgressProvider content={content}>
      <AiConfigProvider>
        <MemoryRouter initialEntries={[route]}>
          {path ? (
            <Routes>
              <Route path={path} element={element} />
            </Routes>
          ) : (
            element
          )}
        </MemoryRouter>
      </AiConfigProvider>
    </ProgressProvider>,
  );
}
