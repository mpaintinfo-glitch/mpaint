import Image from "next/image";
import { Link } from "../i18n/navigation";
import { slugsForLocale } from "../data/services";
import type { CaseStudy } from "../data/caseStudies";

type Locale = "et" | "ru" | "en";

const BEFORE_LABEL: Record<Locale, string> = { et: "Enne", ru: "До", en: "Before" };
const AFTER_LABEL: Record<Locale, string> = { et: "Pärast", ru: "После", en: "After" };
const VIEW_SERVICE_LABEL: Record<Locale, string> = {
  et: "Vaata teenust",
  ru: "Смотреть услугу",
  en: "View service",
};

export default function CaseStudyCard({ caseStudy, locale }: { caseStudy: CaseStudy; locale: Locale }) {
  const slugs = slugsForLocale(locale);

  return (
    <article className="case-study-card">
      <div className="case-study-images">
        <div className="case-study-image">
          <Image src={caseStudy.before} alt={`${caseStudy.vehicle} - ${BEFORE_LABEL[locale]}`} fill style={{ objectFit: "cover" }} />
          <span className="case-study-tag">{BEFORE_LABEL[locale]}</span>
        </div>
        <div className="case-study-image">
          <Image src={caseStudy.after} alt={`${caseStudy.vehicle} - ${AFTER_LABEL[locale]}`} fill style={{ objectFit: "cover" }} />
          <span className="case-study-tag">{AFTER_LABEL[locale]}</span>
        </div>
      </div>
      <div className="case-study-body">
        <h3>{caseStudy.vehicle}</h3>
        <p>{caseStudy.damage[locale]}</p>
        <p>{caseStudy.summary[locale]}</p>
        <Link href={{ pathname: "/services/[slug]", params: { slug: slugs[caseStudy.service] } }} className="link">
          {VIEW_SERVICE_LABEL[locale]}
        </Link>
      </div>
    </article>
  );
}
