export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    name: "Mpaint",
    image: "https://mpaint.ee/mpaint-workshop.jpg",
    url: "https://mpaint.ee",
    telephone: "+372 58-100-810",
    email: "info@mpaint.ee",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Magasini tn 31",
      postalCode: "10138",
      addressLocality: "Tallinn",
      addressCountry: "EE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.4221934,
      longitude: 24.7583585,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Harju maakond",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Registry code",
      value: "14939293",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
