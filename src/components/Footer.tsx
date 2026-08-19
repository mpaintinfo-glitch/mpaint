import { useTranslations } from "next-intl";
import { BUSINESS } from "../lib/site";
import Icon from "./Icon";

export default function Footer({ hasSplash }: { hasSplash: boolean }) {
  const t = useTranslations();

  return (
    <footer className={hasSplash ? "footer-has-splash" : ""}>
      <div className="container f-in">
        <a className="f-phone" href={BUSINESS.phoneHref}>
          <span className="f-phone-ic"><Icon id="i-phone" /></span>
          <b>{BUSINESS.phone}</b>
        </a>
        <span className="f-copyright">{t("footer.copyright")}</span>
        <span className="f-meta">{t("footer.company")}</span>
      </div>
    </footer>
  );
}
