import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["et", "ru", "en"],
  defaultLocale: "et",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/services": { et: "/teenused", ru: "/teenused", en: "/services" },
    "/services/[slug]": { et: "/teenused/[slug]", ru: "/teenused/[slug]", en: "/services/[slug]" },
    "/contact": { et: "/kontakt", ru: "/kontakt", en: "/contact" },
  },
});

export type Locale = (typeof routing.locales)[number];
