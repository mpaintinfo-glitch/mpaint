"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import QuoteFunnel from "./QuoteFunnel";
import EmailModal from "./EmailModal";
import type { ServiceId } from "../data/services";

type ModalContextValue = {
  openQuote: (presetService?: ServiceId) => void;
  openEmail: () => void;
};

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

  const openQuote = (presetService?: ServiceId) => {
    setQuotePreset(presetService ?? null);
    setQuoteOpen(true);
    setQuoteKey((k) => k + 1);
  };

  const openEmail = () => setEmailOpen(true);

  return (
    <ModalContext.Provider value={{ openQuote, openEmail }}>
      {children}
      <QuoteFunnel key={quoteKey} open={quoteOpen} onClose={() => setQuoteOpen(false)} initialService={quotePreset} />
      <EmailModal open={emailOpen} onOpenChange={setEmailOpen} />
    </ModalContext.Provider>
  );
}
