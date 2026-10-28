import type { StaticImageData } from "next/image";
import type { ServiceId } from "./services";

type LocalizedText = { et: string; ru: string; en: string };

export type CaseStudy = {
  id: string;
  service: ServiceId;
  vehicle: string;
  damage: LocalizedText;
  summary: LocalizedText;
  before: StaticImageData;
  after: StaticImageData;
};

// Real before/after photos from actual repair jobs only - no placeholder,
// stock, or invented entries. The "Tehtud tööd" page and nav link stay
// hidden (see Header.tsx) until this has genuine content, same rule as
// the gallery itself: an empty or fake portfolio is worse than none.
export const CASE_STUDIES: CaseStudy[] = [];
