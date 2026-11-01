import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "../../../src/i18n/navigation";
import { SERVICE_ORDER, slugsForLocale } from "../../../src/data/services";
import { localeAlternates } from "../../../src/lib/alternates";
import { SITE_URL } from "../../../src/lib/site";
import Image from "next/image";
import { dropBanner } from "../../../src/assets";
import Footer from "../../../src/components/Footer";
import OpenQuoteButton from "../../../src/components/OpenQuoteButton";
import Icon from "../../../src/components/Icon";
import BreadcrumbJsonLd from "../../../src/components/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/pricing") };
}

type FaqItem = { q: string; a: string };
type ServiceDetailEntry = { pricingNote?: string };

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const faq = t.raw("pricing.faq") as FaqItem[];
  const serviceDetail = t.raw("serviceDetail") as Record<string, ServiceDetailEntry>;
  const slugs = slugsForLocale(locale);

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.pricing"), url: `${SITE_URL}${getPathname({ href: "/pricing", locale })}` },
  ];

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(60svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" />
        <div className="container center" style={{ maxWidth: 760 }}>
          <h1>{t("pricing.h1")}</h1>
          <p className="sub">{t("pricing.intro")}</p>
        </div>
      </section>

      <section className="sec section-compact">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="panel" style={{ padding: "0.5rem 1.5rem" }}>
            <ul className="pricing-list">
              {SERVICE_ORDER.map((id) => {
                const price = serviceDetail[id]?.pricingNote;
                return (
                  <li key={id} className="pricing-row">
                    <Link href={{ pathname: "/services/[slug]", params: { slug: slugs[id] } }} className="link">
                      {t(`catalog.${id}`)}
                    </Link>
                    <span>{price || t("pricing.genericNote")}</span>
                  </li>
                );
              })}
              <li className="pricing-row">
                <Link href="/bumper-painting" className="link">
                  {t("bumperPainting.h1")}
                </Link>
                <span>{t("pricing.genericNote")}</span>
              </li>
              <li className="pricing-row">
                <Link href="/minor-damage" className="link">
                  {t("minorDamage.h1")}
                </Link>
                <span>{t("pricing.genericNote")}</span>
              </li>
            </ul>
          </div>
          <div className="container center" style={{ marginTop: "2rem" }}>
            <OpenQuoteButton className="btn btn-fill btn-lg">{t("pricing.cta")}</OpenQuoteButton>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="container seo-surface">
          <div className="seo-block seo-block--first">
            <h2>{t("pricing.factorsHeading")}</h2>
            <ul className="services-grid">
              {(t.raw("pricing.factors") as string[]).map((item, i) => (
                <li key={i}>
                  <Icon id="i-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="seo-block">
            <h3>{t("pricing.faqTitle")}</h3>
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

      <Footer hasSplash={false} />
    </div>
  );
}
