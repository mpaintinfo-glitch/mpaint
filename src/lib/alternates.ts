import { routing } from "../i18n/routing";
import { getPathname } from "../i18n/navigation";
import { SITE_URL } from "./site";

type Href = Parameters<typeof getPathname>[0]["href"];

/**
 * Builds the canonical URL + hreflang alternates map for a route, given a
 * function that resolves the (possibly locale-specific, e.g. a translated
 * service slug) href for any target locale.
 */
export function localeAlternates(currentLocale: string, hrefForLocale: (locale: string) => Href) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}${getPathname({ href: hrefForLocale(locale) as never, locale })}`;
  }
  languages["x-default"] = languages[routing.defaultLocale];

  return {
    canonical: languages[currentLocale] ?? languages[routing.defaultLocale],
    languages,
  };
}
