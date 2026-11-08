import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "../../../../src/i18n/routing";
import { Link, getPathname } from "../../../../src/i18n/navigation";
import {
  ARTICLE_PUBLISHED,
  ARTICLE_RELATED_ARTICLES,
  ARTICLE_RELATED_SERVICES,
  articleSlugsForLocale,
  getArticleBySlug,
  getArticleContent,
} from "../../../../src/data/blog";
import { slugsForLocale } from "../../../../src/data/services";
import { dropBanner } from "../../../../src/assets";
import { localeAlternates } from "../../../../src/lib/alternates";
import { SITE_URL } from "../../../../src/lib/site";
import Footer from "../../../../src/components/Footer";
import OpenQuoteButton from "../../../../src/components/OpenQuoteButton";
import BreadcrumbJsonLd from "../../../../src/components/BreadcrumbJsonLd";
import ArticleJsonLd from "../../../../src/components/ArticleJsonLd";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.values(articleSlugsForLocale(locale)).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = getArticleBySlug(locale, slug);
  if (!id) return {};
  const content = getArticleContent(locale, id);
  return {
    title: content.title,
    description: content.description,
    alternates: localeAlternates(locale, (l) => ({
      pathname: "/blog/[slug]",
      params: { slug: articleSlugsForLocale(l)[id] },
    })),
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const id = getArticleBySlug(locale, slug);
  if (!id) notFound();

  setRequestLocale(locale);
  const t = await getTranslations();
  const content = getArticleContent(locale, id);
  const articleSlugs = articleSlugsForLocale(locale);
  const serviceSlugs = slugsForLocale(locale);
  const relatedArticles = ARTICLE_RELATED_ARTICLES[id];
  const relatedServices = ARTICLE_RELATED_SERVICES[id];
  const articleUrl = `${SITE_URL}${getPathname({
    href: { pathname: "/blog/[slug]", params: { slug } },
    locale,
  })}`;

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.blog"), url: `${SITE_URL}${getPathname({ href: "/blog", locale })}` },
    { name: content.title, url: articleUrl },
  ];

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        url={articleUrl}
        locale={locale}
        datePublished={ARTICLE_PUBLISHED}
      />

      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(45svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" loading="eager" sizes="(max-width: 768px) 36vw, 480px" />
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/blog" className="link svc-page-back">
            {t("blog.backToBlog")}
          </Link>
          <h1 className="svc-page-title">{content.title}</h1>
          <p className="sub">
            {t("blog.publishedOn")} {ARTICLE_PUBLISHED}
          </p>
        </div>
      </section>

      <section className="sec svc-detail-sec">
        <div className="container" style={{ maxWidth: 720 }}>
          {content.intro.map((p, i) => (
            <p className="svc-intro" key={i}>
              {p}
            </p>
          ))}

          {content.sections.map((section, i) => (
            <div className="article-section" key={i}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}

          <div className="container center" style={{ marginTop: "2rem" }}>
            <OpenQuoteButton className="btn btn-fill btn-lg">{t("pricing.cta")}</OpenQuoteButton>
          </div>
        </div>
      </section>

      {content.faq && content.faq.length > 0 && (
        <section className="sec">
          <div className="container seo-surface">
            <div className="seo-block seo-block--first">
              <h2>{t("services.faqTitle")}</h2>
              <div className="faq-list">
                {content.faq.map((item, i) => (
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
              {relatedServices.map((svcId) => (
                <Link
                  key={svcId}
                  href={{ pathname: "/services/[slug]", params: { slug: serviceSlugs[svcId] } }}
                  className="link"
                >
                  {t(`catalog.${svcId}`)}
                </Link>
              ))}
              {id === "bumperRepair" && (
                <Link href="/bumper-painting" className="link">
                  {t("bumperPainting.h1")}
                </Link>
              )}
              {id === "scratchRepair" && (
                <Link href="/minor-damage" className="link">
                  {t("minorDamage.h1")}
                </Link>
              )}
            </div>
          </div>

          <div className="seo-block" style={{ textAlign: "center" }}>
            <h3>{t("blog.relatedArticlesHeading")}</h3>
            <div className="svc-related-links">
              {relatedArticles.map((articleId) => (
                <Link
                  key={articleId}
                  href={{ pathname: "/blog/[slug]", params: { slug: articleSlugs[articleId] } }}
                  className="link"
                >
                  {getArticleContent(locale, articleId).title}
                </Link>
              ))}
              {id === "accidentFirstSteps" && (
                <Link href="/accident" className="link">
                  {t("accident.h1")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
