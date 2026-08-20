import { NextResponse } from "next/server";
import { getMailer, filesToAttachments, escapeHtml, sendToEach } from "../../../src/lib/mailer";
import { NOTIFY_EMAILS } from "../../../src/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let mailer: ReturnType<typeof getMailer>;
  try {
    mailer = getMailer();
  } catch {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const formData = await req.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const attachments = await filesToAttachments(photos);

  const html = `
    <h2>Uus sõnum kodulehelt</h2>
    <p><strong>Nimi:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone) || "-"}</p>
    <p><strong>Sõnum:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    <p><strong>Fotosid lisatud:</strong> ${attachments.length}</p>
  `;

  const { ok, failures } = await sendToEach(mailer, NOTIFY_EMAILS, {
    replyTo: email,
    subject: `Sõnum: ${name}`,
    html,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!ok) {
    console.error("contact email failed for all recipients:", failures);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  if (failures.length) {
    console.error("contact email partially failed:", failures);
  }

  return NextResponse.json({ ok: true });
}
