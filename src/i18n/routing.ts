import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["et", "ru", "en"],
  defaultLocale: "et",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
