import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "../../src/i18n/navigation";

// Static on purpose: reading the locale here (getTranslations without a locale)
// goes through request headers, which makes the statically generated dynamic
// routes (/teenused/[slug], ...) throw "static to dynamic at runtime" and 500
// on an unknown slug instead of returning this 404.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="page on">
      <section className="sec center" style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="container center">
          <h1>{t("title")}</h1>
          <p className="sub" style={{ marginInline: "auto" }}>{t("desc")}</p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/" className="btn btn-fill btn-lg">
              {t("backHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
