import sharp from "sharp";
import nodemailer, { type Transporter } from "nodemailer";
import { LIMITS } from "./formGuard";

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

const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif|gif|avif)$/i;

function isImage(file: File): boolean {
  return file.type.startsWith("image/") || IMAGE_EXT.test(file.name);
}

// Filenames come from the visitor: keep a short, harmless basename and only
// ever re-use a known image extension.
function safeBase(name: string): string {
  const base = (name || "photo").replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "_").replace(/^_+|_+$/g, "");
  return (base || "photo").slice(0, 40);
}

export async function filesToAttachments(files: File[]) {
  const attachments: { filename: string; content: Buffer }[] = [];

  // Only real images, within the same limits the forms enforce client-side.
  // Anything else (an executable, a PDF, an oversized file) is dropped rather
  // than forwarded into the workers' inbox.
  const accepted = files.filter((f) => f.size > 0 && f.size <= LIMITS.photoBytes && isImage(f)).slice(0, LIMITS.photos);

  for (const file of accepted) {
    const original = Buffer.from(await file.arrayBuffer());
    const baseName = safeBase(file.name);

    try {
      const compressed = await sharp(original)
        .rotate() // apply EXIF orientation before stripping metadata
        .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
      attachments.push({ filename: `${baseName}.jpg`, content: compressed });
    } catch {
      // Image format sharp can't decode (e.g. some HEIC files) - still send
      // the original so the client's upload never silently vanishes, but only
      // under a known image extension.
      const ext = (file.name.match(IMAGE_EXT)?.[0] ?? ".jpg").toLowerCase();
      attachments.push({ filename: `${baseName}${ext}`, content: original });
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
