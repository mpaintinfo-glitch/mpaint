import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../src/i18n/routing";
import IconSprite from "../../src/components/IconSprite";
import ModalProvider from "../../src/components/ModalProvider";
import Header from "../../src/components/Header";
import Fab from "../../src/components/Fab";
import LocalBusinessJsonLd from "../../src/components/LocalBusinessJsonLd";
import { SITE_URL } from "../../src/lib/site";
import "../../src/styles/index.css";

// Fonts: this used to preload three subsets (latin, latin-ext, cyrillic = ~96kB)
// on every page, competing with the stylesheet for bandwidth on first load. All
// site copy fits in latin (ET/EN) or latin + cyrillic (RU); latin-ext glyphs are
// not used anywhere, so that file is dropped.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const OG_LOCALE: Record<string, string> = { et: "et_EE", ru: "ru_EE", en: "en_US" };

// NextIntlClientProvider serialises whatever it is given into every page's HTML.
// Passing the whole catalog shipped every page's copy (home, services, blog, ...)
// to every visitor; the client components only use these namespaces
// (Header: nav + aria, Fab: fab, EmailModal: emailModal, QuoteFunnel:
// quoteFunnel + catalog). Add a namespace here if a new client component needs one.
const CLIENT_NAMESPACES = ["nav", "aria", "fab", "emailModal", "catalog", "quoteFunnel"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | Mpaint",
      default: "Mpaint",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      siteName: "Mpaint",
      type: "website",
      locale: OG_LOCALE[locale] ?? "et_EE",
      images: [{ url: "/mpaint-workshop.jpg", width: 1280, height: 609 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/mpaint-workshop.jpg"],
    },
  };
}

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
  const allMessages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, allMessages[ns]]));

  return (
    <html lang={locale} className={manrope.variable}>
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          <LocalBusinessJsonLd locale={locale} />
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
