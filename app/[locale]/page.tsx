import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../src/i18n/navigation";
import { RIBBON_IDS, slugsForLocale } from "../../src/data/services";
import { localeAlternates } from "../../src/lib/alternates";
import { BUSINESS } from "../../src/lib/site";
import { sfondo, imgPaintBooth, imgBodywork } from "../../src/assets";
import Arrow from "../../src/components/Arrow";
import Icon from "../../src/components/Icon";
import Footer from "../../src/components/Footer";
import CaseStudyCard from "../../src/components/CaseStudyCard";
import { GoogleG, GoldStars } from "../../src/components/GoogleReviewBadge";
import { publishedCaseStudies } from "../../src/data/caseStudies";
import { categoryLabel } from "../../src/lib/caseStudyLabels";
import OpenQuoteButton from "../../src/components/OpenQuoteButton";

type WhyCard = { title: string; desc: string };
const WHY_ICONS = ["i-spray", "i-star", "i-weld", "i-shield"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const slugs = slugsForLocale(locale);
  const serviceHref = (id: keyof typeof slugs) =>
    ({ pathname: "/services/[slug]" as const, params: { slug: slugs[id] } });
  const steps = t.raw("services.seoSteps") as { h3: string; p: string }[];
  // newest published projects first; real case studies only
  const recentWork = publishedCaseStudies().slice(-3).reverse();
  const loc = locale as "et" | "ru" | "en";

  return (
    <div className="page page-home on">
      <section className="hero">
        <div className="container hero-inner">
          <h1 className="hero-title">
            <span className="hero-title-line">{t("hero.titleA")}</span>{" "}
            <span className="hero-title-line hero-title-loc">
              <span className="grad">{t("hero.titleB")}</span>
            </span>
          </h1>
        </div>

        <div className="hero-art">
          <Image src={sfondo} alt={t("hero.imageAlt")} className="hero-sfondo" priority sizes="(max-width: 767px) 150vw, 100vw" />
        </div>

        <div className="container hero-lower">
          <div className="hero-btns">
            <OpenQuoteButton className="btn btn-fill btn-lg">{t("hero.ctaEstimate")}</OpenQuoteButton>
            <Link href="/work" className="btn btn-line btn-lg">
              {t("hero.ctaWork")}
            </Link>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <a
            href={BUSINESS.googleReviewsUrl}
            target="_blank"
            rel="noopener"
            className="reviews-link"
            aria-label={t("home.reviewsLinkText")}
          >
            <GoogleG size={16} />
            <GoldStars size={13.5} />
          </a>
        </div>
      </section>

      <section className="sec">
        <div className="container center">
          <h2>{t("home.whatTitle")}</h2>
          <p className="sub">{t("home.whatSub")}</p>
        </div>
        <div className="container">
          <div className="svc-block">
            <div className="svc-band">
              <Link href={serviceHref("paint")} className="svc-half">
                <Image src={imgPaintBooth} alt={t("catalog.paint")} fill sizes="(max-width: 760px) 100vw, 50vw" loading="eager" style={{ objectFit: "cover" }} />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t("catalog.paint")}</h3>
                  <p>{t("home.paintDesc")}</p>
                  <span className="pick">{t("home.pick")} <Arrow /></span>
                </div>
              </Link>
              <Link href={serviceHref("body")} className="svc-half">
                <Image src={imgBodywork} alt={t("catalog.body")} fill sizes="(max-width: 760px) 100vw, 50vw" loading="eager" style={{ objectFit: "cover" }} />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t("catalog.body")}</h3>
                  <p>{t("home.bodyDesc")}</p>
                  <span className="pick">{t("home.pick")} <Arrow /></span>
                </div>
              </Link>
            </div>
            <div
              className="svc-ribbon"
              style={{ gridTemplateColumns: "repeat(4,1fr)", background: "linear-gradient(100deg,#E0007A 0%,#8B3FD8 100%)" }}
            >
              {RIBBON_IDS.map((id) => (
                <Link key={id} href={serviceHref(id)} className="svc-seg">
                  <span>{t(`catalog.${id}`)}</span>
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="container center section-cta">
          <Link href="/services" className="btn btn-line">
            {t("home.seeAll")}
          </Link>
        </div>
      </section>

      <section className="sec band">
        <div className="container">
          <div className="section-head">
            <h2>{t("home.processTitle")}</h2>
          </div>
          <ol className="steps">
            {steps.map((step, i) => (
              <li className="step" key={i}>
                <span className="step-n">{i + 1}</span>
                <h3>{step.h3}</h3>
                <p>{step.p}</p>
              </li>
            ))}
          </ol>

          <div className="timing">
            <h3 className="timing-title">{t("home.timingTitle")}</h3>
            <div className="timing-grid">
              <div className="timing-card">
                <b>{t("catalog.paint")}</b>
                <p>{t("serviceDetail.paint.intro")}</p>
              </div>
              <div className="timing-card">
                <b>{t("minorDamage.h1")}</b>
                <p>{t("minorDamage.timingNote")}</p>
              </div>
            </div>
          </div>

          <div className="center section-cta">
            <OpenQuoteButton className="btn btn-fill btn-lg">{t("hero.ctaEstimate")}</OpenQuoteButton>
          </div>
        </div>
      </section>

      {recentWork.length > 0 && (
        <section className="sec">
          <div className="container">
            <div className="section-head">
              <h2>{t("work.h1")}</h2>
              <p className="sub">{t("work.intro")}</p>
            </div>
            <div className="work-grid work-grid--home">
              {recentWork.map((cs) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} locale={loc} categoryLabel={categoryLabel(cs.category, t)} />
              ))}
            </div>
            <div className="center section-cta">
              <Link href="/work" className="btn btn-line">
                {t("work.filterAll")}
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="sec section-compact seo-content-section seo-content-section--home">
        <div className="container seo-surface">
          <div className="seo-block seo-block--first">
            <h2>{t("home.seoTitle")}</h2>
            <p>{t("home.seoP1")}</p>
            <p>{t("home.seoP3")}</p>
            <p>{t("home.seoP4")}</p>
          </div>

          <div className="seo-block">
            <h3>{t("home.servicesTitle")}</h3>
            <ul className="services-grid">
              {t.raw("home.why").map((item: string, i: number) => (
                <li key={i}>
                  <Icon id="i-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="seo-block">
            <h3>{t("home.whyMpaintTitle")}</h3>
            <div className="why-cards">
              {t.raw("home.whyCards").map((card: WhyCard, i: number) => (
                <div className="why-card" key={i}>
                  <Icon id={WHY_ICONS[i % WHY_ICONS.length]} />
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
            <p className="seo-closing">{t("home.seoClosing")}</p>
            <p className="seo-closing">
              {t("home.reviewsText")}{" "}
              <a href={BUSINESS.googleReviewsUrl} target="_blank" rel="noopener" className="link">
                {t("home.reviewsLinkText")}
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer hasSplash />
    </div>
  );
}
