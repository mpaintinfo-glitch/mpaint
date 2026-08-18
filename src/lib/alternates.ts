import { routing } from "../i18n/routing";

const BASE_URL = "https://mpaint.ee";

/**
 * Builds the absolute URL + hreflang alternates map for a given route
 * (e.g. "" for home, "/services", "/services/painting").
 */
export function localeAlternates(route: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${BASE_URL}${prefix}${route}`;
  }
  languages["x-default"] = `${BASE_URL}${route}`;
  return { languages };
}
