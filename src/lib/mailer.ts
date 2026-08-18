import sharp from "sharp";
import { Resend } from "resend";

// Resize/compress so 5 full-resolution phone photos (often 8-12MB each)
// reliably fit in one email instead of occasionally blowing the size limit
// and silently killing the whole send. 1600px on the long edge and JPEG
// q78 is still plenty to judge paint/body damage from.
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 78;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

export async function filesToAttachments(files: File[]) {
  const attachments: { filename: string; content: Buffer }[] = [];

  for (const file of files) {
    const original = Buffer.from(await file.arrayBuffer());
    const baseName = (file.name || "photo").replace(/\.[^.]+$/, "");

    try {
      const compressed = await sharp(original)
        .rotate() // apply EXIF orientation before stripping metadata
        .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
      attachments.push({ filename: `${baseName}.jpg`, content: compressed });
    } catch {
      // Unsupported/corrupt format (rare) - still send the original
      // rather than dropping the photo, so the client's upload never
      // just silently vanishes.
      attachments.push({ filename: file.name || "photo.jpg", content: original });
    }
  }

  return attachments;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends the same email to each recipient as an independent Resend call.
 * A failure for one address (e.g. Resend's sandbox-mode restriction on
 * unverified domains rejecting a non-account recipient) never blocks
 * delivery to the others. Returns ok:true if at least one send succeeded.
 */
export async function sendToEach(
  resend: Resend,
  recipients: string[],
  message: { from: string; subject: string; html: string; replyTo?: string; attachments?: { filename: string; content: Buffer }[] }
) {
  const results = await Promise.allSettled(
    recipients.map((to) => resend.emails.send({ ...message, to }))
  );

  const failures: string[] = [];
  let anySucceeded = false;

  results.forEach((result, i) => {
    if (result.status === "fulfilled" && !result.value.error) {
      anySucceeded = true;
    } else {
      const reason =
        result.status === "rejected"
          ? String(result.reason)
          : (result.value.error?.message ?? "unknown error");
      failures.push(`${recipients[i]}: ${reason}`);
    }
  });

  return { ok: anySucceeded, failures };
}
