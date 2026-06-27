import { resolveRpInfo } from "../../server/rpInfo";

/**
 * Unit tests for {@link resolveRpInfo}.
 *
 * This test lives under src/test/ (rather than co-located with the module
 * under src/server/) because the project's main Vitest config excludes the
 * server test directory - those server tests are intended to run in a separate
 * bun-pool Vitest project that is not yet wired up. Keeping this test under
 * src/test/ ensures it actually runs as part of `bun run test`.
 */
describe("resolveRpInfo", () => {
  it("returns the hostname and origin from a direct request URL", () => {
    expect(resolveRpInfo("http://localhost:3000/invite/abc")).toEqual({
      rpId: "localhost",
      origin: "http://localhost:3000",
    });
  });

  it("honours the X-Forwarded-Proto header to reconstruct the TLS origin", () => {
    // nginx terminates TLS and proxies to http://localhost:3000, so the raw
    // request URL is http while the browser actually used https.
    const result = resolveRpInfo(
      "http://studybub.syntaxrewrite.com/invite/abc",
      "https",
    );
    expect(result).toEqual({
      rpId: "studybub.syntaxrewrite.com",
      origin: "https://studybub.syntaxrewrite.com",
    });
  });

  it("uses the first value when X-Forwarded-Proto is a comma-separated list", () => {
    expect(resolveRpInfo("http://example.org/", "https, https")).toEqual({
      rpId: "example.org",
      origin: "https://example.org",
    });
  });

  it("ignores an empty X-Forwarded-Proto header and falls back to the URL scheme", () => {
    expect(resolveRpInfo("http://example.org/", "")).toEqual({
      rpId: "example.org",
      origin: "http://example.org",
    });
  });
});
