import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import { BUSINESS } from "../lib/site";
import { logoDark } from "../assets";
import Icon from "./Icon";

// Every fact here comes from BUSINESS (site.ts) or the existing contact/nav
// messages -- nothing is invented for the footer.
export default function Footer({ hasSplash }: { hasSplash: boolean }) {
  const t = useTranslations();
  const { address } = BUSINESS;

  return (
    <footer className={hasSplash ? "footer-has-splash" : ""}>
      <div className="container f-main">
        <div className="f-brand">
          <Image src={logoDark} alt="Mpaint" />
          <p>
            {t("hero.leadPre")} {t("hero.leadCity")}
          </p>
        </div>

        <nav className="f-col" aria-label={t("footer.navTitle")}>
          <h4>{t("footer.navTitle")}</h4>
          <ul>
            <li><Link href="/services">{t("nav.services")}</Link></li>
            <li><Link href="/work">{t("nav.booking")}</Link></li>
            <li><Link href="/pricing">{t("nav.pricing")}</Link></li>
            <li><Link href="/blog">{t("nav.blog")}</Link></li>
            <li><Link href="/about">{t("nav.about")}</Link></li>
            <li><Link href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </nav>

        <div className="f-col">
          <h4>{t("footer.contactTitle")}</h4>
          <ul>
            <li><a href={BUSINESS.phoneHref}><b>{BUSINESS.phone}</b></a></li>
            <li><a href={BUSINESS.whatsappHref} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
          </ul>
        </div>

        <div className="f-col">
          <h4>{t("footer.visitTitle")}</h4>
          <ul>
            <li>
              <span>
                {address.streetAddress}, {address.postalCode} {address.addressLocality}
              </span>
            </li>
            <li>
              <span>
                {t("contact.monFri")}: {t("contact.hours")}
                <br />
                {t("contact.saturday")}: {t("contact.byAgreement")}
              </span>
            </li>
            <li>
              <a href={BUSINESS.googleReviewsUrl} target="_blank" rel="noopener">
                {t("home.reviewsLinkText")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container f-in">
        <span className="f-copyright">{t("footer.copyright")}</span>
        <span className="f-meta">{t("footer.company")}</span>
      </div>
    </footer>
  );
}
