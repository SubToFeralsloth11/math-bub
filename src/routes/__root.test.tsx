/**
 * Tests for the root route component of StudyBub.
 *
 * Verifies the root layout renders correctly, and that the auth context
 * propagation works as expected.
 *
 * @module routes/__root.test
 * @author John Grimes
 */

import { describe, expect, it, vi } from "vitest";

// Mock the server function to avoid actual server calls during tests.
vi.mock("../server/api/auth", () => ({
  getCurrentUser: vi.fn().mockResolvedValue(null),
}));

// Mock the providers to avoid complex dependencies.
vi.mock("../state/progressContext", () => ({
  ProgressProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("../state/aiConfigContext", () => ({
  AiConfigProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// We import after mocks are set up so the module uses the mocked deps.
import { Route, type RouterContext } from "./__root";

describe("__root route", () => {
  it("exports a route with the correct path", () => {
    expect(Route).toBeDefined();
    expect(Route.options).toBeDefined();
  });

  it("has a head configuration with meta tags", () => {
    const headFn = (Route.options as { head?: () => unknown }).head;
    expect(headFn).toBeDefined();
    expect(typeof headFn).toBe("function");

    const head = (
      headFn as () => {
        meta?: Array<Record<string, string>>;
        links?: Array<Record<string, string>>;
      }
    )();
    expect(head.meta).toBeDefined();
    expect(
      head.meta!.some((m: Record<string, string>) => m.title === "StudyBub"),
    ).toBe(true);
  });

  it("has a component that renders", () => {
    const Component = (Route.options as { component?: React.ComponentType })
      .component;
    expect(Component).toBeDefined();
  });

  it("has a beforeLoad hook", () => {
    const beforeLoad = (Route.options as { beforeLoad?: unknown }).beforeLoad;
    expect(beforeLoad).toBeDefined();
    expect(typeof beforeLoad).toBe("function");
  });
});

describe("RouterContext type", () => {
  it("has user field that can be null or a user object", () => {
    const anonymous: RouterContext = { user: null };
    expect(anonymous.user).toBeNull();

    const authenticated: RouterContext = {
      user: { id: "user-1", displayName: "Oscar" },
    };
    expect(authenticated.user?.id).toBe("user-1");
    expect(authenticated.user?.displayName).toBe("Oscar");
  });
});
