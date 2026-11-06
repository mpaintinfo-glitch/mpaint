import { SITE_URL } from "../lib/site";

type Img = { url: string; caption: string };

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
// only fields backed by the CaseStudy record itself.
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
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: locale,
    ...(dateModified ? { dateModified } : {}),
    about: { "@id": `${SITE_URL}/#business` },
    mentions: { "@type": "Service", name: serviceName, url: serviceUrl },
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      url: img.url,
      caption: img.caption,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
