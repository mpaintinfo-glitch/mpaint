import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "../../../src/i18n/navigation";
import { slugsForLocale } from "../../../src/data/services";
import { articleSlugsForLocale, getArticleContent } from "../../../src/data/blog";
import { localeAlternates } from "../../../src/lib/alternates";
import { SITE_URL } from "../../../src/lib/site";
import { dropBanner, photoPaint } from "../../../src/assets";
import Icon from "../../../src/components/Icon";
import Footer from "../../../src/components/Footer";
import OpenQuoteButton from "../../../src/components/OpenQuoteButton";
import BreadcrumbJsonLd from "../../../src/components/BreadcrumbJsonLd";

type FaqItem = { q: string; a: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "minorDamage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, () => "/minor-damage"),
  };
}

export default async function MinorDamagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const bullets = t.raw("minorDamage.bullets") as string[];
  const process = t.raw("minorDamage.process") as string[];
  const faq = t.raw("minorDamage.faq") as FaqItem[];
  const serviceSlugs = slugsForLocale(locale);
  const articleSlugs = articleSlugsForLocale(locale);

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("catalog.paint"), url: `${SITE_URL}${getPathname({ href: { pathname: "/services/[slug]", params: { slug: serviceSlugs.paint } }, locale })}` },
    { name: t("minorDamage.h1"), url: `${SITE_URL}${getPathname({ href: "/minor-damage", locale })}` },
  ];

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" />
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="svc-page-layout">
            <h1 className="svc-page-title">{t("minorDamage.h1")}</h1>
            <div className="svc-page-photo">
              <Image src={photoPaint} alt={t("minorDamage.h1")} />
            </div>
            <div className="svc-page-desc">
              <p className="sub">{t("minorDamage.tagline")}</p>
              <p className="svc-pricing-note svc-pricing-note--hero">{t("minorDamage.timingNote")}</p>
            </div>
            <div className="svc-page-actions">
              <OpenQuoteButton service="paint" className="btn btn-fill btn-lg">
                {t("minorDamage.cta")}
              </OpenQuoteButton>
            </div>
          </div>
        </div>
      </section>

      <section className="sec svc-detail-sec">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="svc-group">
            <h4 className="svc-group-label">{t("minorDamage.bulletsHeading")}</h4>
            <ul className="svc-chip-list">
              {bullets.map((b, i) => (
                <li className="svc-chip" key={i}>
                  <span className="svc-chip-ic"><Icon id="i-check" /></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="article-section">
            <h2>{t("minorDamage.processHeading")}</h2>
            <ol className="svc-process">
              {process.map((step, i) => (
                <li key={i}>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="svc-group">
            <p>{t("minorDamage.pricingNote")}</p>
          </div>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="sec">
          <div className="container seo-surface">
            <div className="seo-block seo-block--first">
              <h2>{t("minorDamage.faqTitle")}</h2>
              <div className="faq-list">
                {faq.map((item, i) => (
                  <div className="faq-item" key={i}>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sec section-compact">
        <div className="container">
          <div className="seo-block seo-block--first" style={{ textAlign: "center" }}>
            <h3>{t("services.relatedHeading")}</h3>
            <div className="svc-related-links">
              <Link href={{ pathname: "/services/[slug]", params: { slug: serviceSlugs.paint } }} className="link">
                {t("catalog.paint")}
              </Link>
              <Link href={{ pathname: "/services/[slug]", params: { slug: serviceSlugs.polish } }} className="link">
                {t("catalog.polish")}
              </Link>
            </div>
          </div>

          <div className="seo-block" style={{ textAlign: "center" }}>
            <h3>{t("blog.relatedArticlesHeading")}</h3>
            <div className="svc-related-links">
              <Link href={{ pathname: "/blog/[slug]", params: { slug: articleSlugs.rustRepair } }} className="link">
                {getArticleContent(locale, "rustRepair").title}
              </Link>
              <Link href={{ pathname: "/blog/[slug]", params: { slug: articleSlugs.paintingProcess } }} className="link">
                {getArticleContent(locale, "paintingProcess").title}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
