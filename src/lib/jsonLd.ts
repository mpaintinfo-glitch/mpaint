// Serialises structured data for an inline <script type="application/ld+json">.
// Escaping "<" as < keeps a "</script>" inside any string value from ever
// closing the tag early; JSON parsers read the escape back as "<", so the
// emitted data is identical.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
