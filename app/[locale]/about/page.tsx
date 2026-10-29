import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "../../../src/i18n/navigation";
import { SERVICE_ORDER, slugsForLocale } from "../../../src/data/services";
import { articleSlugsForLocale, getArticleContent } from "../../../src/data/blog";
import { localeAlternates } from "../../../src/lib/alternates";
import { SITE_URL } from "../../../src/lib/site";
import { dropBanner, imgPaintBooth, imgBodywork } from "../../../src/assets";
import Footer from "../../../src/components/Footer";
import OpenQuoteButton from "../../../src/components/OpenQuoteButton";
import BreadcrumbJsonLd from "../../../src/components/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/about") };
}

const RELATED_ARTICLE_IDS = ["paintingProcess", "accidentFirstSteps"] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const serviceSlugs = slugsForLocale(locale);
  const articleSlugs = articleSlugsForLocale(locale);

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.about"), url: `${SITE_URL}${getPathname({ href: "/about", locale })}` },
  ];

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(45svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" />
        <div className="container center" style={{ maxWidth: 820 }}>
          <h1>{t("about.h1")}</h1>
          <p className="sub">{t("about.intro")}</p>
        </div>
      </section>

      <section className="sec svc-detail-sec">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="article-section" style={{ marginTop: 0 }}>
            <h2>{t("about.photosHeading")}</h2>
            <div className="about-photos">
              <figure className="about-photo">
                <div className="img-wrap">
                  <Image src={imgPaintBooth} alt={t("about.photoPaintCaption")} fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                <figcaption>{t("about.photoPaintCaption")}</figcaption>
              </figure>
              <figure className="about-photo">
                <div className="img-wrap">
                  <Image src={imgBodywork} alt={t("about.photoBodyCaption")} fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
                <figcaption>{t("about.photoBodyCaption")}</figcaption>
              </figure>
            </div>
          </div>

          <div className="article-section">
            <h2>{t("about.servicesHeading")}</h2>
            <p>{t("about.servicesIntro")}</p>
            <div className="svc-related-links">
              {SERVICE_ORDER.map((svcId) => (
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

          <div className="article-section">
            <h2>{t("about.assessmentHeading")}</h2>
            <p>{t("about.assessmentP1")}</p>
            <p>{t("about.assessmentP2")}</p>
          </div>

          <div className="article-section">
            <h2>{t("about.qualityHeading")}</h2>
            <p>{t("about.qualityP1")}</p>
            <p>{t("about.qualityP2")}</p>
          </div>

          <div className="article-section">
            <h2>{t("about.limitsHeading")}</h2>
            <p>{t("about.limitsText")}</p>
          </div>

          <div className="article-section">
            <h2>{t("about.locationHeading")}</h2>
            <p>{t("about.locationText")}</p>
            <p>
              <Link href="/contact" className="link">
                {t("about.contactLinkText")}
              </Link>
            </p>
          </div>

          <div className="container center" style={{ marginTop: "2rem" }}>
            <OpenQuoteButton className="btn btn-fill btn-lg">{t("about.cta")}</OpenQuoteButton>
          </div>
        </div>
      </section>

      <section className="sec section-compact">
        <div className="container">
          <div className="seo-block seo-block--first" style={{ textAlign: "center" }}>
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
