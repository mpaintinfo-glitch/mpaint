import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "../../../../src/i18n/routing";
import { Link, getPathname } from "../../../../src/i18n/navigation";
import { SERVICE_PHOTO, getServiceBySlug, slugsForLocale } from "../../../../src/data/services";
import { dropBanner } from "../../../../src/assets";
import { localeAlternates } from "../../../../src/lib/alternates";
import { SITE_URL } from "../../../../src/lib/site";
import Icon from "../../../../src/components/Icon";
import Footer from "../../../../src/components/Footer";
import OpenQuoteButton from "../../../../src/components/OpenQuoteButton";
import BreadcrumbJsonLd from "../../../../src/components/BreadcrumbJsonLd";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.values(slugsForLocale(locale)).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = getServiceBySlug(locale, slug);
  if (!id) return {};
  const t = await getTranslations({ locale, namespace: `serviceDetail.${id}` });
  return {
    title: t("h1"),
    description: t("tagline"),
    alternates: localeAlternates(locale, (l) => ({
      pathname: "/services/[slug]",
      params: { slug: slugsForLocale(l)[id] },
    })),
  };
}

type ServiceDetailContent = {
  h1: string;
  tagline: string;
  bullets: string[];
  intro?: string;
  process?: string[];
  techNotes?: string[];
  pricingNote?: string;
  warningNote?: string;
  secondarySection?: { heading: string; text: string };
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const id = getServiceBySlug(locale, slug);
  if (!id) notFound();

  setRequestLocale(locale);
  const t = await getTranslations();
  const svcT = await getTranslations(`serviceDetail.${id}`);
  const detail = t.raw(`serviceDetail.${id}`) as ServiceDetailContent;
  const { h1, tagline, bullets, intro, process, techNotes, pricingNote, warningNote, secondarySection } = detail;
  // These group-heading labels aren't translated into every locale yet (ET
  // rolled out first) - t.raw() returns the actual JSON value with no
  // fallback-string substitution, so a missing key is silently undefined
  // instead of leaking a literal "services.xHeading" string into the page.
  const servicesRaw = t.raw("services") as Record<string, string | undefined>;
  const bulletsHeading = servicesRaw.bulletsHeading;
  const techNotesHeading = servicesRaw.techNotesHeading;
  const warningHeading = servicesRaw.warningHeading;

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.services"), url: `${SITE_URL}${getPathname({ href: "/services", locale })}` },
    {
      name: svcT("h1"),
      url: `${SITE_URL}${getPathname({ href: { pathname: "/services/[slug]", params: { slug } }, locale })}`,
    },
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
          <Link href="/services" className="link svc-page-back">
            {t("services.backToServices")}
          </Link>
          <div className="svc-page-layout">
            <h1 className="svc-page-title">{h1}</h1>
            <div className="svc-page-photo">
              <Image src={SERVICE_PHOTO[id]} alt="" />
            </div>
            <div className="svc-page-desc">
              <p className="sub">{tagline}</p>
              {pricingNote && <p className="svc-pricing-note svc-pricing-note--hero">{pricingNote}</p>}
            </div>
            <div className="svc-page-actions">
              <OpenQuoteButton service={id} className="btn btn-fill btn-lg">
                {t("services.pick")}
              </OpenQuoteButton>
            </div>
          </div>
        </div>
      </section>

      {(intro || (process && process.length > 0) || bullets.length > 0 || warningNote || secondarySection) && (
        <section className="sec svc-detail-sec">
          <div className="container">
            {intro && <p className="svc-intro">{intro}</p>}

            {process && process.length > 0 && (
              <ol className="svc-process">
                {process.map((step, i) => (
                  <li key={i}>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {bullets.length > 0 && (
              <div className="svc-group">
                {bulletsHeading && <h4 className="svc-group-label">{bulletsHeading}</h4>}
                <ul className="svc-chip-list">
                  {bullets.map((b, i) => (
                    <li className="svc-chip" key={i}>
                      <span className="svc-chip-ic"><Icon id="i-check" /></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {techNotes && techNotes.length > 0 && (
              <div className="svc-group">
                {techNotesHeading && <h4 className="svc-group-label">{techNotesHeading}</h4>}
                <ul className="svc-chip-list">
                  {techNotes.map((b, i) => (
                    <li className="svc-chip" key={i}>
                      <span className="svc-chip-ic"><Icon id="i-check" /></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {warningNote && (
              <div className="svc-group">
                {warningHeading && <h4 className="svc-group-label">{warningHeading}</h4>}
                <div className="svc-warning-note">
                  <Icon id="i-shield" />
                  <p>{warningNote}</p>
                </div>
              </div>
            )}

            {secondarySection && (
              <div className="svc-secondary">
                <h3>{secondarySection.heading}</h3>
                <p>{secondarySection.text}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer hasSplash={false} />
    </div>
  );
}
