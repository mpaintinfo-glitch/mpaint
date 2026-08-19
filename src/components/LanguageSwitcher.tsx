"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "../i18n/navigation";
import type { Locale } from "../i18n/routing";
import { getServiceBySlug, slugsForLocale } from "../data/services";

const LANGS: { code: Locale; label: string }[] = [
  { code: "et", label: "Eesti" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const LANG_BADGE: Record<Locale, string> = { en: "ENG", et: "EST", ru: "RUS" };

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const routeParams = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchTo = (code: Locale) => {
    setOpen(false);

    // Service detail pages have a locale-specific slug value (not just a
    // translated static segment), so the slug itself has to be remapped
    // to the target locale's slug for the same service - "as-needed"
    // locale prefixing + pathnames can't do this part on its own.
    const currentSlug = typeof routeParams.slug === "string" ? routeParams.slug : undefined;
    if (currentSlug) {
      const id = getServiceBySlug(locale, currentSlug);
      if (id) {
        router.replace(
          { pathname: "/services/[slug]", params: { slug: slugsForLocale(code)[id] } },
          { locale: code }
        );
        return;
      }
    }

    router.replace(pathname as "/" | "/services" | "/contact", { locale: code });
  };

  return (
    <div className={`lang${open ? " open" : ""}`} ref={ref}>
      <button className="lang-btn" onClick={() => setOpen((o) => !o)}>
        <span>{LANG_BADGE[locale]}</span>
        <svg><use href="#i-chev" /></svg>
      </button>
      <div className="lang-menu">
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={locale === l.code ? "on" : ""}
            onClick={() => switchTo(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
