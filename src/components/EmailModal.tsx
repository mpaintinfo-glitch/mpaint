"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocale, useTranslations } from "next-intl";
import { BUSINESS } from "../lib/site";

export default function EmailModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("emailModal");
  const locale = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_PHOTOS = 5;

  // Safety net: Radix's exit-animation-driven unmount occasionally fails to
  // release its scroll lock (body stuck at pointer-events:none, freezing the
  // whole page), so force-clear it shortly after every close regardless of
  // whether Radix's own cleanup ran.
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => {
      document.body.style.removeProperty("pointer-events");
    }, 250);
    return () => clearTimeout(timer);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);

    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("email", form.email);
    formData.set("phone", form.phone);
    formData.set("message", form.message);
    formData.set("locale", locale);
    photos.forEach((p) => formData.append("photos", p.file, p.file.name));

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) throw new Error("request failed");
      setSent(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (o: boolean) => {
    onOpenChange(o);
    if (!o) {
      setTimeout(() => {
        setSent(false);
        setSubmitError(false);
        setForm({ name: "", email: "", phone: "", message: "" });
        setPhotos((prev) => {
          prev.forEach((p) => URL.revokeObjectURL(p.url));
          return [];
        });
      }, 300);
    }
  };

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

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="email-overlay" />
        <Dialog.Content className="email-dialog">
          <Dialog.Close className="email-close" aria-label={t("ariaClose")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Dialog.Close>

          {!sent ? (
            <>
              <div className="center" style={{ marginBottom: "1.5rem" }}>
                <div className="eyebrow">{t("eyebrow")}</div>
                <Dialog.Title style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--white)", margin: 0 }}>
                  {t("title")}
                </Dialog.Title>
                <Dialog.Description style={{ color: "var(--med)", marginTop: "0.4rem", fontSize: "15px", fontWeight: 300 }}>
                  {t("desc")}
                </Dialog.Description>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="f2" style={{ marginBottom: "1rem" }}>
                  <input
                    className="inp" type="text" placeholder={t("placeholderName")} required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                  <input
                    className="inp" type="email" placeholder={t("placeholderEmail")} required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="field-block">
                  <input
                    className="inp" type="tel" placeholder={t("placeholderPhone")}
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>

                <div className="field-block upload-block" style={{ marginTop: "1.25rem" }}>
                  <div className="upload-label">{t("uploadLabel")}</div>
                  <input
                    ref={fileInputRef}
                    type="file" accept="image/*" multiple
                    style={{ display: "none" }}
                    onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }}
                  />
                  {photos.length > 0 && (
                    <div className="upload-thumbs">
                      {photos.map((p, i) => (
                        <div className="upload-thumb" key={p.url}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.url} alt="" />
                          <button
                            type="button" className="upload-thumb-remove"
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
                      className="upload-drop"
                      onClick={() => fileInputRef.current?.click()}
                      role="button" tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                    >
                      <span>{t("uploadHint")}</span>
                    </div>
                  )}
                </div>

                <div className="field-block" style={{ marginTop: "1rem" }}>
                  <textarea
                    className="inp email-textarea" placeholder={t("placeholderMessage")} required rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>
                {submitError && (
                  <div className="fnote" style={{ color: "#E0007A" }}>{t("submitError")}</div>
                )}
                <button className="btn btn-fill btn-full" style={{ marginTop: "1.5rem" }} type="submit" disabled={submitting}>
                  {submitting ? t("submitting") : t("submit")}
                </button>
                <div className="fnote">{t("fnote")}</div>
              </form>
            </>
          ) : (
            <div className="center" style={{ padding: "2rem 0 1rem" }}>
              <div className="email-success-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <Dialog.Title style={{ fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 700, color: "var(--white)", margin: "0 0 0.75rem" }}>
                {t("thankYou")}{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
              </Dialog.Title>
              <Dialog.Description style={{ color: "var(--med)", fontSize: "15px", fontWeight: 300, lineHeight: 1.7, maxWidth: "36ch", margin: "0 auto" }}>
                {t("successDescPre")} <strong style={{ color: "var(--white)", fontWeight: 500 }}>{form.email}</strong> {t("successDescPost")}
              </Dialog.Description>
              <p style={{ color: "var(--low)", fontSize: "13px", marginTop: "1rem", lineHeight: 1.6 }}>
                {t("hurryPre")} <a href={BUSINESS.phoneHref} style={{ color: "var(--med)" }}>{BUSINESS.phone}</a>.
              </p>
              <button
                className="btn btn-line"
                style={{ marginTop: "2rem" }}
                onClick={() => handleOpenChange(false)}
              >
                {t("backToSite")}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
