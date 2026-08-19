import type { StaticImageData } from "next/image";
import { photoPaint, photoBody, photoDent, photoRust, photoPolish, photoParts } from "../assets";

export type ServiceId = "paint" | "body" | "dent" | "rust" | "polish" | "parts";

// Estonian slugs, ASCII-only (no diacritics) since these go directly into
// URLs. Russian reuses these rather than getting its own Cyrillic set.
export const SERVICE_SLUGS_ET: Record<ServiceId, string> = {
  paint: "varvimine",
  body: "keretood",
  dent: "molkide-eemaldamine",
  rust: "roostetorje",
  polish: "poleerimine",
  parts: "osade-vahetus",
};

export const SERVICE_SLUGS_EN: Record<ServiceId, string> = {
  paint: "painting",
  body: "bodywork",
  dent: "dent-removal",
  rust: "rust-removal",
  polish: "polishing",
  parts: "parts-replacement",
};

export function slugsForLocale(locale: string): Record<ServiceId, string> {
  return locale === "en" ? SERVICE_SLUGS_EN : SERVICE_SLUGS_ET;
}

export const SERVICE_ORDER: ServiceId[] = ["paint", "body", "dent", "rust", "polish", "parts"];

// the 4-item ribbon shown under the paint/body cards on Home & Services
export const RIBBON_IDS: ServiceId[] = ["rust", "dent", "polish", "parts"];

export const SERVICE_ICON: Record<ServiceId, string> = {
  paint: "i-spray",
  body: "i-weld",
  dent: "i-dent",
  rust: "i-rust",
  polish: "i-polish",
  parts: "i-doc",
};

export function getServiceBySlug(locale: string, slug: string): ServiceId | undefined {
  const slugs = slugsForLocale(locale);
  return (Object.keys(slugs) as ServiceId[]).find((id) => slugs[id] === slug);
}

export const SERVICE_PHOTO: Record<ServiceId, StaticImageData> = {
  paint: photoPaint,
  body: photoBody,
  dent: photoDent,
  rust: photoRust,
  polish: photoPolish,
  parts: photoParts,
};
