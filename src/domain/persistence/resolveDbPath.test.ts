import {
  DB_PATH_ENV_VAR,
  DEFAULT_DB_PATH,
  resolveDbPath,
} from "./resolveDbPath";

/**
 * Tests for the shared database path resolver. The resolver is the single
 * source of truth used by both the running server and the management CLI,
 * so it is critical that its precedence rules hold in all combinations.
 */
describe("resolveDbPath", () => {
  it("returns the explicit path when one is provided", () => {
    expect(resolveDbPath("/var/lib/studybub/data.db", {})).toBe(
      "/var/lib/studybub/data.db",
    );
  });

  it("explicit path wins over the environment variable", () => {
    const env = { [DB_PATH_ENV_VAR]: "/from/env/data.db" };
    expect(resolveDbPath("/explicit/data.db", env)).toBe("/explicit/data.db");
  });

  it("falls back to the environment variable when no explicit path is given", () => {
    const env = { [DB_PATH_ENV_VAR]: "/var/lib/studybub/data.db" };
    expect(resolveDbPath(undefined, env)).toBe("/var/lib/studybub/data.db");
  });

  it("uses the default when neither an explicit path nor the env var is set", () => {
    expect(resolveDbPath(undefined, {})).toBe(DEFAULT_DB_PATH);
  });

  it("ignores an empty environment variable and uses the default", () => {
    const env = { [DB_PATH_ENV_VAR]: "" };
    expect(resolveDbPath(undefined, env)).toBe(DEFAULT_DB_PATH);
  });

  it("ignores an undefined environment variable and uses the default", () => {
    const env: Record<string, string | undefined> = {
      [DB_PATH_ENV_VAR]: undefined,
    };
    expect(resolveDbPath(undefined, env)).toBe(DEFAULT_DB_PATH);
  });

  it("does not mutate the environment object passed to it", () => {
    const env = { [DB_PATH_ENV_VAR]: "/from/env/data.db" };
    resolveDbPath(undefined, env);
    expect(env).toEqual({ [DB_PATH_ENV_VAR]: "/from/env/data.db" });
  });
});
