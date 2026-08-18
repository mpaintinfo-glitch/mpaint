import { getTranslations } from "next-intl/server";
import { SERVICE_ORDER, SERVICE_SLUGS } from "../../src/data/services";
import { SITE_URL, BUSINESS } from "../../src/lib/site";

export async function GET() {
  const catalog = await getTranslations({ locale: "en", namespace: "catalog" });

  const serviceLines = SERVICE_ORDER.map(
    (id) => `- [${catalog(id)}](${SITE_URL}/en/services/${SERVICE_SLUGS[id]})`
  ).join("\n");

  const body = `# Mpaint

> Car painting and bodywork workshop in Tallinn, Estonia. Full resprays, single-panel painting, welding and structural bodywork, rust removal, dent removal, and polishing.

Mpaint is a car painting and body repair workshop based at ${BUSINESS.address.streetAddress}, ${BUSINESS.address.postalCode} ${BUSINESS.address.addressLocality}, Estonia. Every painting job is carried out in the workshop's own filtered paint booth. The site is available in Estonian (default), Russian, and English.

## Services

${serviceLines}

## Key pages

- [Home](${SITE_URL}/en): overview of the workshop and services
- [All services](${SITE_URL}/en/services): full service list with an FAQ
- [Contact](${SITE_URL}/en/contact): phone, WhatsApp, email, address, opening hours

Estonian versions of every page are at the same paths without the /en prefix (e.g. ${SITE_URL}/services). Russian versions are under /ru (e.g. ${SITE_URL}/ru/services).

## Contact

- Phone / WhatsApp: ${BUSINESS.phone}
- Email: ${BUSINESS.email}
- Address: ${BUSINESS.address.streetAddress}, ${BUSINESS.address.postalCode} ${BUSINESS.address.addressLocality}, Estonia
- Hours: Monday-Friday ${BUSINESS.hours.opens}-${BUSINESS.hours.closes}, Saturday by agreement, closed Sunday
- Registry code: ${BUSINESS.registryCode}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
