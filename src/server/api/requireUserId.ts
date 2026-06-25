import { useAppSession } from "../../server/session";

/**
 * Retrieves the authenticated user's ID from the session, throwing an
 * error if no session exists.
 *
 * @returns The authenticated user's ID.
 * @throws If the user is not authenticated.
 */
export async function requireUserId(): Promise<string> {
  const session = await useAppSession();
  const sessionData = session.data as Record<string, unknown>;
  const userId = sessionData.userId as string | undefined;
  if (!userId) {
    throw new Error("Sign in required.");
  }
  return userId;
}
