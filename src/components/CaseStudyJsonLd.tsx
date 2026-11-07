import { SITE_URL } from "../lib/site";

type Img = {
  url: string;
  name: string;
  caption: string;
  description?: string;
  width: number;
  height: number;
};

type Props = {
  name: string;
  description: string;
  url: string;
  locale: string;
  dateModified?: string;
  images: Img[];
  serviceName: string;
  serviceUrl: string;
};

// WebPage, not Article/BlogPosting (this isn't editorial content) and not
// Product (it's documentation of completed work, not something for sale).
// No AggregateRating, no review markup, no invented author/license/dates -
// only fields backed by the CaseStudy record itself. Nodes carry stable
// @ids (page#webpage, page#image-N, page#breadcrumb) so the page, its
// images, its BreadcrumbList and the shared business entity form one graph.
export default function CaseStudyJsonLd({
  name,
  description,
  url,
  locale,
  dateModified,
  images,
  serviceName,
  serviceUrl,
}: Props) {
  const pageId = `${url}#webpage`;
  const imageId = (i: number) => `${url}#image-${i + 1}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageId,
    name,
    description,
    url,
    inLanguage: locale,
    ...(dateModified ? { dateModified } : {}),
    about: { "@id": `${SITE_URL}/#business` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mentions: { "@type": "Service", name: serviceName, url: serviceUrl, provider: { "@id": `${SITE_URL}/#business` } },
    image: images.map((_, i) => ({ "@id": imageId(i) })),
  };

  const imageNodes = images.map((img, i) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": imageId(i),
    contentUrl: img.url,
    url: img.url,
    name: img.name,
    caption: img.caption,
    ...(img.description ? { description: img.description } : {}),
    width: img.width,
    height: img.height,
    inLanguage: locale,
    isPartOf: { "@id": pageId },
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      {imageNodes.map((node) => (
        <script key={node["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
      ))}
    </>
  );
}
