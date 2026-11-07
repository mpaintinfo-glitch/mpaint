import { Link } from "../i18n/navigation";
import { caseStudySlug, type CaseStudy } from "../data/caseStudies";
import BeforeAfterSlider from "./BeforeAfterSlider";

type Locale = "et" | "ru" | "en";

const BEFORE_LABEL: Record<Locale, string> = { et: "Enne", ru: "До", en: "Before" };
const AFTER_LABEL: Record<Locale, string> = { et: "Pärast", ru: "После", en: "After" };

export default function CaseStudyCard({
  caseStudy,
  locale,
  categoryLabel,
}: {
  caseStudy: CaseStudy;
  locale: Locale;
  categoryLabel: string;
}) {
  const slug = caseStudySlug(caseStudy, locale);

  return (
    <Link href={{ pathname: "/work/[slug]", params: { slug } }} className="work-card">
      <BeforeAfterSlider
        before={caseStudy.before.image}
        after={caseStudy.after.image}
        beforeAlt={caseStudy.before.alt[locale]}
        afterAlt={caseStudy.after.alt[locale]}
        beforeLabel={BEFORE_LABEL[locale]}
        afterLabel={AFTER_LABEL[locale]}
        interactive={false}
        sizes="(max-width: 640px) 100vw, 500px"
      />
      <div className="work-card-body">
        <span className="work-card-category">{categoryLabel}</span>
        <h3>{caseStudy.title[locale]}</h3>
        <p>{caseStudy.description[locale]}</p>
      </div>
    </Link>
  );
}
