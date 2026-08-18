import { Resend } from "resend";

const MAX_TOTAL_ATTACHMENT_BYTES = 30 * 1024 * 1024; // stay comfortably under Resend's ~40MB request limit

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

export async function filesToAttachments(files: File[]) {
  let total = 0;
  const attachments: { filename: string; content: Buffer }[] = [];
  for (const file of files) {
    total += file.size;
    if (total > MAX_TOTAL_ATTACHMENT_BYTES) {
      throw new Error("Attachments too large");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name || "photo.jpg", content: buffer });
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
