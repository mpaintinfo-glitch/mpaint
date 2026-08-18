"use client";

import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import Icon from "./Icon";
import { SERVICE_ICON, type ServiceId } from "../data/services";
import "./quote-funnel.css";

const SERVICE_IDS: Exclude<ServiceId, never>[] = ["paint", "body", "dent", "rust", "polish", "parts"];

export default function QuoteFunnel({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService?: ServiceId | null;
}) {
  const t = useTranslations("quoteFunnel");
  const catalog = useTranslations("catalog");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"fwd" | "bwd">("fwd");
  const [services, setServices] = useState<Set<ServiceId | "other">>(
    () => new Set(initialService ? [initialService] : [])
  );
  const [carInfo, setCarInfo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const MAX_PHOTOS = 5;

  const toggleService = (id: ServiceId | "other") =>
    setServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, MAX_PHOTOS - photos.length)
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...incoming]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const goStep = (n: number) => {
    setDir(n > step ? "fwd" : "bwd");
    setStep(n);
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="qf-overlay" />
        <Dialog.Content className="qf-root qf-content" aria-describedby={undefined}>
          <Dialog.Title style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
            {step === 0 ? t("step1Title") : t("step2Title")}
          </Dialog.Title>

          <div className="qf-scroll">
            {!sent && (
              <div className="qf-header">
                <div className="qf-header-top">
                  <span className="qf-steplabel">{t("step")} {step + 1} / 2</span>
                  <Dialog.Close className="qf-close" aria-label={t("close")}>
                    <Icon id="i-close" />
                  </Dialog.Close>
                </div>
                <div className="qf-progress">
                  <span className={step >= 0 ? "active" : ""}><i /></span>
                  <span className={step >= 1 ? "active" : ""}><i /></span>
                </div>
                <div className="qf-title">{step === 0 ? t("step1Title") : t("step2Title")}</div>
              </div>
            )}

            <div className="qf-body">
              {sent ? (
                <div className="qf-success">
                  <div className="qf-success-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3>{t("successTitle")}</h3>
                  <p>{t("successDesc")}</p>
                  <button className="qf-btn qf-btn-primary" onClick={onClose} type="button">{t("done")}</button>
                </div>
              ) : step === 0 ? (
                <div key="step0" className={`qf-step qf-step-${dir}`}>
                  <div className="qf-cards-head">
                    <button
                      type="button"
                      className={`qf-chip-other${services.has("other") ? " selected" : ""}`}
                      onClick={() => toggleService("other")}
                    >
                      {t("notSure")}
                    </button>
                  </div>
                  <div className="qf-cards">
                    {SERVICE_IDS.map((id) => (
                      <button
                        key={id}
                        type="button"
                        className={`qf-card${services.has(id) ? " selected" : ""}`}
                        onClick={() => toggleService(id)}
                      >
                        <span className="qf-card-icon"><Icon id={SERVICE_ICON[id]} /></span>
                        <span className="qf-card-label">{catalog(id)}</span>
                      </button>
                    ))}
                  </div>
                  <div className="qf-field-block">
                    <input
                      className="qf-input" type="text" placeholder={t("carPlaceholder")}
                      value={carInfo} onChange={(e) => setCarInfo(e.target.value)}
                    />
                  </div>
                  <div className="qf-actions">
                    <button
                      className="qf-btn qf-btn-primary" type="button"
                      disabled={services.size === 0}
                      style={services.size ? undefined : { opacity: 0.45, cursor: "not-allowed" }}
                      onClick={() => services.size > 0 && goStep(1)}
                    >
                      {t("continueLabel")}
                    </button>
                  </div>
                </div>
              ) : (
                <form key="step1" className={`qf-step qf-step-${dir}`} onSubmit={handleSubmit}>
                  <input
                    ref={photoInputRef}
                    type="file" accept="image/*" multiple
                    style={{ display: "none" }}
                    onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }}
                  />
                  {photos.length > 0 && (
                    <div className="qf-thumbs">
                      {photos.map((p, i) => (
                        <div className="qf-thumb" key={p.url}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.url} alt="" />
                          <button
                            type="button" className="qf-thumb-remove"
                            aria-label={t("removePhoto")}
                            onClick={() => removePhoto(i)}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {photos.length < MAX_PHOTOS && (
                    <div
                      className="qf-drop"
                      onClick={() => photoInputRef.current?.click()}
                      role="button" tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") photoInputRef.current?.click(); }}
                    >
                      {t("dropText")}
                    </div>
                  )}
                  <div className="qf-row">
                    <div className="qf-field-block">
                      <input className="qf-input" type="text" placeholder={t("namePh")} required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="qf-field-block">
                      <input className="qf-input" type="tel" placeholder={t("phonePh")} required value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div className="qf-field-block">
                    <label className="qf-field-label">{t("notesLabel")}</label>
                    <textarea
                      className="qf-textarea" placeholder={t("notesPh")} rows={3}
                      value={notes} onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="qf-disclaimer">{t("disclaimer")}</div>
                  <div className="qf-actions" style={{ marginTop: ".85rem" }}>
                    <button className="qf-btn qf-btn-secondary" type="button" onClick={() => goStep(0)}>{t("back")}</button>
                    <button className="qf-btn qf-btn-primary" type="submit">{t("submit")}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
