import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../src/i18n/routing";
import IconSprite from "../../src/components/IconSprite";
import ModalProvider from "../../src/components/ModalProvider";
import Header from "../../src/components/Header";
import Fab from "../../src/components/Fab";
import LocalBusinessJsonLd from "../../src/components/LocalBusinessJsonLd";
import "../../src/styles/index.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mpaint.ee"),
  title: {
    template: "%s | Mpaint",
    default: "Mpaint",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <LocalBusinessJsonLd />
          <ModalProvider>
            <IconSprite />
            <Header />
            <main>{children}</main>
            <Fab />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
