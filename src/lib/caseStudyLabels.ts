import type { CaseStudyCategory } from "../data/caseStudies";

// Reuses the service catalog / bumper-painting / minor-damage page titles
// that already exist as the single source of truth for these names,
// rather than duplicating translated labels just for the portfolio.
export function categoryLabel(category: CaseStudyCategory, t: (key: string) => string): string {
  if (category === "bumper") return t("bumperPainting.h1");
  if (category === "minorDamage") return t("minorDamage.h1");
  if (category === "bodyParts") return t("work.categoryBodyParts");
  return t(`catalog.${category}`);
}
