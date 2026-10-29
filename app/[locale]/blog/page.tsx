import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "../../../src/i18n/navigation";
import { ARTICLE_ORDER, articleSlugsForLocale, getArticleContent } from "../../../src/data/blog";
import { localeAlternates } from "../../../src/lib/alternates";
import { SITE_URL } from "../../../src/lib/site";
import Image from "next/image";
import { dropBanner } from "../../../src/assets";
import Footer from "../../../src/components/Footer";
import BreadcrumbJsonLd from "../../../src/components/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return { title: t("title"), description: t("description"), alternates: localeAlternates(locale, () => "/blog") };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const slugs = articleSlugsForLocale(locale);

  const breadcrumbs = [
    { name: t("nav.home"), url: `${SITE_URL}${getPathname({ href: "/", locale })}` },
    { name: t("nav.blog"), url: `${SITE_URL}${getPathname({ href: "/blog", locale })}` },
  ];

  return (
    <div className="page on">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <section
        className="sec svc-page-sec"
        style={{ minHeight: "calc(45svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <Image src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" />
        <div className="container center" style={{ maxWidth: 760 }}>
          <h1>{t("blog.h1")}</h1>
          <p className="sub">{t("blog.intro")}</p>
        </div>
      </section>

      <section className="sec section-compact">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="blog-grid">
            {ARTICLE_ORDER.map((id) => {
              const content = getArticleContent(locale, id);
              return (
                <Link
                  key={id}
                  href={{ pathname: "/blog/[slug]", params: { slug: slugs[id] } }}
                  className="blog-card"
                >
                  <h3>{content.title}</h3>
                  <p>{content.excerpt}</p>
                  <span className="link">{t("blog.readMore")}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer hasSplash={false} />
    </div>
  );
}
