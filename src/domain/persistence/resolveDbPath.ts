/**
 * Database path resolution for StudyBub.
 *
 * This module is the single source of truth for how the SQLite database
 * path is chosen. Both the running server (`src/server/db.server.ts`) and
 * the management CLI (`scripts/migrate.ts`) call `resolveDbPath` so that a
 * script run on the server host opens the same database the server uses.
 *
 * Resolution order:
 *   1. An explicit path passed by the caller (for example a `--db` flag).
 *   2. The `STUDYBUB_DB_PATH` environment variable.
 *   3. The default `studybub.db` in the current working directory.
 *
 * This module has no React, DOM, or Bun-specific dependencies so it can be
 * unit-tested in the standard node test pool.
 *
 * @author John Grimes
 */

/** The environment variable used to configure the database path. */
export const DB_PATH_ENV_VAR = "STUDYBUB_DB_PATH";

/** The default database file name, relative to the working directory. */
export const DEFAULT_DB_PATH = "studybub.db";

/**
 * Resolves the SQLite database path. An explicit path always wins; otherwise
 * the `STUDYBUB_DB_PATH` environment variable is consulted; otherwise the
 * default `studybub.db` is used.
 *
 * @param explicitPath - Optional explicit path passed by the caller.
 * @param env - Optional environment record (defaults to `process.env`). Pass
 *   an explicit record in tests to avoid mutating the real environment.
 * @returns The resolved database file path.
 */
export function resolveDbPath(
  explicitPath?: string,
  env: Record<string, string | undefined> = process.env,
): string {
  if (explicitPath) {
    return explicitPath;
  }
  const envValue = env[DB_PATH_ENV_VAR];
  if (envValue) {
    return envValue;
  }
  return DEFAULT_DB_PATH;
}
