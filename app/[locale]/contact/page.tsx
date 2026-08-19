import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { dropBanner } from "../../../src/assets";
import { localeAlternates } from "../../../src/lib/alternates";
import { BUSINESS } from "../../../src/lib/site";
import Icon from "../../../src/components/Icon";
import Footer from "../../../src/components/Footer";
import OpenEmailButton from "../../../src/components/OpenEmailButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/contact") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="page on">
      <section className="sec contact-main-sec" style={{ minHeight: "calc(100svh - var(--nav-h))" }}>
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" />
        <div className="container center">
          <h1>{t("contact.h1")}</h1>
        </div>
        <div className="container contact-panel-wrap">
          <div className="panel" style={{ padding: "1.5rem 2rem" }}>
            <div className="c-actions">
              <a className="ca" href={BUSINESS.phoneHref}>
                <span className="ic"><Icon id="i-phone" /></span>
                <span><small>{t("contact.callUs")}</small><b>{BUSINESS.phone}</b></span>
              </a>
              <a className="ca" href={BUSINESS.whatsappHref} target="_blank" rel="noopener">
                <span className="ic"><Icon id="i-wa" /></span>
                <span><small>{t("contact.whatsapp")}</small><b>{t("contact.whatsappValue")}</b></span>
              </a>
              <OpenEmailButton className="ca">
                <span className="ic"><Icon id="i-mail" /></span>
                <span><small>{t("contact.email")}</small><b>{BUSINESS.email}</b></span>
              </OpenEmailButton>
            </div>
            <div className="contact-grid" style={{ marginTop: "1.25rem" }}>
              <ul className="c-list">
                <li><span>{t("contact.address")}</span><b>{t("contact.addressValue")}</b></li>
                <li><span>{t("contact.monFri")}</span><b>{t("contact.hours")}</b></li>
                <li><span>{t("contact.saturday")}</span><b>{t("contact.byAgreement")}</b></li>
                <li><span>{t("contact.sunday")}</span><span className="muted">{t("contact.closed")}</span></li>
              </ul>
              <a
                className="map"
                href="https://www.google.com/maps/d/u/0/viewer?mid=1AMfWsWKEnTSOeom7WzBO-gVjE_9qaY0&ll=59.422193400000005%2C24.75835850000001&z=17"
                target="_blank"
                rel="noopener"
                aria-label={t("contact.mapTitle")}
                style={{ width: "192px", height: "192px", flexShrink: 0, margin: "0 auto" }}
              >
                <iframe
                  className="map-frame"
                  src="https://www.google.com/maps/d/embed?mid=1AMfWsWKEnTSOeom7WzBO-gVjE_9qaY0&ll=59.4221934%2C24.7583585&z=17"
                  title={t("contact.mapTitle")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                />
                <span className="map-veil">{t("contact.mapCta")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="sec seo-content-section">
        <div className="container seo-surface">
          <div className="seo-block seo-block--first">
            <h2>{t("contact.seoTitle")}</h2>
            <p>{t("contact.seoP1")}</p>
            <p>{t("contact.seoP2")}</p>
            <h3>{t("contact.hoursTitle")}</h3>
            <p>{t("contact.hoursP")}</p>
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
