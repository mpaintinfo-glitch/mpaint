"use client";

import type { ReactNode } from "react";
import { useModals } from "./ModalProvider";
import type { ServiceId } from "../data/services";

export default function OpenQuoteButton({
  service,
  className,
  children,
}: {
  service?: ServiceId;
  className?: string;
  children: ReactNode;
}) {
  const { openQuote } = useModals();
  return (
    <a className={className} onClick={() => openQuote(service)} style={{ cursor: "pointer" }}>
      {children}
    </a>
  );
}
