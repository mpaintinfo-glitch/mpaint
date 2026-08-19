"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "../i18n/navigation";
import { logoWhite } from "../assets";
import { useModals } from "./ModalProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = ["home", "services", "contact"] as const;

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { openQuote } = useModals();
  const [navOpen, setNavOpen] = useState(false);

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item === "home") return pathname === "/";
    if (item === "services") return pathname.startsWith("/services");
    if (item === "contact") return pathname === "/contact";
    return false;
  };

  const NAV_HREF = { home: "/", services: "/services", contact: "/contact" } as const;

  return (
    <header className={`header${navOpen ? " nav-open" : ""}`}>
      <div className="container nav">
        <Link href="/" className="logo" onClick={() => setNavOpen(false)}>
          <Image
            src={logoWhite}
            alt="Mpaint"
            style={{
              height: "48px",
              width: "auto",
              maxWidth: "160px",
              objectFit: "contain",
              objectPosition: "left center",
            }}
          />
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="navMenu"
          aria-label={t("aria.openMenu")}
          onClick={() => setNavOpen((o) => !o)}
        >
          <svg><use href="#i-menu" /></svg>
        </button>

        <ul className="nav-links" id="navMenu">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <Link href={NAV_HREF[item]} className={isActive(item) ? "active" : ""} onClick={() => setNavOpen(false)}>
                {t(`nav.${item}`)}
              </Link>
            </li>
          ))}
          {/* "Tehtud tööd" hidden for now - no portfolio content yet, re-add
              once real before/after project photos exist. See Footer.tsx too. */}
        </ul>

        <div className="nav-right">
          <LanguageSwitcher />

          <a className="btn btn-fill btn-sm" onClick={() => { openQuote(); setNavOpen(false); }} style={{ cursor: "pointer" }}>
            {t("nav.bookNow")}
          </a>
        </div>
      </div>
    </header>
  );
}
