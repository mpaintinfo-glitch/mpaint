import { NextResponse } from "next/server";
import { getResend, filesToAttachments, escapeHtml } from "../../../src/lib/mailer";
import { NOTIFY_EMAILS, FROM_EMAIL } from "../../../src/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let resend: ReturnType<typeof getResend>;
  try {
    resend = getResend();
  } catch {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const formData = await req.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "");
  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  let attachments;
  try {
    attachments = await filesToAttachments(photos);
  } catch {
    return NextResponse.json({ error: "Photos too large" }, { status: 413 });
  }

  const html = `
    <h2>New message from the site</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || "-"}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    <p><strong>Submitted from:</strong> ${escapeHtml(locale)} version of the site</p>
    <p><strong>Photos attached:</strong> ${attachments.length}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAILS,
      replyTo: email,
      subject: `Message from ${name}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
