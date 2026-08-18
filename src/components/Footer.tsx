import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import { logoWhite } from "../assets";
import OpenQuoteButton from "./OpenQuoteButton";

const NAV_ITEMS = ["home", "services", "contact"] as const;

export default function Footer({ hasSplash }: { hasSplash: boolean }) {
  const t = useTranslations();

  return (
    <footer className={hasSplash ? "footer-has-splash" : ""}>
      <div className="container f-in">
        <Image
          src={logoWhite}
          alt="Mpaint"
          style={{
            height: "44px",
            width: "auto",
            maxWidth: "160px",
            objectFit: "contain",
            objectPosition: "left center",
            opacity: 0.75,
          }}
        />
        <div className="f-nav">
          {NAV_ITEMS.map((item) => (
            <Link key={item} href={item === "home" ? "/" : `/${item}`}>
              {t(`nav.${item}`)}
            </Link>
          ))}
          <OpenQuoteButton>{t("nav.booking")}</OpenQuoteButton>
        </div>
        <span>{t("footer.address")} · {t("footer.regCode")}</span>
        <span>{t("footer.copyright")}</span>
      </div>
    </footer>
  );
}
