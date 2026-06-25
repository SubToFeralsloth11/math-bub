import { useSession } from "@tanstack/react-start/server";

/**
 * The session data shape. Only the authenticated user ID is stored in the
 * session; all other user data is queried from the database on each request.
 */
export interface SessionData {
  userId: string;
}

/**
 * Returns a configured session instance for the StudyBub application.
 * The session is backed by a signed HTTP-only cookie.
 *
 * The `SESSION_SECRET` environment variable must be set to a string of at
 * least 32 characters. Generate with: `openssl rand -hex 32`.
 *
 * @returns A session instance for reading and updating session data.
 * @throws If SESSION_SECRET is not set.
 */
export function useAppSession() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET environment variable is not set. " +
        "Generate with: openssl rand -hex 32",
    );
  }

  return useSession<SessionData>({
    name: "studybub-session",
    password: secret,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days.
    },
  });
}
