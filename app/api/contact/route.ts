import { NextResponse } from "next/server";
import { getMailer, filesToAttachments, escapeHtml, sendNotification } from "../../../src/lib/mailer";
import { NOTIFY_TO, NOTIFY_CC } from "../../../src/lib/site";
import { LIMITS, isEmail, rateLimited, sameOrigin, withinLimits } from "../../../src/lib/formGuard";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (rateLimited(req, "contact")) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let mailer: ReturnType<typeof getMailer>;
  try {
    mailer = getMailer();
  } catch {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (
    !withinLimits([
      [name, LIMITS.name],
      [phone, LIMITS.phone],
      [message, LIMITS.message],
    ])
  ) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
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

  const { ok, failures } = await sendNotification(mailer, { to: NOTIFY_TO, cc: NOTIFY_CC }, {
    replyTo: email,
    subject: `Sõnum: ${name}`,
    html,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!ok) {
    console.error("contact email failed:", failures);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
