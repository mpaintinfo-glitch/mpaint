import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// English service slugs -> Estonian slugs. Between 2026-08-18 and 2026-08-19 the
// ET and RU locales briefly served the English-style paths (/services/painting,
// /contact, ...) before the localized paths (/teenused/varvimine, /kontakt) went
// live. next-intl already bounces those with a temporary 307, and the service
// slugs it produces (/teenused/painting) don't exist, so anything indexed in that
// window ended in a 404. These permanent (308) redirects map each legacy URL to
// its exact counterpart. Kept as literals because src/data/services.ts imports
// image assets that a config file can't load.
const LEGACY_SERVICE_SLUGS: Record<string, string> = {
  painting: "varvimine",
  bodywork: "keretood",
  "dent-removal": "molkide-eemaldamine",
  "rust-removal": "roostetorje",
  polishing: "poleerimine",
  "parts-replacement": "osade-vahetus",
};

const nextConfig: NextConfig = {
  // don't advertise the framework in a response header
  poweredByHeader: false,

  async redirects() {
    const legacy = Object.entries(LEGACY_SERVICE_SLUGS).flatMap(([en, et]) => [
      { source: `/services/${en}`, destination: `/teenused/${et}`, permanent: true },
      { source: `/ru/services/${en}`, destination: `/ru/teenused/${et}`, permanent: true },
    ]);
    return [
      { source: "/services", destination: "/teenused", permanent: true },
      { source: "/ru/services", destination: "/ru/teenused", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/ru/contact", destination: "/ru/kontakt", permanent: true },
      ...legacy,
      // Estonian is the unprefixed default locale; an explicit /et prefix is a duplicate URL
      { source: "/et", destination: "/", permanent: true },
      { source: "/et/:path*", destination: "/:path*", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // nothing legitimately frames this site
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // the site uses none of these; the embedded Google map needs no geolocation
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
