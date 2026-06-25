import {
  startRegistration,
} from "@simplewebauthn/browser";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  getPasskeyRegistrationOptions,
  verifyPasskeyRegistration,
} from "./api/auth";

import { Button } from "../components/Button";
import { Card } from "../components/Card";

/**
 * The invitation registration screen. Reached via an invitation link
 * containing a single-use token. Shows the learner's display name from the
 * token and prompts them to register a passkey.
 */
export const Route = createFileRoute("/invite/$token")({
  component: InviteScreen,
});

function InviteScreen() {
  const { token } = Route.useParams();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [optionsLoaded, setOptionsLoaded] = useState(false);

  // Fetch registration options on mount to validate the token and show the
  // display name.
  useEffect(() => {
    let cancelled = false;

    async function fetchOptions() {
      try {
        const result = await getPasskeyRegistrationOptions({
          data: { token },
        });
        if (!cancelled) {
          setDisplayName(result.displayName);
          setOptionsLoaded(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Invalid invitation link.",
          );
        }
      }
    }

    fetchOptions();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleRegister() {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get registration options (includes the challenge).
      const options = await getPasskeyRegistrationOptions({
        data: { token },
      });

      // Step 2: Use the browser's WebAuthn API to create a passkey.
      const credential = await startRegistration({
        optionsJSON: options,
      });

      // Step 3: Send the credential to the server for verification.
      // The server stores the credential, marks the token as consumed,
      // and creates a session.
      await verifyPasskeyRegistration({
        data: { token, credential },
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("redirect")) {
          return; // Success - the router will handle the redirect.
        }
        if (err.name === "NotAllowedError") {
          setError("Passkey registration was cancelled.");
        } else {
          setError(err.message || "Registration failed. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  // Show a loading state while fetching the token info.
  if (!optionsLoaded && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface p-4">
        <Card className="w-full max-w-sm p-8 text-center">
          <p className="text-muted">Loading invitation…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      <Card className="w-full max-w-sm p-8 text-center">
        {displayName && (
          <>
            <h1 className="font-display text-2xl font-bold text-ink">
              Welcome, {displayName}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Set up your passkey to get started with StudyBub.
            </p>
          </>
        )}

        {error && (
          <div className="mt-4 rounded-bub bg-warn/10 px-3 py-2 text-sm text-warn">
            <p>{error}</p>
            {error.includes("already been used") && (
              <p className="mt-1">
                <a href="/login" className="underline">
                  Go to the sign-in page
                </a>
              </p>
            )}
          </div>
        )}

        {displayName && !error && (
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="mt-6 w-full"
          >
            {loading ? "Registering…" : "Register your passkey"}
          </Button>
        )}
      </Card>
    </div>
  );
}
