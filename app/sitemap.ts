import type { MetadataRoute } from "next";
import { routing } from "../src/i18n/routing";
import { SERVICE_SLUGS } from "../src/data/services";

const BASE_URL = "https://mpaint.ee";

function urlFor(locale: string, route: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${route}`;
}

function alternates(route: string): Record<string, string> {
  const entries = routing.locales.map((locale) => [locale, urlFor(locale, route)]);
  return Object.fromEntries(entries);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/contact",
    ...Object.values(SERVICE_SLUGS).map((slug) => `/services/${slug}`),
  ];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: urlFor(locale, route),
      alternates: { languages: alternates(route) },
    }))
  );
}
