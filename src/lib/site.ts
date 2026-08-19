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
export const NOTIFY_EMAILS = ["info.mpaint@gmail.com"];
