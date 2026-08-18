"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import type { Locale } from "../i18n/routing";

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
    router.replace(pathname, { locale: code });
    setOpen(false);
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
