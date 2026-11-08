import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { routing } from "../../../../src/i18n/routing";
import { Link, getPathname } from "../../../../src/i18n/navigation";
import {
  publishedCaseStudies,
  getCaseStudyBySlug,
  caseStudySlug,
  categoryHref,
  categoryToServiceId,
  type CaseStudyImage,
} from "../../../../src/data/caseStudies";
import { categoryLabel } from "../../../../src/lib/caseStudyLabels";
import { localeAlternates } from "../../../../src/lib/alternates";
import { SITE_URL } from "../../../../src/lib/site";
import { dropBanner } from "../../../../src/assets";
import Footer from "../../../../src/components/Footer";
import OpenQuoteButton from "../../../../src/components/OpenQuoteButton";
import BreadcrumbJsonLd from "../../../../src/components/BreadcrumbJsonLd";
import CaseStudyJsonLd from "../../../../src/components/CaseStudyJsonLd";
import BeforeAfterSlider from "../../../../src/components/BeforeAfterSlider";

type Locale = "et" | "ru" | "en";

const BEFORE_LABEL: Record<Locale, string> = { et: "Enne", ru: "До", en: "Before" };
const AFTER_LABEL: Record<Locale, string> = { et: "Pärast", ru: "После", en: "After" };

// Multi-paragraph fields are stored as one string with blank-line breaks.
const paragraphs = (text: string) => text.split(/\n\s*\n/).filter(Boolean);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    publishedCaseStudies().map((cs) => ({ locale, slug: caseStudySlug(cs, locale) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(locale, slug);
  if (!cs) return {};
  return {
    title: cs.seo ? { absolute: cs.seo.title[locale] } : cs.title[locale],
    description: (cs.seo ?? cs).description[locale],
    alternates: localeAlternates(locale, (l) => ({
      pathname: "/work/[slug]",
      params: { slug: caseStudySlug(cs, l) },
    })),
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(locale, slug);
  if (!cs) notFound();

  setRequestLocale(locale);
  const t = await getTranslations();
  const pageUrl = `${SITE_URL}${getPathname({ href: { pathname: "/work/[slug]", params: { slug } }, locale })}`;
  const serviceId = categoryToServiceId(cs.category);
  const serviceHref = categoryHref(cs.category, locale);
  const serviceUrl = `${SITE_URL}${getPathname({ href: serviceHref, locale })}`;

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.booking"), url: `${SITE_URL}${getPathname({ href: "/work", locale })}` },
    { name: cs.title[locale], url: pageUrl },
  ];

  const toAbsolute = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);
  const schemaImage = (img: CaseStudyImage, label: string, description?: string) => ({
    url: toAbsolute(img.image.src),
    name: `${cs.title[locale]} (${label})`,
    caption: img.alt[locale],
    description,
    width: img.image.width,
    height: img.image.height,
  });
  const schemaImages = [
    schemaImage(cs.before, BEFORE_LABEL[locale], paragraphs(cs.damage[locale])[0]),
    schemaImage(cs.after, AFTER_LABEL[locale], cs.result && paragraphs(cs.result[locale]).join(" ")),
    ...(cs.additionalPhotos ?? []).map((p) => schemaImage(p, cs.title[locale])),
  ];

  const durationLabel =
    cs.durationDays == null
      ? null
      : locale === "ru"
        ? (() => {
            const n = cs.durationDays!;
            const mod10 = n % 10;
            const mod100 = n % 100;
            const word =
              mod10 === 1 && mod100 !== 11
                ? t("work.durationDaySingular")
                : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
                  ? t("work.durationDayPlural")
                  : t("work.durationDayPluralMany");
            return `${n} ${word}`;
          })()
        : `${cs.durationDays} ${cs.durationDays === 1 ? t("work.durationDaySingular") : t("work.durationDayPlural")}`;

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} id={`${pageUrl}#breadcrumb`} />
      <CaseStudyJsonLd
        name={cs.title[locale]}
        description={cs.description[locale]}
        url={pageUrl}
        locale={locale}
        dateModified={cs.lastModified ?? cs.completedDate}
        images={schemaImages}
        serviceName={categoryLabel(cs.category, t)}
        serviceUrl={serviceUrl}
      />

      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(35svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" loading="eager" sizes="(max-width: 768px) 36vw, 480px" />
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/work" className="link svc-page-back">
            {t("work.backToGallery")}
          </Link>
          <h1 className="svc-page-title">{cs.title[locale]}</h1>
          {cs.vehicle && (cs.vehicle.make || cs.vehicle.model) && (
            <p className="sub">
              {t("work.vehicleLabel")}: {[cs.vehicle.make, cs.vehicle.model].filter(Boolean).join(" ")}
            </p>
          )}
          {paragraphs((cs.intro ?? cs.description)[locale]).map((p, i) => (
            <p className="sub" key={i}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="sec svc-detail-sec">
        <div className="container" style={{ maxWidth: 760 }}>
          <BeforeAfterSlider
            before={cs.before.image}
            after={cs.after.image}
            beforeAlt={cs.before.alt[locale]}
            afterAlt={cs.after.alt[locale]}
            beforeLabel={BEFORE_LABEL[locale]}
            afterLabel={AFTER_LABEL[locale]}
            sizes="(max-width: 800px) 100vw, 760px"
            priority
          />

          <div className="article-section">
            <h2>{t("work.damageHeading")}</h2>
            {paragraphs(cs.damage[locale]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="article-section">
            <h2>{t("work.workHeading")}</h2>
            {paragraphs(cs.workPerformed[locale]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {cs.process && cs.process.length > 0 && (
            <div className="article-section">
              <h2>{t("work.processHeading")}</h2>
              <ol className="svc-process">
                {cs.process.map((step, i) => (
                  <li key={i}>
                    <span>{step[locale]}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {cs.result && (
            <div className="article-section">
              <h2>{t("work.resultHeading")}</h2>
              {paragraphs(cs.result[locale]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {cs.considerations && (
            <div className="article-section">
              <h2>{t("work.considerationsHeading")}</h2>
              {paragraphs(cs.considerations[locale]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {cs.materials && (
            <div className="article-section">
              <h2>{t("work.materialsHeading")}</h2>
              <p>{cs.materials[locale]}</p>
            </div>
          )}

          {(durationLabel || cs.completedDate) && (
            <div className="svc-group">
              <ul className="svc-chip-list">
                {durationLabel && (
                  <li className="svc-chip">
                    <span>
                      {t("work.durationLabel")}: {durationLabel}
                    </span>
                  </li>
                )}
                {cs.completedDate && (
                  <li className="svc-chip">
                    <span>
                      {t("work.completedLabel")}: {cs.completedDate}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="container center" style={{ marginTop: "2rem" }}>
            <OpenQuoteButton service={serviceId} className="btn btn-fill btn-lg">
              {cs.cta?.[locale] ?? t("work.cta")}
            </OpenQuoteButton>
          </div>
        </div>
      </section>

      <section className="sec section-compact">
        <div className="container">
          <div className="seo-block seo-block--first" style={{ textAlign: "center" }}>
            <h3>{t("work.relatedServiceHeading")}</h3>
            <div className="svc-related-links">
              <Link href={serviceHref} className="link">
                {categoryLabel(cs.category, t)}
              </Link>
              {(cs.relatedCategories ?? []).map((c) => (
                <Link key={c} href={categoryHref(c, locale)} className="link">
                  {categoryLabel(c, t)}
                </Link>
              ))}
              <Link href="/work" className="link">
                {t("work.backToGallery")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
