import Image from "next/image";
import { useTranslations } from "next-intl";
import { logoWhite } from "../assets";
import { BUSINESS } from "../lib/site";
import Icon from "./Icon";

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
          }}
        />
        <a className="f-phone" href={BUSINESS.phoneHref}>
          <span className="f-phone-ic"><Icon id="i-phone" /></span>
          <b>{BUSINESS.phone}</b>
        </a>
        <span className="f-meta">
          {t("footer.copyright")} · {t("footer.regCode")}
        </span>
      </div>
    </footer>
  );
}
