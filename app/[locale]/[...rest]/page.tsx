import { notFound } from "next/navigation";

// Any URL that matches no real route lands here so it renders the localized
// not-found page (title, language, header/footer) with a proper 404 status,
// instead of Next's generic English 404 for unmatched paths.
export default function CatchAll() {
  notFound();
}
