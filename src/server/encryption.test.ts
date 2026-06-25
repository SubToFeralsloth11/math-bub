/* eslint-disable unicorn/number-literal-case */

import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import {
  decryptAiConfig,
  encryptAiConfig,
  resetEncryptionKey,
} from "./encryption";

import type { AiConfig } from "../domain/persistence/aiConfig";

const VALID_KEY =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

const sampleConfig: AiConfig = {
  baseUrl: "https://api.openai.com/v1/chat/completions",
  apiKey: "sk-test-key-12345",
  model: "gpt-4o",
};

describe("encryptAiConfig", () => {
  let originalKey: string | undefined;

  beforeEach(() => {
    originalKey = process.env.ENCRYPTION_KEY;
    process.env.ENCRYPTION_KEY = VALID_KEY;
    resetEncryptionKey();
  });

  afterEach(() => {
    process.env.ENCRYPTION_KEY = originalKey;
    resetEncryptionKey();
  });

  it("encrypts an AiConfig and returns hex-encoded ciphertext, iv, and authTag", async () => {
    const result = await encryptAiConfig(sampleConfig);
    expect(typeof result.ciphertext).toBe("string");
    expect(typeof result.iv).toBe("string");
    expect(typeof result.authTag).toBe("string");
    // IV should be 12 bytes = 24 hex characters.
    expect(result.iv).toHaveLength(24);
    // Auth tag should be 16 bytes = 32 hex characters.
    expect(result.authTag).toHaveLength(32);
  });

  it("produces different ciphertexts for the same input due to random IV", async () => {
    const result1 = await encryptAiConfig(sampleConfig);
    const result2 = await encryptAiConfig(sampleConfig);
    // IVs should differ.
    expect(result1.iv).not.toBe(result2.iv);
    // Ciphertexts should differ because of different IVs.
    expect(result1.ciphertext).not.toBe(result2.ciphertext);
  });

  it("throws when ENCRYPTION_KEY is not set", async () => {
    resetEncryptionKey();
    delete process.env.ENCRYPTION_KEY;
    await expect(encryptAiConfig(sampleConfig)).rejects.toThrow(
      "ENCRYPTION_KEY",
    );
  });

  it("throws when ENCRYPTION_KEY has invalid length", async () => {
    process.env.ENCRYPTION_KEY = "too-short";
    resetEncryptionKey();
    await expect(encryptAiConfig(sampleConfig)).rejects.toThrow(
      "ENCRYPTION_KEY must be 64 hex characters",
    );
  });
});

describe("decryptAiConfig", () => {
  let originalKey: string | undefined;

  beforeEach(() => {
    originalKey = process.env.ENCRYPTION_KEY;
    process.env.ENCRYPTION_KEY = VALID_KEY;
    resetEncryptionKey();
  });

  afterEach(() => {
    process.env.ENCRYPTION_KEY = originalKey;
    resetEncryptionKey();
  });

  it("round-trip: encrypt then decrypt returns the original AiConfig", async () => {
    const encrypted = await encryptAiConfig(sampleConfig);
    const decrypted = await decryptAiConfig(
      encrypted.ciphertext,
      encrypted.iv,
      encrypted.authTag,
    );
    expect(decrypted).toEqual(sampleConfig);
  });

  it("rejects tampered ciphertext", async () => {
    const encrypted = await encryptAiConfig(sampleConfig);
    // Flip a bit in the ciphertext.
    const tamperedCiphertext =
      encrypted.ciphertext.slice(0, -2) +
      (Number.parseInt(encrypted.ciphertext.slice(-2), 16) ^ 0xff)
        .toString(16)
        .padStart(2, "0");
    await expect(
      decryptAiConfig(tamperedCiphertext, encrypted.iv, encrypted.authTag),
    ).rejects.toThrow("Decryption failed");
  });

  it("rejects tampered auth tag", async () => {
    const encrypted = await encryptAiConfig(sampleConfig);
    const tamperedAuthTag =
      encrypted.authTag.slice(0, -2) +
      (Number.parseInt(encrypted.authTag.slice(-2), 16) ^ 0xff)
        .toString(16)
        .padStart(2, "0");
    await expect(
      decryptAiConfig(encrypted.ciphertext, encrypted.iv, tamperedAuthTag),
    ).rejects.toThrow("Decryption failed");
  });

  it("rejects tampered IV", async () => {
    const encrypted = await encryptAiConfig(sampleConfig);
    const tamperedIv =
      encrypted.iv.slice(0, -2) +
      (Number.parseInt(encrypted.iv.slice(-2), 16) ^ 0xff)
        .toString(16)
        .padStart(2, "0");
    await expect(
      decryptAiConfig(encrypted.ciphertext, tamperedIv, encrypted.authTag),
    ).rejects.toThrow("Decryption failed");
  });

  it("throws when ENCRYPTION_KEY is not set", async () => {
    resetEncryptionKey();
    delete process.env.ENCRYPTION_KEY;
    await expect(
      decryptAiConfig("aa", "bb".repeat(6), "cc".repeat(8)),
    ).rejects.toThrow("ENCRYPTION_KEY");
  });
});
