export const SITE_URL = "https://mpaint.ee";

export const BUSINESS = {
  name: "Mpaint",
  phone: "+372 58-100-810",
  phoneHref: "tel:+37258100810",
  whatsappHref: "https://wa.me/37258100810",
  email: "info@mpaint.ee",
  address: {
    streetAddress: "Magasini tn 31",
    postalCode: "10138",
    addressLocality: "Tallinn",
    addressCountry: "EE",
  },
  geo: { latitude: 59.4221934, longitude: 24.7583585 },
  registryCode: "14939293",
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
} as const;

// Where lead notifications (quote requests, contact form) get sent.
// info@mpaint.ee needs the mpaint.ee domain verified in Resend to receive
// reliably - add it back to this array once that's done.
export const NOTIFY_EMAILS = ["info.mpaint@gmail.com"];

// Resend sandbox sender until the mpaint.ee domain is verified in Resend.
// Swap to e.g. "Mpaint <noreply@mpaint.ee>" once verified.
export const FROM_EMAIL = "Mpaint website <onboarding@resend.dev>";
