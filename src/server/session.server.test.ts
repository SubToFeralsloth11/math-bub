/**
 * Unit tests for {@link useAppSession}.
 *
 * Verifies that the session helper forwards a signed-cookie configuration to
 * the framework `useSession` and that it guards on the `SESSION_SECRET`
 * environment variable.
 *
 * @module server/session.server.test
 * @author John Grimes
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

// Capture the config passed to the framework `useSession` so each test can
// assert on it without depending on the real cookie implementation.
// Capture the config passed to the framework `useSession`. Typed as a record
// (nullable) so the cookie-property assertions can be checked at compile time.
const captured = vi.hoisted(() => ({
  config: null as Record<string, any> | null,
}));

vi.mock("@tanstack/react-start/server", () => ({
  useSession: vi.fn(async (config: Record<string, unknown>) => {
    captured.config = config as Record<string, any>;
    return { data: {} };
  }),
}));

import { useAppSession } from "./session.server";

describe("useAppSession", () => {
  let originalSecret: string | undefined;
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalSecret = process.env.SESSION_SECRET;
    originalNodeEnv = process.env.NODE_ENV;
    captured.config = null;
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.SESSION_SECRET;
    } else {
      process.env.SESSION_SECRET = originalSecret;
    }
    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalNodeEnv;
    }
  });

  it("passes the cookie name and password to the framework useSession", async () => {
    process.env.SESSION_SECRET = "a".repeat(40);
    delete process.env.NODE_ENV;

    await useAppSession();

    expect(captured.config).toMatchObject({
      name: "studybub-session",
      password: "a".repeat(40),
    });
  });

  it("marks the cookie httpOnly and sameSite lax", async () => {
    process.env.SESSION_SECRET = "a".repeat(40);
    delete process.env.NODE_ENV;

    await useAppSession();

    expect(captured.config).toMatchObject({
      cookie: { httpOnly: true, sameSite: "lax" },
    });
  });

  it("sets a 7-day maxAge on the cookie", async () => {
    process.env.SESSION_SECRET = "a".repeat(40);
    delete process.env.NODE_ENV;

    await useAppSession();

    expect(captured.config!.cookie.maxAge).toBe(7 * 24 * 60 * 60);
  });

  it("secures the cookie only in production", async () => {
    process.env.SESSION_SECRET = "a".repeat(40);

    process.env.NODE_ENV = "production";
    await useAppSession();
    expect(captured.config!.cookie.secure).toBe(true);

    process.env.NODE_ENV = "development";
    captured.config = null;
    await useAppSession();
    expect(captured.config!.cookie.secure).toBe(false);
  });

  it("throws a helpful error when SESSION_SECRET is not set", () => {
    delete process.env.SESSION_SECRET;

    // The secret check runs synchronously before useSession is awaited, so the
    // error surfaces as a thrown exception rather than a rejected promise.
    expect(() => useAppSession()).toThrow("SESSION_SECRET");
  });
});
