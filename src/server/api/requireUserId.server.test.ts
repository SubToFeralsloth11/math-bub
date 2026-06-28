/**
 * Unit tests for {@link requireUserId}.
 *
 * The helper reads the authenticated user id out of the session. It is tested
 * in isolation so the auth-gated server functions can rely on its contract:
 * return the id when present, throw a clear error otherwise.
 *
 * @module server/api/requireUserId.server.test
 * @author John Grimes
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

// Mutable session state shared between the mocked useSession implementation and
// the tests so each case can drive a different session payload.
const session = vi.hoisted(() => ({
  data: {} as Record<string, unknown>,
}));

vi.mock("@tanstack/react-start/server", () => ({
  useSession: vi.fn(async () => session),
}));

import { requireUserId } from "./requireUserId.server";

describe("requireUserId", () => {
  let originalSecret: string | undefined;

  beforeEach(() => {
    originalSecret = process.env.SESSION_SECRET;
    process.env.SESSION_SECRET = "s".repeat(40);
    session.data = {};
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.SESSION_SECRET;
    } else {
      process.env.SESSION_SECRET = originalSecret;
    }
  });

  it("returns the session userId when authenticated", async () => {
    session.data.userId = "user-123";

    await expect(requireUserId()).resolves.toBe("user-123");
  });

  it("throws 'Sign in required.' when the session has no userId", async () => {
    await expect(requireUserId()).rejects.toThrow("Sign in required.");
  });

  it("throws when userId is present but empty string", async () => {
    session.data.userId = "";

    await expect(requireUserId()).rejects.toThrow("Sign in required.");
  });
});
