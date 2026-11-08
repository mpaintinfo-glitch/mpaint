import { jsonLd } from "../lib/jsonLd";

type Crumb = { name: string; url: string };

export default function BreadcrumbJsonLd({ items, id }: { items: Crumb[]; id?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
