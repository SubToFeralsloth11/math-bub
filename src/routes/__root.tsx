import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import { ErrorBoundary } from "../components/ErrorBoundary";
import { SaveErrorBanner } from "../components/SaveErrorBanner";
import { appContent } from "../content";
import { getCurrentUser } from "../server/api/auth";
import { AiConfigProvider } from "../state/aiConfigContext";
import { ProgressProvider } from "../state/progressContext";

import type { ReactNode } from "react";

import "../index.css";

/**
 * The router context passed to all child routes via the root route.
 */
export interface RouterContext {
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
      { charSet: "utf8" },
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
      <ProgressShell>
        <Outlet />
      </ProgressShell>
    </RootDocument>
  );
}

/**
 * Wraps children in the ProgressProvider and renders the save error
 * banner inside the provider so it can read saveStatus.
 */
function ProgressShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ProgressProvider content={appContent}>
      <SaveErrorBanner />
      <AiConfigProvider>{children}</AiConfigProvider>
    </ProgressProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
