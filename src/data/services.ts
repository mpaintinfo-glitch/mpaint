import type { StaticImageData } from "next/image";
import { photoPaint, photoBody, photoDent, photoRust, photoPolish, photoParts } from "../assets";

export type ServiceId = "paint" | "body" | "dent" | "rust" | "polish" | "parts";

export const SERVICE_SLUGS: Record<ServiceId, string> = {
  paint: "painting",
  body: "bodywork",
  dent: "dent-removal",
  rust: "rust-removal",
  polish: "polishing",
  parts: "parts-replacement",
};

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

export function getServiceBySlug(slug: string): ServiceId | undefined {
  return (Object.keys(SERVICE_SLUGS) as ServiceId[]).find((id) => SERVICE_SLUGS[id] === slug);
}

export const SERVICE_PHOTO: Record<ServiceId, StaticImageData> = {
  paint: photoPaint,
  body: photoBody,
  dent: photoDent,
  rust: photoRust,
  polish: photoPolish,
  parts: photoParts,
};
