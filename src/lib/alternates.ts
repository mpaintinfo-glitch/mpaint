import { routing } from "../i18n/routing";
import { SITE_URL } from "./site";

/**
 * Builds the canonical URL + hreflang alternates map for a given route
 * (e.g. "" for home, "/services", "/services/painting") in the given locale.
 */
export function localeAlternates(locale: string, route: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const prefix = l === routing.defaultLocale ? "" : `/${l}`;
    languages[l] = `${SITE_URL}${prefix}${route}`;
  }
  languages["x-default"] = `${SITE_URL}${route}`;

  return {
    canonical: languages[locale] ?? `${SITE_URL}${route}`,
    languages,
  };
}
