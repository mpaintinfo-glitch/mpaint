import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../src/i18n/navigation";
import { RIBBON_IDS, slugsForLocale } from "../../../src/data/services";
import { localeAlternates } from "../../../src/lib/alternates";
import { BUSINESS } from "../../../src/lib/site";
import { imgPaintBooth, imgBodywork } from "../../../src/assets";
import Image from "next/image";
import Arrow from "../../../src/components/Arrow";
import Footer from "../../../src/components/Footer";
import OpenQuoteButton from "../../../src/components/OpenQuoteButton";
import FaqJsonLd from "../../../src/components/FaqJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/services") };
}

type FaqItem = { q: string; a: string };

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const faq = t.raw("services.faq") as FaqItem[];
  const slugs = slugsForLocale(locale);
  const serviceHref = (id: keyof typeof slugs) =>
    ({ pathname: "/services/[slug]" as const, params: { slug: slugs[id] } });

  return (
    <div className="page on">
      <FaqJsonLd items={faq} />
      <section
        className="sec svc-cta-zone"
        style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <div className="container center" style={{ maxWidth: 820 }}>
          <h1>{t("services.h1")}</h1>
        </div>

        <div className="container">
          <div className="svc-block">
            <div className="svc-band">
              <Link href={serviceHref("paint")} className="svc-half">
                <Image src={imgPaintBooth} alt="Car painting booth" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t("catalog.paint")}</h3>
                  <p>{t("services.paintDesc")}</p>
                  <span className="pick">{t("services.pick")} <Arrow /></span>
                </div>
              </Link>
              <Link href={serviceHref("body")} className="svc-half">
                <Image src={imgBodywork} alt="Body repair work" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t("catalog.body")}</h3>
                  <p>{t("services.bodyDesc")}</p>
                  <span className="pick">{t("services.pick")} <Arrow /></span>
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

        <div className="container center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <OpenQuoteButton className="btn btn-fill btn-lg">{t("services.cta")}</OpenQuoteButton>
          <a className="hero-secondary" href={BUSINESS.phoneHref}>
            {t("services.callUs")}
          </a>
        </div>
      </section>

      <section className="sec seo-content-section">
        <div className="container seo-block seo-block--first">
          <h2>{t("services.seoTitle")}</h2>
          <p>{t("services.seoP1")}</p>
          <p>{t("services.seoP2")}</p>
          <p>{t("services.seoP3")}</p>
        </div>
      </section>

      <section className="sec">
        <div className="container seo-surface">
          <div className="seo-block seo-block--first">
            <h2>{t("services.faqTitle")}</h2>
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

      <Footer hasSplash />
    </div>
  );
}
