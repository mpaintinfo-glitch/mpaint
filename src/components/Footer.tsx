import Image from "next/image";
import { useTranslations } from "next-intl";
import { logoWhite } from "../assets";
import { BUSINESS } from "../lib/site";

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
        <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
        <span>{t("footer.regCode")}</span>
        <span>{t("footer.copyright")}</span>
      </div>
    </footer>
  );
}
