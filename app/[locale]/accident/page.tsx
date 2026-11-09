import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "../../../src/i18n/navigation";
import { slugsForLocale } from "../../../src/data/services";
import { articleSlugsForLocale, getArticleContent } from "../../../src/data/blog";
import { localeAlternates } from "../../../src/lib/alternates";
import { SITE_URL } from "../../../src/lib/site";
import { dropBanner } from "../../../src/assets";
import Icon from "../../../src/components/Icon";
import Footer from "../../../src/components/Footer";
import OpenQuoteButton from "../../../src/components/OpenQuoteButton";
import BreadcrumbJsonLd from "../../../src/components/BreadcrumbJsonLd";

type Section = { heading: string; paragraphs: string[] };
type FaqItem = { q: string; a: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accident.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/accident") };
}

const RELATED_SERVICE_IDS = ["body", "paint"] as const;
const RELATED_ARTICLE_IDS = ["accidentFirstSteps", "bumperRepair"] as const;

export default async function AccidentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const sections = t.raw("accident.sections") as Section[];
  const faq = t.raw("accident.faq") as FaqItem[];
  const serviceSlugs = slugsForLocale(locale);
  const articleSlugs = articleSlugsForLocale(locale);

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("accident.h1"), url: `${SITE_URL}${getPathname({ href: "/accident", locale })}` },
  ];

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(45svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" loading="eager" sizes="(max-width: 768px) 36vw, 480px" />
        <div className="container center" style={{ maxWidth: 820 }}>
          <h1>{t("accident.h1")}</h1>
          <p className="sub">{t("accident.intro")}</p>
        </div>
      </section>

      <section className="sec svc-detail-sec">
        <div className="container" style={{ maxWidth: 720 }}>
          {sections.map((section, i) => (
            <div className="article-section" key={i}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}

          <div className="svc-group" style={{ marginTop: "var(--sp-32)" }}>
            <div className="svc-warning-note">
              <Icon id="i-shield" />
              <p>{t("accident.safetyNote")}</p>
            </div>
          </div>

          <div className="article-section">
            <h2>{t("accident.towingHeading")}</h2>
            <p>{t("accident.towingText")}</p>
          </div>

          <div className="container center" style={{ marginTop: "2rem" }}>
            <OpenQuoteButton className="btn btn-fill btn-lg">{t("accident.cta")}</OpenQuoteButton>
          </div>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="sec">
          <div className="container seo-surface">
            <div className="seo-block seo-block--first">
              <h2>{t("accident.faqTitle")}</h2>
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
              {RELATED_SERVICE_IDS.map((svcId) => (
                <Link
                  key={svcId}
                  href={{ pathname: "/services/[slug]", params: { slug: serviceSlugs[svcId] } }}
                  className="link"
                >
                  {t(`catalog.${svcId}`)}
                </Link>
              ))}
            </div>
          </div>

          <div className="seo-block" style={{ textAlign: "center" }}>
            <h3>{t("blog.relatedArticlesHeading")}</h3>
            <div className="svc-related-links">
              {RELATED_ARTICLE_IDS.map((articleId) => (
                <Link
                  key={articleId}
                  href={{ pathname: "/blog/[slug]", params: { slug: articleSlugs[articleId] } }}
                  className="link"
                >
                  {getArticleContent(locale, articleId).title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
