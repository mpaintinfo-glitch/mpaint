import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "../../../../src/i18n/routing";
import { Link } from "../../../../src/i18n/navigation";
import { SERVICE_SLUGS, SERVICE_PHOTO, getServiceBySlug } from "../../../../src/data/services";
import { dropBanner } from "../../../../src/assets";
import { localeAlternates } from "../../../../src/lib/alternates";
import Icon from "../../../../src/components/Icon";
import Footer from "../../../../src/components/Footer";
import OpenQuoteButton from "../../../../src/components/OpenQuoteButton";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.values(SERVICE_SLUGS).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = getServiceBySlug(slug);
  if (!id) return {};
  const t = await getTranslations({ locale, namespace: `serviceDetail.${id}` });
  return { title: t("h1"), description: t("tagline"), alternates: localeAlternates(`/services/${slug}`) };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const id = getServiceBySlug(slug);
  if (!id) notFound();

  setRequestLocale(locale);
  const t = await getTranslations();
  const svcT = await getTranslations(`serviceDetail.${id}`);
  const bullets = svcT.raw("bullets") as string[];

  return (
    <div className="page on">
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
            <h1 className="svc-page-title">{svcT("h1")}</h1>
            <div className="svc-page-photo">
              <Image src={SERVICE_PHOTO[id]} alt="" />
            </div>
            <div className="svc-page-desc">
              <p className="sub">{svcT("tagline")}</p>
              <ul className="svc-checklist">
                {bullets.map((b, i) => (
                  <li key={i}>
                    <Icon id="i-check" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="svc-page-actions">
              <OpenQuoteButton service={id} className="btn btn-fill btn-lg">
                {t("services.pick")}
              </OpenQuoteButton>
            </div>
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
