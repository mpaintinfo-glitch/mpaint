"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import { useModals } from "./ModalProvider";

export default function Fab() {
  const t = useTranslations("fab");
  const [open, setOpen] = useState(false);
  const { openQuote, openEmail } = useModals();

  return (
    <div className={`fab-wrap${open ? " open" : ""}`}>
      <div className="fab-menu">
        <a className="fab-item" href="tel:+37258100810">
          <span className="fi"><Icon id="i-phone" /></span>
          <b>{t("call")}</b>
        </a>
        <a className="fab-item" href="https://wa.me/37258100810" target="_blank" rel="noopener">
          <span className="fi"><Icon id="i-wa" /></span>
          <b>{t("whatsapp")}</b>
        </a>
        <a className="fab-item" onClick={() => { openEmail(); setOpen(false); }} style={{ cursor: "pointer" }}>
          <span className="fi"><Icon id="i-mail" /></span>
          <b>{t("email")}</b>
        </a>
        <a className="fab-item" onClick={() => { openQuote(); setOpen(false); }} style={{ cursor: "pointer" }}>
          <span className="fi"><Icon id="i-doc" /></span>
          <b>{t("estimate")}</b>
        </a>
      </div>
      <button className="fab" aria-label={t("ariaContact")} onClick={() => setOpen((o) => !o)}>
        <svg className="ic-phone"><use href="#i-phone" /></svg>
        <svg className="ic-close"><use href="#i-close" /></svg>
      </button>
    </div>
  );
}
