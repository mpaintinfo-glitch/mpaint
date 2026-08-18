import { NextResponse } from "next/server";
import { getResend, filesToAttachments, escapeHtml } from "../../../src/lib/mailer";
import { NOTIFY_EMAILS, FROM_EMAIL } from "../../../src/lib/site";

export const runtime = "nodejs";

const SERVICE_LABEL: Record<string, string> = {
  paint: "Car painting",
  body: "Welding & bodywork",
  dent: "Dent removal",
  rust: "Rust removal",
  polish: "Polishing",
  parts: "Replacing parts",
  other: "Not sure / other",
};

export async function POST(req: Request) {
  let resend: ReturnType<typeof getResend>;
  try {
    resend = getResend();
  } catch {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const formData = await req.formData();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const carInfo = String(formData.get("carInfo") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const locale = String(formData.get("locale") ?? "");
  const services = formData.getAll("services").map(String);
  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  let attachments;
  try {
    attachments = await filesToAttachments(photos);
  } catch {
    return NextResponse.json({ error: "Photos too large" }, { status: 413 });
  }

  const serviceLabels = services.map((id) => SERVICE_LABEL[id] ?? id).join(", ") || "-";

  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Services:</strong> ${escapeHtml(serviceLabels)}</p>
    <p><strong>Car:</strong> ${escapeHtml(carInfo) || "-"}</p>
    <p><strong>Notes:</strong> ${escapeHtml(notes) || "-"}</p>
    <p><strong>Submitted from:</strong> ${escapeHtml(locale)} version of the site</p>
    <p><strong>Photos attached:</strong> ${attachments.length}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAILS,
      subject: `Quote request from ${name}`,
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
