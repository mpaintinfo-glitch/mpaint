import sharp from "sharp";
import nodemailer, { type Transporter } from "nodemailer";

// Resize/compress so 5 full-resolution phone photos (often 8-12MB each)
// reliably fit in one email instead of occasionally blowing the size limit
// and silently killing the whole send. 1600px on the long edge and JPEG
// q78 is still plenty to judge paint/body damage from.
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 78;

export function getMailer() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD is not set");
  }
  // Gmail requires the From address to match the authenticated account
  // (it silently rewrites/rejects a mismatched From), so the sender
  // identity is derived here rather than passed in per call site.
  const from = `"Mpaint website" <${user}>`;
  return { transport: nodemailer.createTransport({ service: "gmail", auth: { user, pass } }), from };
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
 * Sends one real email addressed to everyone at once (real To + Cc headers,
 * not N separate copies), so workers and the owner land in the same thread
 * and a "Reply All" naturally reaches everyone. Previously this fired an
 * independent SMTP call per recipient (needed for Resend's old sandbox
 * restrictions); plain Gmail SMTP has no such per-recipient restriction, so
 * a single combined send is both simpler and the correct behavior for a
 * shared inbox + CC'd owner setup.
 */
export async function sendNotification(
  mailer: { transport: Transporter; from: string },
  recipients: { to: string[]; cc?: string[] },
  message: { subject: string; html: string; replyTo?: string; attachments?: { filename: string; content: Buffer }[] }
) {
  try {
    await mailer.transport.sendMail({
      ...message,
      from: mailer.from,
      to: recipients.to,
      cc: recipients.cc,
    });
    return { ok: true, failures: [] as string[] };
  } catch (err) {
    return { ok: false, failures: [String(err)] };
  }
}
