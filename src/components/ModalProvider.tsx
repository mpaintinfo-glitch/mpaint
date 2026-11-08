"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { ServiceId } from "../data/services";

type ModalContextValue = {
  openQuote: (presetService?: ServiceId) => void;
  openEmail: () => void;
};

// The quote funnel and email modal (plus Radix Dialog and the form code) are only
// needed after a click, so they are code-split instead of sitting in every
// page's initial JavaScript. Both chunks are warmed once the browser is idle so
// the first click still opens instantly.
const loadQuoteFunnel = () => import("./QuoteFunnel");
const loadEmailModal = () => import("./EmailModal");
const QuoteFunnel = dynamic(loadQuoteFunnel, { ssr: false });
const EmailModal = dynamic(loadEmailModal, { ssr: false });

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModals(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePreset, setQuotePreset] = useState<ServiceId | null>(null);
  const [quoteKey, setQuoteKey] = useState(0);
  const [emailOpen, setEmailOpen] = useState(false);
  // mount each modal on first use and keep it mounted so Radix can animate the close
  const [quoteMounted, setQuoteMounted] = useState(false);
  const [emailMounted, setEmailMounted] = useState(false);

  useEffect(() => {
    const warm = () => {
      loadQuoteFunnel();
      loadEmailModal();
    };
    // requestIdleCallback is missing in Safari, hence the timer fallback
    const idle = (window as Window & { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(warm, 2500);
    return () => clearTimeout(timer);
  }, []);

  const openQuote = (presetService?: ServiceId) => {
    setQuotePreset(presetService ?? null);
    setQuoteMounted(true);
    setQuoteOpen(true);
    setQuoteKey((k) => k + 1);
  };

  const openEmail = () => {
    setEmailMounted(true);
    setEmailOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openQuote, openEmail }}>
      {children}
      {quoteMounted && (
        <QuoteFunnel key={quoteKey} open={quoteOpen} onClose={() => setQuoteOpen(false)} initialService={quotePreset} />
      )}
      {emailMounted && <EmailModal open={emailOpen} onOpenChange={setEmailOpen} />}
    </ModalContext.Provider>
  );
}
