import { getTranslations } from "next-intl/server";
import { jsonLd } from "../lib/jsonLd";
import { SERVICE_ORDER, slugsForLocale } from "../data/services";
import { getPathname } from "../i18n/navigation";
import { SITE_URL, BUSINESS } from "../lib/site";

export default async function LocalBusinessJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "catalog" });
  const slugs = slugsForLocale(locale);

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    image: `${SITE_URL}/mpaint-workshop.jpg`,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...BUSINESS.geo,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.hours.days,
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Harju maakond",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Registry code",
      value: BUSINESS.registryCode,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mpaint services",
      itemListElement: SERVICE_ORDER.map((id) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t(id),
          url: `${SITE_URL}${getPathname({ href: { pathname: "/services/[slug]", params: { slug: slugs[id] } }, locale })}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
