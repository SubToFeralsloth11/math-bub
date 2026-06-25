import {
  startAuthentication,
} from "@simplewebauthn/browser";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  getPasskeyAuthenticationOptions,
  verifyPasskeyAuthentication,
} from "./api/auth";

import { Button } from "../components/Button";
import { Card } from "../components/Card";

/**
 * The login screen. Displays a "Sign in with passkey" button that triggers
 * the WebAuthn authentication flow. No username or password entry is
 * required - the passkey credential identifies the user.
 */
export const Route = createFileRoute("/login")({
  component: LoginScreen,
});

function LoginScreen() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get authentication options from the server.
      const options = await getPasskeyAuthenticationOptions();

      // Step 2: Use the browser's WebAuthn API to sign the challenge.
      const credential = await startAuthentication({
        optionsJSON: options,
      });

      // Step 3: Send the signed credential to the server for verification.
      // The server creates a session and redirects to the home page on
      // success.
      await verifyPasskeyAuthentication({ data: { credential } });
    } catch (err) {
      // The server may throw a redirect to / on success, which appears as
      // an error in the catch block. Ignore that case.
      if (err instanceof Error) {
        if (err.message.includes("redirect")) {
          return; // Success - the router will handle the redirect.
        }
        if (err.name === "NotAllowedError") {
          setError("Sign-in was cancelled.");
        } else {
          setError(err.message || "Sign-in failed. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      <Card className="w-full max-w-sm p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">
          StudyBub
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to continue learning
        </p>

        {error && (
          <p className="mt-4 rounded-bub bg-warn/10 px-3 py-2 text-sm text-warn">
            {error}
          </p>
        )}

        <Button
          onClick={handleSignIn}
          disabled={loading}
          className="mt-6 w-full"
        >
          {loading ? "Signing in…" : "Sign in with passkey"}
        </Button>
      </Card>
    </div>
  );
}
