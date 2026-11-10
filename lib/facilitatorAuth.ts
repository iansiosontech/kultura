import crypto from "crypto";

export const FACILITATOR_COOKIE_NAME = "facilitator_session";

// HMAC of a fixed message keyed by the shared password — the cookie never
// carries the password itself, just a value only someone who knows it
// could have produced. Good enough for "one password the facilitators
// share," not meant to be bank-grade auth.
export function createSessionToken(): string | null {
  const key = process.env.FACILITATOR_PASSWORD;
  if (!key) return null;
  return crypto.createHmac("sha256", key).update("facilitator-session").digest("hex");
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  const expected = createSessionToken();
  if (!expected || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
