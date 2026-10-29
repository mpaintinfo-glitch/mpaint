import type { MetadataRoute } from "next";
import { routing } from "../src/i18n/routing";
import { getPathname } from "../src/i18n/navigation";
import { SERVICE_ORDER, slugsForLocale } from "../src/data/services";
import { ARTICLE_ORDER, articleSlugsForLocale } from "../src/data/blog";
import { SITE_URL } from "../src/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

function urlFor(locale: string, href: Href): string {
  return `${SITE_URL}${getPathname({ href: href as never, locale })}`;
}

function alternatesFor(hrefForLocale: (locale: string) => Href): Record<string, string> {
  return Object.fromEntries(routing.locales.map((l) => [l, urlFor(l, hrefForLocale(l))]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Href[] = ["/", "/services", "/contact", "/pricing", "/blog", "/accident"];

  const staticEntries = staticRoutes.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, href),
      alternates: { languages: alternatesFor(() => href) },
    }))
  );

  const serviceEntries = routing.locales.flatMap((locale) =>
    SERVICE_ORDER.map((id) => ({
      url: urlFor(locale, { pathname: "/services/[slug]" as const, params: { slug: slugsForLocale(locale)[id] } }),
      alternates: {
        languages: alternatesFor((l) => ({
          pathname: "/services/[slug]" as const,
          params: { slug: slugsForLocale(l)[id] },
        })),
      },
    }))
  );

  const articleEntries = routing.locales.flatMap((locale) =>
    ARTICLE_ORDER.map((id) => ({
      url: urlFor(locale, { pathname: "/blog/[slug]" as const, params: { slug: articleSlugsForLocale(locale)[id] } }),
      alternates: {
        languages: alternatesFor((l) => ({
          pathname: "/blog/[slug]" as const,
          params: { slug: articleSlugsForLocale(l)[id] },
        })),
      },
    }))
  );

  return [...staticEntries, ...serviceEntries, ...articleEntries];
}
