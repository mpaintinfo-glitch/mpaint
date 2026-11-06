import { SITE_URL } from "../lib/site";

type Item = { name: string; url: string };

export default function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Item[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    about: { "@id": `${SITE_URL}/#business` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: item.url,
        name: item.name,
      })),
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
