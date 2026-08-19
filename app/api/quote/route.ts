import { NextResponse } from "next/server";
import { getMailer, filesToAttachments, escapeHtml, sendToEach } from "../../../src/lib/mailer";
import { NOTIFY_EMAILS } from "../../../src/lib/site";

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
  let mailer: ReturnType<typeof getMailer>;
  try {
    mailer = getMailer();
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

  const attachments = await filesToAttachments(photos);

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

  const { ok, failures } = await sendToEach(mailer, NOTIFY_EMAILS, {
    subject: `Quote request from ${name}`,
    html,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!ok) {
    console.error("quote email failed for all recipients:", failures);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  if (failures.length) {
    console.error("quote email partially failed:", failures);
  }

  return NextResponse.json({ ok: true });
}
