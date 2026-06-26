/**
 * Tests for the login screen component.
 *
 * @module routes/login.test
 * @author John Grimes
 */

// Mock declarations must come before all imports for Vitest hoisting.
vi.mock("../server/api/auth", () => ({
  getPasskeyAuthenticationOptions: vi.fn(),
  verifyPasskeyAuthentication: vi.fn(),
}));

vi.mock("@simplewebauthn/browser", () => ({
  startAuthentication: vi.fn(),
}));

vi.mock("@tanstack/react-start", () => ({
  useServerFn: vi.fn(),
}));

import { startAuthentication } from "@simplewebauthn/browser";
import { useServerFn } from "@tanstack/react-start";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoginScreen } from "./login";
import {
  getPasskeyAuthenticationOptions,
  verifyPasskeyAuthentication,
} from "../server/api/auth";

beforeEach(() => {
  // Default: pass-through so non-redirect tests work without extra setup.
  vi.mocked(useServerFn).mockImplementation((fn: any) => fn);
});

describe("LoginScreen", () => {
  it("renders the StudyBub heading and sign-in button", () => {
    render(<LoginScreen />);
    expect(screen.getByText("StudyBub")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    ).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<LoginScreen />);
    expect(
      screen.getByText("Sign in to continue learning"),
    ).toBeInTheDocument();
  });

  it("navigates to the home screen after successful authentication", async () => {
    const user = userEvent.setup();
    const mockOptions = { challenge: "test-challenge" };
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
    vi.mocked(getPasskeyAuthenticationOptions).mockResolvedValueOnce(
      mockOptions as any,
    );
    vi.mocked(startAuthentication).mockResolvedValueOnce(mockCredential as any);
    vi.mocked(verifyPasskeyAuthentication).mockRejectedValueOnce(
      new Error("redirect to /"),
    );

    render(<LoginScreen />);
    await user.click(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("navigates to home when verification resolves with a redirect", async () => {
    const user = userEvent.setup();
    const mockOptions = { challenge: "test-challenge" };
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
    vi.mocked(getPasskeyAuthenticationOptions).mockResolvedValueOnce(
      mockOptions as any,
    );
    vi.mocked(startAuthentication).mockResolvedValueOnce(mockCredential as any);
    // Server returns a redirect response rather than throwing.
    (vi.mocked(verifyPasskeyAuthentication) as any).mockResolvedValueOnce(
      new Error("redirect to /"),
    );

    render(<LoginScreen />);
    await user.click(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("shows error state when authentication fails", async () => {
    const user = userEvent.setup();
    vi.mocked(getPasskeyAuthenticationOptions).mockRejectedValueOnce(
      new Error("Passkey not recognised."),
    );

    render(<LoginScreen />);
    await user.click(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    );

    await waitFor(() => {
      expect(screen.getByText("Passkey not recognised.")).toBeInTheDocument();
    });
  });

  it("shows cancellation message when user cancels passkey dialog", async () => {
    const user = userEvent.setup();
    const mockOptions = { challenge: "test-challenge" };
    vi.mocked(getPasskeyAuthenticationOptions).mockResolvedValueOnce(
      mockOptions as any,
    );
    const cancelError = new Error("User cancelled");
    cancelError.name = "NotAllowedError";
    vi.mocked(startAuthentication).mockRejectedValueOnce(cancelError);

    render(<LoginScreen />);
    await user.click(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    );

    await waitFor(() => {
      expect(screen.getByText("Sign-in was cancelled.")).toBeInTheDocument();
    });
  });

  it("disables the button while loading", async () => {
    const user = userEvent.setup();
    // Never resolve to keep it in loading state.
    vi.mocked(getPasskeyAuthenticationOptions).mockImplementationOnce(
      () => new Promise(() => {}),
    );

    render(<LoginScreen />);
    await user.click(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    );

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });
});
