import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../src/i18n/navigation";
import { RIBBON_IDS, SERVICE_SLUGS } from "../../src/data/services";
import { localeAlternates } from "../../src/lib/alternates";
import { sfondo, imgPaintBooth, imgBodywork } from "../../src/assets";
import Arrow from "../../src/components/Arrow";
import Footer from "../../src/components/Footer";
import OpenQuoteButton from "../../src/components/OpenQuoteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates("") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="page page-home on">
      <section
        className="hero relative w-full"
        style={{
          paddingTop: "28px",
          paddingBottom: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="container hero-inner text-center" style={{ zIndex: 10 }}>
          <h1>
            {t("hero.leadPre")}{" "}
            <span className="grad">{t("hero.leadCity")}</span>
          </h1>
        </div>

        <div className="hero-art w-full" style={{ flexShrink: 0 }}>
          <Image
            src={sfondo}
            alt="MPAINT car painting workshop in Tallinn"
            className="hero-sfondo"
            priority
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: "50vh",
              objectFit: "cover",
              objectPosition: "center 60%",
            }}
          />
        </div>

        <div
          className="container hero-lower flex flex-col items-center"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", zIndex: 10 }}
        >
          <div className="hero-btns flex gap-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <OpenQuoteButton className="btn btn-fill btn-lg text-[#944ba2]">
              {t("hero.ctaEstimate")}
            </OpenQuoteButton>
          </div>
        </div>

        <div
          className="hero-scroll-indicator"
          style={{ opacity: 0.6, pointerEvents: "none", zIndex: 10, display: "flex", justifyContent: "center" }}
        >
          <style>{`
            @keyframes subtle-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(8px); }
            }
          `}</style>
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: "subtle-bounce 2s infinite ease-in-out" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
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
              <Link href={`/services/${SERVICE_SLUGS.paint}`} className="svc-half">
                <Image src={imgPaintBooth} alt="Car painting" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t("catalog.paint")}</h3>
                  <p>{t("home.paintDesc")}</p>
                  <span className="pick">{t("home.pick")} <Arrow /></span>
                </div>
              </Link>
              <Link href={`/services/${SERVICE_SLUGS.body}`} className="svc-half">
                <Image src={imgBodywork} alt="Welding and bodywork" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover" }} />
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
                <Link key={id} href={`/services/${SERVICE_SLUGS[id]}`} className="svc-seg">
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

      <section className="sec section-compact seo-content-section">
        <div className="container seo-block seo-block--first">
          <h2>{t("home.seoTitle")}</h2>
          <p>{t("home.seoP1")}</p>
          <p>{t("home.seoP2")}</p>
          <p>{t("home.seoP3")}</p>
          <p>{t("home.seoP4")}</p>
        </div>
        <div className="container seo-block">
          <h3>{t("home.whyTitle")}</h3>
          <ul>
            {t.raw("home.why").map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
          <p>{t("home.seoClosing")}</p>
        </div>
      </section>

      <Footer hasSplash />
    </div>
  );
}
