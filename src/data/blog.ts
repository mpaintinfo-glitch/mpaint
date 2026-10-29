import type { ServiceId } from "./services";
import type { ArticleContent } from "./blog/types";
import { content_et } from "./blog/content.et";
import { content_ru } from "./blog/content.ru";
import { content_en } from "./blog/content.en";

export type ArticleId =
  | "paintingCost"
  | "scratchRepair"
  | "accidentFirstSteps"
  | "rustRepair"
  | "bumperRepair"
  | "paintingProcess";

export const ARTICLE_ORDER: ArticleId[] = [
  "accidentFirstSteps",
  "paintingCost",
  "scratchRepair",
  "bumperRepair",
  "rustRepair",
  "paintingProcess",
];

// Estonian slugs, ASCII-only (no diacritics), matching the convention
// already used for service slugs. Russian reuses the Estonian slug set.
export const ARTICLE_SLUGS_ET: Record<ArticleId, string> = {
  paintingCost: "auto-varvimise-hind",
  scratchRepair: "kriimustuse-parandamine",
  accidentFirstSteps: "avarii-esmased-sammud",
  rustRepair: "roostes-detaili-parandamine",
  bumperRepair: "stange-parandus-voi-vahetus",
  paintingProcess: "kuidas-toimub-varvimine",
};

export const ARTICLE_SLUGS_EN: Record<ArticleId, string> = {
  paintingCost: "car-painting-cost",
  scratchRepair: "scratch-repair-guide",
  accidentFirstSteps: "what-to-do-after-an-accident",
  rustRepair: "repairing-rusted-parts",
  bumperRepair: "bumper-repair-or-replace",
  paintingProcess: "how-car-painting-works",
};

export function articleSlugsForLocale(locale: string): Record<ArticleId, string> {
  return locale === "en" ? ARTICLE_SLUGS_EN : ARTICLE_SLUGS_ET;
}

export function getArticleBySlug(locale: string, slug: string): ArticleId | undefined {
  const slugs = articleSlugsForLocale(locale);
  return (Object.keys(slugs) as ArticleId[]).find((id) => slugs[id] === slug);
}

// First-publish date for every article is the same (all published together
// in this batch); update per-article if a piece is substantially revised
// later.
export const ARTICLE_PUBLISHED = "2026-10-29";

export const ARTICLE_RELATED_SERVICES: Record<ArticleId, ServiceId[]> = {
  paintingCost: ["paint", "rust"],
  scratchRepair: ["polish", "paint"],
  accidentFirstSteps: ["body", "paint"],
  rustRepair: ["rust", "body"],
  bumperRepair: ["paint", "body"],
  paintingProcess: ["paint", "rust"],
};

// Articles a reader of one piece is likely to want next. Kept distinct from
// ARTICLE_RELATED_SERVICES (which points to commercial service pages) so
// the article page can show both a "related articles" and a "related
// services" block without duplicating the same links.
export const ARTICLE_RELATED_ARTICLES: Record<ArticleId, ArticleId[]> = {
  paintingCost: ["paintingProcess", "bumperRepair"],
  scratchRepair: ["paintingProcess", "paintingCost"],
  accidentFirstSteps: ["bumperRepair", "paintingCost"],
  rustRepair: ["paintingCost", "accidentFirstSteps"],
  bumperRepair: ["paintingCost", "scratchRepair"],
  paintingProcess: ["paintingCost", "scratchRepair"],
};

export function getArticleContent(locale: string, id: ArticleId): ArticleContent {
  const byLocale = locale === "ru" ? content_ru : locale === "en" ? content_en : content_et;
  return byLocale[id];
}

// Inverse of ARTICLE_RELATED_SERVICES, curated rather than auto-derived so
// each service page links to the 1-2 articles actually worth reading from
// there, not every article that happens to mention the service.
export const SERVICE_RELATED_ARTICLES: Record<ServiceId, ArticleId[]> = {
  paint: ["paintingCost", "paintingProcess"],
  body: ["accidentFirstSteps", "bumperRepair"],
  dent: ["accidentFirstSteps", "paintingCost"],
  rust: ["rustRepair", "paintingCost"],
  polish: ["scratchRepair", "paintingCost"],
  parts: ["bumperRepair", "accidentFirstSteps"],
};
