import type { ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import { getCurrentUser } from "./api/auth";

import { ErrorBoundary } from "../components/ErrorBoundary";
import { appContent } from "../content";
import { AiConfigProvider } from "../state/aiConfigContext";
import { ProgressProvider } from "../state/progressContext";
import "../index.css";

/**
 * The router context passed to all child routes via the root route.
 */
interface RouterContext {
  /** The authenticated user, or null if not signed in. */
  user: { id: string; displayName: string } | null;
}

/**
 * The root route for StudyBub. Renders the full HTML document shell with meta
 * tags, CSS, fonts, and context providers. The `beforeLoad` hook enforces
 * authentication - unauthenticated users are redirected to `/login`.
 */
export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUser();

    // Allow unauthenticated access to login and invite pages.
    const isPublicPath =
      location.pathname === "/login" ||
      location.pathname.startsWith("/invite/");

    if (!user && !isPublicPath) {
      throw redirect({ to: "/login" });
    }

    return { user };
  },

  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        name: "description",
        content: "StudyBub - a playful, gamified learning platform.",
      },
      { title: "StudyBub" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Lexend:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ErrorBoundary>
          <ProgressProvider content={appContent}>
            <AiConfigProvider>{children}</AiConfigProvider>
          </ProgressProvider>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
