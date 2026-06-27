/**
 * Reconstructs the WebAuthn relying party ID and origin from a raw request
 * URL and (optionally) the `X-Forwarded-Proto` header.
 *
 * This is needed because the production deployment terminates TLS at nginx
 * and proxies to the Bun server over plain HTTP. Without honouring the
 * forwarded scheme, the server would compute an `http://` origin while the
 * browser's WebAuthn response carries the true `https://` origin, causing
 * `verifyRegistrationResponse` / `verifyAuthenticationResponse` to reject the
 * ceremony with an origin mismatch.
 *
 * @param rawUrl - The raw request URL as the server sees it.
 * @param forwardedProto - The value of the `X-Forwarded-Proto` header, if
 *   present. May be a single value or a comma-separated list (as produced by
 *   chained proxies); the first entry wins.
 * @returns The relying party ID (hostname) and the reconstructed origin.
 */
export function resolveRpInfo(
  rawUrl: string,
  forwardedProto?: string | string[] | null,
): { rpId: string; origin: string } {
  const url = new URL(rawUrl);

  if (forwardedProto !== undefined && forwardedProto !== null) {
    const protoList = (
      Array.isArray(forwardedProto) ? forwardedProto.join(",") : forwardedProto
    )
      .split(",")[0]
      ?.trim();
    if (protoList) {
      // Strip any trailing colon so "https" and "https:" both work.
      url.protocol = `${protoList.replace(/:$/, "")}:`;
    }
  }

  return { rpId: url.hostname, origin: url.origin };
}
