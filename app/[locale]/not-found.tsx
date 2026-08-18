import { getTranslations } from "next-intl/server";
import { Link } from "../../src/i18n/navigation";

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
