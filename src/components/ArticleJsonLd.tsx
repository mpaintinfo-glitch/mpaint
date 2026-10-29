import { SITE_URL, BUSINESS } from "../lib/site";

type Props = {
  title: string;
  description: string;
  url: string;
  locale: string;
  datePublished: string;
  dateModified?: string;
};

// Author/publisher is the business itself, not a named person - no
// individual author identity is verified, so we attribute transparently
// to Mpaint rather than inventing a named mechanic or writer.
export default function ArticleJsonLd({ title, description, url, locale, datePublished, dateModified }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    inLanguage: locale,
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: url,
    publisher: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
    author: { "@type": "Organization", name: BUSINESS.name, url: SITE_URL },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
