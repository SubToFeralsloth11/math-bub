import { createServerFn } from "@tanstack/react-start";

import { getDatabase } from "../../server/db";
import { decryptAiConfig, encryptAiConfig } from "../../server/encryption";

import { requireUserId } from "./requireUserId";

import type { AiConfig } from "../../domain/persistence/aiConfig";

/**
 * Validates that an unknown value matches the AiConfig shape.
 *
 * @param value - The value to validate.
 * @returns True if the value is a valid AiConfig.
 */
function isValidAiConfig(value: unknown): value is AiConfig {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Record<string, unknown>).baseUrl === "string" &&
    typeof (value as Record<string, unknown>).apiKey === "string" &&
    typeof (value as Record<string, unknown>).model === "string"
  );
}

/**
 * Loads the authenticated user's AI provider configuration (decrypted) from
 * the database.
 */
export const loadAiConfig = createServerFn({ method: "GET" }).handler(
  async () => {
    const userId = await requireUserId();
    const db = getDatabase();

    const row = db
      .query(
        "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
          "FROM users WHERE id = ?",
      )
      .get(userId) as
      | {
          ai_config_encrypted: string | null;
          ai_config_iv: string | null;
          ai_config_auth_tag: string | null;
        }
      | undefined;

    if (
      !row ||
      !row.ai_config_encrypted ||
      !row.ai_config_iv ||
      !row.ai_config_auth_tag
    ) {
      return null;
    }

    const config = await decryptAiConfig(
      row.ai_config_encrypted,
      row.ai_config_iv,
      row.ai_config_auth_tag,
    );

    if (!isValidAiConfig(config)) {
      return null;
    }

    return config;
  },
);

/**
 * Encrypts and persists the AI provider configuration.
 */
export const saveAiConfig = createServerFn({ method: "POST" })
  .validator((data: { config: AiConfig }) => data)
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const db = getDatabase();

    if (!isValidAiConfig(data.config)) {
      throw new Error("Invalid AI config.");
    }

    const encrypted = await encryptAiConfig(data.config);

    db.run(
      "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
        "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
      [
        encrypted.ciphertext,
        encrypted.iv,
        encrypted.authTag,
        new Date().toISOString(),
        userId,
      ],
    );

    return { ok: true };
  });

/**
 * Removes the AI configuration for the authenticated user.
 */
export const clearAiConfig = createServerFn({ method: "POST" }).handler(
  async () => {
    const userId = await requireUserId();
    const db = getDatabase();

    db.run(
      "UPDATE users SET ai_config_encrypted = NULL, ai_config_iv = NULL, " +
        "ai_config_auth_tag = NULL, updated_at = ? WHERE id = ?",
      [new Date().toISOString(), userId],
    );

    return { ok: true };
  },
);
