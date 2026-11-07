import type { StaticImageData } from "next/image";
import { mercedesCFrontBefore, mercedesCFrontAfter } from "../assets";
import type { ServiceId } from "./services";
import { slugsForLocale as serviceSlugsForLocale } from "./services";

export type LocalizedText = { et: string; ru: string; en: string };

// The repair categories a case study can belong to. Mirrors ServiceId for
// the six core services, plus "bumper" and "minorDamage" for the two
// dedicated sub-pages (/bumper-painting, /minor-damage) that aren't their
// own ServiceId. categoryHref() below resolves each to its actual page.
export type CaseStudyCategory = ServiceId | "bumper" | "minorDamage";

export type CaseStudyImage = {
  image: StaticImageData;
  alt: LocalizedText;
};

export type CaseStudy = {
  /** Stable, unique identifier - never reused, independent of slug. */
  id: string;
  /** Localized URL slugs, ASCII-only, matching the site's existing slug convention (RU reuses ET, like services/articles). */
  slug: { et: string; en: string };
  /** Gate for whether this entry is live anywhere - page, gallery, sitemap, nav. */
  published: boolean;
  category: CaseStudyCategory;
  title: LocalizedText;
  /** Short summary for the gallery card and meta description. */
  description: LocalizedText;
  vehicle?: { make?: string; model?: string };
  /**
   * Actual damage, in the customer's or technician's own terms - not
   * invented. Required (not just present but meaningfully descriptive -
   * see MIN_MEANINGFUL_LENGTH): a title and two photos alone are not
   * enough to publish a project, see isPublishable() below.
   */
  damage: LocalizedText;
  before: CaseStudyImage;
  after: CaseStudyImage;
  /** Extra photos beyond the main before/after pair, if any exist. */
  additionalPhotos?: CaseStudyImage[];
  /** What was actually done - only include what's verified from the job record. Required, same reasoning as damage. */
  workPerformed: LocalizedText;
  /** Ordered process steps, only if the actual job record supports them. */
  process?: LocalizedText[];
  /** Materials or methods, only when verified for this specific job. */
  materials?: LocalizedText;
  /** ISO date (YYYY-MM-DD), only if the completion date is actually known. */
  completedDate?: string;
  /** Working days the job actually took, only if recorded. */
  durationDays?: number;
  /** ISO date; defaults to completedDate if omitted. */
  lastModified?: string;
};

// A project only becomes indexable once it has a real, descriptive
// account of the damage and the work performed - not just because
// `published` is true and it has a title and two images. Guards against
// a thin entry slipping onto the live site by accident; genuinely short
// but real text (e.g. "Ukse pisikriimustus" is too short, a full
// sentence or two is not) is what this is meant to require.
const MIN_MEANINGFUL_LENGTH = 15;

function isMeaningful(text: LocalizedText): boolean {
  return (["et", "ru", "en"] as const).every((l) => text[l].trim().length >= MIN_MEANINGFUL_LENGTH);
}

/** Whether a case study has enough real content to actually go live - the gate publishedCaseStudies() enforces, exported so it can also be used for authoring-time checks. */
export function isPublishable(c: CaseStudy): boolean {
  return c.published && isMeaningful(c.damage) && isMeaningful(c.workPerformed);
}

export function publishedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter(isPublishable);
}

export function caseStudySlug(c: CaseStudy, locale: string): string {
  return locale === "en" ? c.slug.en : c.slug.et;
}

export function getCaseStudyBySlug(locale: string, slug: string): CaseStudy | undefined {
  return publishedCaseStudies().find((c) => caseStudySlug(c, locale) === slug);
}

export function caseStudiesByCategory(category: CaseStudyCategory): CaseStudy[] {
  return publishedCaseStudies().filter((c) => c.category === category);
}

/** Categories that actually have at least one published case study - the only ones the gallery filter UI should ever show. */
export function publishedCategories(): CaseStudyCategory[] {
  const seen = new Set<CaseStudyCategory>();
  for (const c of publishedCaseStudies()) seen.add(c.category);
  return Array.from(seen);
}

/** Resolves a category to the real page it should link to. */
export function categoryHref(category: CaseStudyCategory, locale: string) {
  if (category === "bumper") return { pathname: "/bumper-painting" } as const;
  if (category === "minorDamage") return { pathname: "/minor-damage" } as const;
  const slugs = serviceSlugsForLocale(locale);
  return { pathname: "/services/[slug]", params: { slug: slugs[category] } } as const;
}

