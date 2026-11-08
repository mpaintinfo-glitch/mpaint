"use client";

import { useState } from "react";
import type { CaseStudy, CaseStudyCategory } from "../data/caseStudies";
import CaseStudyCard from "./CaseStudyCard";

type Locale = "et" | "ru" | "en";

export default function WorkGalleryGrid({
  caseStudies,
  categories,
  categoryLabels,
  allLabel,
  locale,
}: {
  caseStudies: CaseStudy[];
  categories: CaseStudyCategory[];
  categoryLabels: Record<string, string>;
  allLabel: string;
  locale: Locale;
}) {
  const [active, setActive] = useState<CaseStudyCategory | "all">("all");
  const visible = active === "all" ? caseStudies : caseStudies.filter((c) => c.category === active);

  return (
    <>
      {categories.length > 1 && (
        <div className="work-filters">
          <button
            type="button"
            className={`work-filter${active === "all" ? " active" : ""}`}
            onClick={() => setActive("all")}
          >
            {allLabel}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`work-filter${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      )}

      <div className="work-grid">
        {visible.map((cs) => (
          <CaseStudyCard headingLevel="h2" key={cs.id} caseStudy={cs} locale={locale} categoryLabel={categoryLabels[cs.category]} />
        ))}
      </div>
    </>
  );
}
