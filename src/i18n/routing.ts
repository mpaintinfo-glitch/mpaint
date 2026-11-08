import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["et", "ru", "en"],
  defaultLocale: "et",
  localePrefix: "as-needed",
  localeDetection: false,
  // next-intl would also emit hreflang as HTTP "Link" headers, but it can only
  // swap the locale prefix: for pages whose slug differs per language (services,
  // blog articles, case studies) it produced alternates that 404 (e.g. the EN
  // slug under /teenused/), contradicting the correct <link rel="alternate">
  // tags every page already renders from the real slug maps. One source of
  // truth: the HTML tags.
  alternateLinks: false,
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
    "/work": { et: "/tehtud-tood", ru: "/tehtud-tood", en: "/our-work" },
    "/work/[slug]": { et: "/tehtud-tood/[slug]", ru: "/tehtud-tood/[slug]", en: "/our-work/[slug]" },
  },
});

export type Locale = (typeof routing.locales)[number];