/** For the quote-funnel preselect, which only knows the six core ServiceIds - bumper/minorDamage map to the closest real service (paint). */
export function categoryToServiceId(category: CaseStudyCategory): ServiceId {
  if (category === "bumper" || category === "minorDamage") return "paint";
  return category;
}

// Real before/after photos from actual completed Mpaint jobs only - no
// placeholder, stock, or invented entries. Every other part of the
// portfolio (route, sitemap entry, nav link, structured data) stays
// switched off automatically if this ever goes back to empty; see
// work/page.tsx, work/[slug]/page.tsx, Header.tsx and sitemap.ts, which
// all gate on publishedCaseStudies().
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "mercedes-c-class-w204-front-grille",
    slug: { et: "mercedes-c-esiosa-taastamine", en: "mercedes-c-front-restoration" },
    published: true,
    category: "body",
    vehicle: { make: "Mercedes-Benz", model: "C-Class (W204)" },
    title: {
      et: "Mercedes-Benz C-klassi esiosa taastamine Tallinnas",
      ru: "Восстановление передней части Mercedes-Benz C-класса в Таллинне",
      en: "Mercedes-Benz C-Class front-end restoration in Tallinn",
    },
    description: {
      et: "Mercedes-Benz C-klassi esiosas oli kahjustunud esivõre piirkond. Pärast tööde teostamist on esiosa taas terviklik ja korrektse välimusega.",
      ru: "У Mercedes-Benz C-класса была повреждена область передней решётки. После выполнения работ передняя часть снова выглядит целостно и аккуратно.",
      en: "This Mercedes-Benz C-Class had a damaged front grille area. After the work was completed, the front end looks whole and properly finished again.",
    },
    damage: {
      et: "Enne töid oli Mercedes-Benz C-klassi esivõre piirkond nähtavalt kahjustunud. Esiosa keskosa ei olnud terviklik ning auto esivaade vajas korrastamist.",
      ru: "До начала работ область передней решётки Mercedes-Benz C-класса была заметно повреждена. Центральная часть переда не была целостной, и внешний вид передней части автомобиля требовал приведения в порядок.",
      en: "Before the work, the front grille area of this Mercedes-Benz C-Class was visibly damaged. The centre of the front end wasn't intact, and the car's front view needed sorting out.",
    },
    before: {
      image: mercedesCFrontBefore,
      alt: {
        et: "Mercedes-Benz C-klassi esiosa enne töid, kahjustunud esivõre piirkond",
        ru: "Передняя часть Mercedes-Benz C-класса до работ, повреждённая область передней решётки",
        en: "Mercedes-Benz C-Class front end before the work, damaged front grille area",
      },
    },
    after: {
      image: mercedesCFrontAfter,
      alt: {
        et: "Mercedes-Benz C-klassi esiosa pärast töid, taastatud esivõre piirkond",
        ru: "Передняя часть Mercedes-Benz C-класса после работ, восстановленная область передней решётки",
        en: "Mercedes-Benz C-Class front end after the work, restored front grille area",
      },
    },
    workPerformed: {
      et: "Töö käigus taastati esivõre piirkonna välimus ning esiosa viidi tagasi korrektse ja tervikliku üldmuljeni.",
      ru: "В ходе работ был восстановлен внешний вид области передней решётки, и передняя часть автомобиля снова приобрела аккуратный и целостный вид.",
      en: "The work restored the appearance of the front grille area, bringing the front end back to a correct, complete overall look.",
    },
    process: [
      {
        et: "Kahjustuse ülevaatus.",
        ru: "Осмотр повреждения.",
        en: "Inspecting the damage.",
      },
      {
        et: "Esiosa detailide olukorra korrastamine.",
        ru: "Приведение в порядок деталей передней части.",
        en: "Sorting out the condition of the front-end parts.",
      },
      {
        et: "Pärast tööde lõpetamist oli esivõre piirkond taas korrektne ja visuaalselt terviklik.",
        ru: "После завершения работ область передней решётки снова стала аккуратной и визуально целостной.",
        en: "Once the work was finished, the grille area was correct and visually whole again.",
      },
    ],
  },
];

