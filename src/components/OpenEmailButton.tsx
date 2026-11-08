"use client";

import type { ReactNode } from "react";
import { useModals } from "./ModalProvider";

export default function OpenEmailButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openEmail } = useModals();
  return (
    <button type="button" className={className} onClick={() => openEmail()}>
      {children}
    </button>
  );
}
