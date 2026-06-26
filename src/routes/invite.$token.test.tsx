/**
 * Tests for the invitation registration screen component.
 *
 * @module routes/invite.$token.test
 * @author John Grimes
 */

// Mock declarations must come before all imports for Vitest hoisting.
vi.mock("../server/api/auth", () => ({
  getPasskeyRegistrationOptions: vi.fn(),
  verifyPasskeyRegistration: vi.fn(),
}));

vi.mock("@simplewebauthn/browser", () => ({
  startRegistration: vi.fn(),
}));

vi.mock("@tanstack/react-start", () => ({
  useServerFn: vi.fn(),
}));

import { startRegistration } from "@simplewebauthn/browser";
import { useServerFn } from "@tanstack/react-start";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Route } from "./invite.$token";
import {
  getPasskeyRegistrationOptions,
  verifyPasskeyRegistration,
} from "../server/api/auth";

// Render helper that accesses the route's component via its options.
const InviteComponent = (Route.options as { component: React.ComponentType })
  .component;

// Mock the route's useParams so we can render the component outside of a
// router context and still have the token param available.
beforeEach(() => {
  vi.spyOn(Route, "useParams").mockReturnValue({
    token: "test-token-123",
  } as any);
});

describe("InviteScreen", () => {
  beforeEach(() => {
    // Default: pass-through so non-redirect tests work without extra setup.
    vi.mocked(useServerFn).mockImplementation((fn: any) => fn);
  });

  it("shows loading state initially", () => {
    vi.mocked(getPasskeyRegistrationOptions).mockImplementationOnce(
      () => new Promise(() => {}),
    );

    render(<InviteComponent />);
    expect(screen.getByText("Loading invitation…")).toBeInTheDocument();
  });

  it("shows display name from a valid token", async () => {
    vi.mocked(getPasskeyRegistrationOptions).mockResolvedValueOnce({
      challenge: "test-challenge",
      rp: { name: "StudyBub" },
      displayName: "Oscar",
    } as any);

    render(<InviteComponent />);

    await waitFor(() => {
      expect(screen.getByText("Welcome, Oscar")).toBeInTheDocument();
    });
  });

  it("shows error for an invalid or expired token", async () => {
    vi.mocked(getPasskeyRegistrationOptions).mockRejectedValueOnce(
      new Error("Invalid invitation link."),
    );

    render(<InviteComponent />);

    await waitFor(() => {
      expect(screen.getByText("Invalid invitation link.")).toBeInTheDocument();
    });
  });

  it("shows error for an already-consumed token", async () => {
    vi.mocked(getPasskeyRegistrationOptions).mockRejectedValueOnce(
      new Error("This invitation has already been used."),
    );

    render(<InviteComponent />);

    await waitFor(() => {
      expect(
        screen.getByText("This invitation has already been used."),
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Go to the sign-in page")).toBeInTheDocument();
  });

  it("renders the register button when token is valid", async () => {
    vi.mocked(getPasskeyRegistrationOptions).mockResolvedValueOnce({
      challenge: "test-challenge",
      rp: { name: "StudyBub" },
      displayName: "Oscar",
    } as any);

    render(<InviteComponent />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /register your passkey/i }),
      ).toBeInTheDocument();
    });
  });

  it("does not render register button when token is invalid", async () => {
    vi.mocked(getPasskeyRegistrationOptions).mockRejectedValueOnce(
      new Error("Invalid invitation link."),
    );

    render(<InviteComponent />);

    await waitFor(() => {
      expect(screen.getByText("Invalid invitation link.")).toBeInTheDocument();
    });
    expect(
      screen.queryByRole("button", { name: /register/i }),
    ).not.toBeInTheDocument();
  });

  it("navigates to home after successful registration", async () => {
    const user = userEvent.setup();
    const mockOptions = {
      challenge: "test-challenge",
      rp: { name: "StudyBub" },
      displayName: "Oscar",
    };
    const mockCredential = { id: "cred-1", rawId: "raw", response: {} };
    const mockNavigate = vi.fn();

    vi.mocked(useServerFn).mockImplementation((serverFn: any) => {
      return async (...args: any[]) => {
        try {
          return await serverFn(...args);
        } catch (error: any) {
          // Simulate useServerFn's redirect handling: call navigate on redirect.
          if (error?.message?.includes("redirect")) {
            mockNavigate({ to: "/" });
            return;
          }
          throw error;
        }
      };
    });
    vi.mocked(getPasskeyRegistrationOptions).mockResolvedValue(
      mockOptions as any,
    );
    vi.mocked(startRegistration).mockResolvedValueOnce(mockCredential as any);
    vi.mocked(verifyPasskeyRegistration).mockRejectedValueOnce(
      new Error("redirect to /"),
    );

    render(<InviteComponent />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /register your passkey/i }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: /register your passkey/i }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("navigates to home when registration resolves with a redirect", async () => {
    const user = userEvent.setup();
    const mockOptions = {
      challenge: "test-challenge",
      rp: { name: "StudyBub" },
      displayName: "Oscar",
    };
    const mockCredential = { id: "cred-1", rawId: "raw", response: {} };
    const mockNavigate = vi.fn();

    vi.mocked(useServerFn).mockImplementation((serverFn: any) => {
      return async (...args: any[]) => {
        try {
          const result = await serverFn(...args);
          // If the server returned a redirect response, handle it.
          if (result?.message?.includes("redirect")) {
            mockNavigate({ to: "/" });
            return;
          }
          return result;
        } catch (error: any) {
          if (error?.message?.includes("redirect")) {
            mockNavigate({ to: "/" });
            return;
          }
          throw error;
        }
      };
    });
    vi.mocked(getPasskeyRegistrationOptions).mockResolvedValue(
      mockOptions as any,
    );
    vi.mocked(startRegistration).mockResolvedValueOnce(mockCredential as any);
    // Server returns a redirect response rather than throwing.
    (vi.mocked(verifyPasskeyRegistration) as any).mockResolvedValueOnce(
      new Error("redirect to /"),
    );

    render(<InviteComponent />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /register your passkey/i }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: /register your passkey/i }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("shows cancellation message when user cancels registration", async () => {
    const user = userEvent.setup();
    const mockOptions = {
      challenge: "test-challenge",
      rp: { name: "StudyBub" },
      displayName: "Oscar",
    };

    vi.mocked(getPasskeyRegistrationOptions).mockResolvedValue(
      mockOptions as any,
    );
    const cancelError = new Error("User cancelled");
    cancelError.name = "NotAllowedError";
    vi.mocked(startRegistration).mockRejectedValueOnce(cancelError);

    render(<InviteComponent />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /register your passkey/i }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: /register your passkey/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText("Passkey registration was cancelled."),
      ).toBeInTheDocument();
    });
  });
});
