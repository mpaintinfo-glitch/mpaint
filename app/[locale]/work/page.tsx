import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getPathname } from "../../../src/i18n/navigation";
import { publishedCaseStudies, publishedCategories, caseStudySlug } from "../../../src/data/caseStudies";
import { categoryLabel } from "../../../src/lib/caseStudyLabels";
import { localeAlternates } from "../../../src/lib/alternates";
import { SITE_URL } from "../../../src/lib/site";
import { dropBanner } from "../../../src/assets";
import Footer from "../../../src/components/Footer";
import BreadcrumbJsonLd from "../../../src/components/BreadcrumbJsonLd";
import CollectionPageJsonLd from "../../../src/components/CollectionPageJsonLd";
import WorkGalleryGrid from "../../../src/components/WorkGalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/work") };
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: "et" | "ru" | "en" }>;
}) {
  const { locale } = await params;

  // No real case studies yet: the whole route stays unreachable (404)
  // rather than shipping an empty gallery - see src/data/caseStudies.ts.
  const caseStudies = publishedCaseStudies();
  if (caseStudies.length === 0) notFound();

  setRequestLocale(locale);
  const t = await getTranslations();
  const categories = publishedCategories();
  const categoryLabels = Object.fromEntries(categories.map((c) => [c, categoryLabel(c, t)]));

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.booking"), url: `${SITE_URL}${getPathname({ href: "/work", locale })}` },
  ];

  const collectionItems = caseStudies.map((cs) => ({
    name: cs.title[locale],
    url: `${SITE_URL}${getPathname({ href: { pathname: "/work/[slug]", params: { slug: caseStudySlug(cs, locale) } }, locale })}`,
  }));

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionPageJsonLd
        name={t("work.h1")}
        description={t("work.meta.description")}
        url={`${SITE_URL}${getPathname({ href: "/work", locale })}`}
        locale={locale}
        items={collectionItems}
      />

      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(45svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" loading="eager" sizes="(max-width: 768px) 36vw, 480px" />
        <div className="container center" style={{ maxWidth: 760 }}>
          <h1>{t("work.h1")}</h1>
          <p className="sub">{t("work.intro")}</p>
        </div>
      </section>

      <section className="sec section-compact">
        <div className="container" style={{ maxWidth: 1000 }}>
          <WorkGalleryGrid
            caseStudies={caseStudies}
            categories={categories}
            categoryLabels={categoryLabels}
            allLabel={t("work.filterAll")}
            locale={locale}
          />
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
