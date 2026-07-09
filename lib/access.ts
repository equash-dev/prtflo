import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Site-wide access gate. The cookie stores an HMAC keyed by SITE_PASSWORD
 * over a fixed context string — never the password itself. Rotating the
 * password invalidates every issued cookie.
 */

const TOKEN_CONTEXT = 'prtflo.access.v1';

export const ACCESS_COOKIE = 'prtflo.access';

export function computeAccessToken(password: string): string {
  return createHmac('sha256', password).update(TOKEN_CONTEXT).digest('hex');
}

/** Timing-safe password check: both sides are HMAC'd to equal-length digests. */
export function isCorrectPassword(attempt: string): boolean {
  const password = process.env.SITE_PASSWORD;
  if (!password) return false;
  return timingSafeEqual(
    Buffer.from(computeAccessToken(attempt), 'hex'),
    Buffer.from(computeAccessToken(password), 'hex'),
  );
}

/** Fails closed: no SITE_PASSWORD or no cookie means no access. */
export function isValidAccessToken(candidate: string | undefined): boolean {
  const password = process.env.SITE_PASSWORD;
  if (!password || !candidate) return false;
  const expected = Buffer.from(computeAccessToken(password), 'hex');
  const actual = Buffer.from(candidate, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
