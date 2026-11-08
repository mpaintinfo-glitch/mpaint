// Server-side guards shared by /api/quote and /api/contact.
//
// Both endpoints are anonymous, send email through the owner's mailbox and run
// sharp on uploads, so they need to refuse oversized, malformed or flooding
// requests before doing any of that work. The limits mirror what the forms
// already enforce client-side (5 photos, JPEG-compressed to <= 1600px), so
// real visitors never hit them.

export const LIMITS = {
  name: 100,
  phone: 40,
  email: 254,
  carInfo: 200,
  notes: 3000,
  message: 3000,
  photos: 5,
  photoBytes: 12 * 1024 * 1024,
} as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function isEmail(value: string): boolean {
  return value.length <= LIMITS.email && EMAIL_RE.test(value);
}

/**
 * Browsers always send an Origin header on a cross-site or same-site fetch POST.
 * If one is present and does not match this host, the request came from another
 * website and is refused. Requests without Origin (curl, server-to-server) pass
 * through to the other checks.
 */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Best-effort, per-server-instance limiter: 5 submissions per IP per 10 minutes
// per endpoint. On serverless hosting each warm instance keeps its own memory,
// so this blunts bursts but is not a substitute for edge-level protection
// (Vercel WAF rate limit or a CAPTCHA such as Cloudflare Turnstile).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function rateLimited(req: Request, bucket: string): boolean {
  const ip =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const blocked = recent.length >= MAX_HITS;
  if (!blocked) recent.push(now);
  hits.set(key, recent);
  if (hits.size > 2000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return blocked;
}

export function withinLimits(fields: [string, number][]): boolean {
  return fields.every(([value, max]) => value.length <= max);
}

/** Single-line form fields (name, phone, car) must never carry line breaks into an email header or subject. */
export function singleLine(value: string): string {
  return value.replace(/\p{Cc}+/gu, " ").trim();
}
