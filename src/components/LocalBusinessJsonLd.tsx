import { getTranslations } from "next-intl/server";
import { SERVICE_ORDER, SERVICE_SLUGS } from "../data/services";
import { SITE_URL, BUSINESS } from "../lib/site";

export default async function LocalBusinessJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "catalog" });
  const prefix = locale === "et" ? "" : `/${locale}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
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
          url: `${SITE_URL}${prefix}/services/${SERVICE_SLUGS[id]}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
