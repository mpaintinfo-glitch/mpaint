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
    "/pricing": { et: "/hinnakiri", ru: "/hinnakiri", en: "/pricing" },
    "/blog": { et: "/blogi", ru: "/blogi", en: "/blog" },
    "/blog/[slug]": { et: "/blogi/[slug]", ru: "/blogi/[slug]", en: "/blog/[slug]" },
    "/accident": { et: "/avarii", ru: "/avarii", en: "/accident" },
    "/about": { et: "/meist", ru: "/meist", en: "/about" },
    "/bumper-painting": { et: "/teenused/stange-varvimine", ru: "/teenused/stange-varvimine", en: "/services/bumper-painting" },
    "/minor-damage": { et: "/teenused/kivitaked-ja-varvikahjustused", ru: "/teenused/kivitaked-ja-varvikahjustused", en: "/services/minor-paint-damage" },
  },
});

export type Locale = (typeof routing.locales)[number];
