import { NextResponse } from "next/server";
import { getMailer, filesToAttachments, escapeHtml, sendNotification } from "../../../src/lib/mailer";
import { NOTIFY_TO, NOTIFY_CC } from "../../../src/lib/site";

export const runtime = "nodejs";

const SERVICE_LABEL: Record<string, string> = {
  paint: "Autovärvimine",
  body: "Keevitus ja kerekojatööd",
  dent: "Mõlkide eemaldamine",
  rust: "Roostetõrje",
  polish: "Poleerimine",
  parts: "Osade vahetus",
  other: "Pole kindel / muu",
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
  const email = String(formData.get("email") ?? "").trim();
  const carInfo = String(formData.get("carInfo") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const services = formData.getAll("services").map(String);
  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File);

  if (!name || !phone || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const attachments = await filesToAttachments(photos);

  const serviceLabels = services.map((id) => SERVICE_LABEL[id] ?? id).join(", ") || "-";

  const html = `
    <h2>Uus hinnapäring</h2>
    <p><strong>Nimi:</strong> ${escapeHtml(name)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
    <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
    <p><strong>Teenused:</strong> ${escapeHtml(serviceLabels)}</p>
    <p><strong>Auto:</strong> ${escapeHtml(carInfo) || "-"}</p>
    <p><strong>Märkused:</strong> ${escapeHtml(notes) || "-"}</p>
    <p><strong>Fotosid lisatud:</strong> ${attachments.length}</p>
  `;

  const { ok, failures } = await sendNotification(mailer, { to: NOTIFY_TO, cc: NOTIFY_CC }, {
    replyTo: email,
    subject: `Hinnapäring: ${name}`,
    html,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!ok) {
    console.error("quote email failed:", failures);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
