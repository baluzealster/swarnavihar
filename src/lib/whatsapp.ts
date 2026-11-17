import { locationPages } from "@/content/locations";
import { servicePages } from "@/content/service-pages";

/** A pre-written WhatsApp message that matches the page the visitor is on. */
export function whatsappMessageForPath(path: string) {
  const p = path.endsWith("/") ? path : `${path}/`;
  const loc = locationPages.find((l) => l.path === p);
  if (loc) return loc.whatsappMessage;
  const svc = servicePages.find((s) => `/service/${s.slug}/` === p);
  if (svc) return `Hello, I'd like to know about ${svc.name.charAt(0).toLowerCase() + svc.name.slice(1)} for my parent.`;
  if (p === "/contact/") return "Hello, I have a question for Swarnavihar.";
  return "Hello, I'd like to know about care for my parent.";
}
