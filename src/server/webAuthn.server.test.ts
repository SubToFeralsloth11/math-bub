/**
 * Unit tests for the WebAuthn server helpers.
 *
 * The helpers wrap `@simplewebauthn/server`'s low-level functions so that the
 * rest of the server can stay generic. Each wrapper is exercised through a
 * mocked implementation of the underlying library so the call contracts
 * (arguments, success/failure branches) can be asserted independently of the
 * cryptography.
 *
 * @module server/webAuthn.server.test
 * @author John Grimes
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

// Mockable handles for each simplewebauthn function the module wraps.
const authn = vi.hoisted(() => ({
  genReg: vi.fn(),
  genAuth: vi.fn(),
  verifyReg: vi.fn(),
  verifyAuth: vi.fn(),
}));

vi.mock("@simplewebauthn/server", () => ({
  generateRegistrationOptions: authn.genReg,
  generateAuthenticationOptions: authn.genAuth,
  verifyRegistrationResponse: authn.verifyReg,
  verifyAuthenticationResponse: authn.verifyAuth,
}));

import {
  generateAuthenticationOptions,
  generateChallenge,
  generateRegistrationOptions,
  verifyAuthentication,
  verifyRegistration,
} from "./webAuthn.server";

describe("generateRegistrationOptions", () => {
  beforeEach(() => authn.genReg.mockReset());

  it("delegates to the library and returns its options", async () => {
    const options = {
      challenge: "reg-challenge",
      rp: {},
    } as unknown as Awaited<ReturnType<typeof generateRegistrationOptions>>;
    authn.genReg.mockResolvedValue(options);

    const out = await generateRegistrationOptions(
      { id: "user-1", displayName: "Oscar" },
      "localhost",
    );

    expect(out).toBe(options);
    expect(authn.genReg).toHaveBeenCalledTimes(1);
  });

  it("encodes the user id and passes the StudyBub relying-party config", async () => {
    authn.genReg.mockResolvedValue({ challenge: "c" });
    await generateRegistrationOptions(
      { id: "user-1", displayName: "Oscar" },
      "localhost",
    );

    const arg = authn.genReg.mock.calls[0][0];
    expect(arg.rpName).toBe("StudyBub");
    expect(arg.rpID).toBe("localhost");
    expect(arg.userName).toBe("Oscar");
    expect(arg.userDisplayName).toBe("Oscar");
    expect(arg.attestationType).toBe("none");
    expect(arg.authenticatorSelection).toEqual({
      residentKey: "preferred",
      userVerification: "preferred",
    });
    expect(arg.supportedAlgorithmIDs).toEqual([-7, -257]);
    // The user id is supplied as encoded bytes, not the raw string.
    expect(arg.userID).toBeInstanceOf(Uint8Array);
    expect(new TextDecoder().decode(arg.userID)).toBe("user-1");
  });
});

describe("verifyRegistration", () => {
  beforeEach(() => authn.verifyReg.mockReset());

  it("returns the credential info on a verified registration", async () => {
    const credential = {
      id: "cred-1",
      publicKey: new Uint8Array([1, 2]),
      counter: 3,
    };
    authn.verifyReg.mockResolvedValue({
      verified: true,
      registrationInfo: { credential },
    });

    const result = await verifyRegistration(
      { id: "x" } as never,
      "challenge",
      "localhost",
      "http://localhost:3000",
    );

    expect(result.credential).toBe(credential);
    expect(authn.verifyReg).toHaveBeenCalledWith({
      response: { id: "x" },
      expectedChallenge: "challenge",
      expectedOrigin: "http://localhost:3000",
      expectedRPID: "localhost",
    });
  });

  it("throws when verification is not verified", async () => {
    authn.verifyReg.mockResolvedValue({
      verified: false,
      registrationInfo: undefined,
    });

    await expect(
      verifyRegistration(
        {} as never,
        "c",
        "localhost",
        "http://localhost:3000",
      ),
    ).rejects.toThrow("Passkey registration verification failed.");
  });

  it("throws when verification is true but registrationInfo is missing", async () => {
    authn.verifyReg.mockResolvedValue({
      verified: true,
      registrationInfo: undefined,
    });

    await expect(
      verifyRegistration(
        {} as never,
        "c",
        "localhost",
        "http://localhost:3000",
      ),
    ).rejects.toThrow("Passkey registration verification failed.");
  });
});

describe("generateAuthenticationOptions", () => {
  beforeEach(() => authn.genAuth.mockReset());

  it("delegates to the library with the relying-party id", async () => {
    const options = { challenge: "auth-challenge" } as unknown as Awaited<
      ReturnType<typeof generateAuthenticationOptions>
    >;
    authn.genAuth.mockResolvedValue(options);

    const out = await generateAuthenticationOptions("localhost");

    expect(out).toBe(options);
    expect(authn.genAuth).toHaveBeenCalledWith({
      rpID: "localhost",
      userVerification: "preferred",
    });
  });
});

describe("verifyAuthentication", () => {
  beforeEach(() => authn.verifyAuth.mockReset());

  it("returns the new counter on a verified assertion", async () => {
    authn.verifyAuth.mockResolvedValue({
      verified: true,
      authenticationInfo: { newCounter: 7 },
    });

    const result = await verifyAuthentication(
      { id: "cred-1" } as never,
      "challenge",
      "localhost",
      "http://localhost:3000",
      {
        credentialId: "cred-1",
        publicKey: new Uint8Array([1, 2]),
        counter: 0,
      },
    );

    expect(result).toEqual({ newCounter: 7 });
    const arg = authn.verifyAuth.mock.calls[0][0];
    expect(arg.expectedChallenge).toBe("challenge");
    expect(arg.expectedOrigin).toBe("http://localhost:3000");
    expect(arg.expectedRPID).toBe("localhost");
    expect(arg.credential.id).toBe("cred-1");
    expect(arg.credential.counter).toBe(0);
  });

  it("forwards stored transports when present", async () => {
    authn.verifyAuth.mockResolvedValue({
      verified: true,
      authenticationInfo: { newCounter: 1 },
    });

    await verifyAuthentication(
      { id: "cred-1" } as never,
      "challenge",
      "localhost",
      "http://localhost:3000",
      {
        credentialId: "cred-1",
        publicKey: new Uint8Array([1]),
        counter: 0,
        transports: ["internal", "hybrid"],
      },
    );

    expect(authn.verifyAuth.mock.calls[0][0].credential.transports).toEqual([
      "internal",
      "hybrid",
    ]);
  });

  it("throws when verification fails", async () => {
    authn.verifyAuth.mockResolvedValue({
      verified: false,
      authenticationInfo: { newCounter: 1 },
    });

    await expect(
      verifyAuthentication(
        { id: "cred-1" } as never,
        "challenge",
        "localhost",
        "http://localhost:3000",
        { credentialId: "cred-1", publicKey: new Uint8Array([1]), counter: 0 },
      ),
    ).rejects.toThrow("Passkey authentication verification failed.");
  });
});

describe("generateChallenge", () => {
  it("produces a base64url string with no padding", () => {
    const challenge = generateChallenge();

    // 32 random bytes encode to 44 base64 chars minus one '=' pad → 43 chars.
    expect(challenge).toHaveLength(43);
    expect(challenge).not.toMatch(/[+/=]/);
  });

  it("produces a different challenge on each call", () => {
    const a = generateChallenge();
    const b = generateChallenge();
    expect(a).not.toBe(b);
  });
});
