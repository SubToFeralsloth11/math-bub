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

import { startAuthentication } from "@simplewebauthn/browser";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LoginScreen } from "./login";
import {
  getPasskeyAuthenticationOptions,
  verifyPasskeyAuthentication,
} from "../server/api/auth";

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

  it("calls the authentication flow when the button is clicked", async () => {
    const user = userEvent.setup();
    const mockOptions = { challenge: "test-challenge" };
    const mockCredential = { id: "cred-1", rawId: "raw", response: {} };

    vi.mocked(getPasskeyAuthenticationOptions).mockResolvedValueOnce(
      mockOptions as any,
    );
    vi.mocked(startAuthentication).mockResolvedValueOnce(mockCredential as any);
    // verifyPasskeyAuthentication throws a redirect to /, which we catch.
    vi.mocked(verifyPasskeyAuthentication).mockRejectedValueOnce(
      new Error("redirect to /"),
    );

    render(<LoginScreen />);
    await user.click(
      screen.getByRole("button", { name: /sign in with passkey/i }),
    );

    await waitFor(() => {
      expect(getPasskeyAuthenticationOptions).toHaveBeenCalled();
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
