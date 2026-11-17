import { aboutPage } from "@/content/about";
import { admissionPage } from "@/content/admission";
import { blogPage, postPath, posts } from "@/content/blog";
import { facilitiesPage } from "@/content/facilities-page";
import { faqPage } from "@/content/family-faqs";
import { galleryPage } from "@/content/gallery-page";
import { medicalPage } from "@/content/medical";
import { privacyPage } from "@/content/privacy";
import { testimonialsPage } from "@/content/testimonials-page";
import { locationPages } from "@/content/locations";
import { servicePages } from "@/content/service-pages";

export interface PageMeta { path: string; title: string; description: string; h1: string; legacy?: boolean }

/**
 * Titles, meta descriptions and H1s for every live page, in one place, so tests can check
 * they're all present, unique and the right length. Service and location pages keep theirs
 * in their content files; the fixed pages are listed here.
 */
export const fixedPageMeta: Record<"/" | "/service/" | "/branches/" | "/contact/", PageMeta> = {
  "/": {
    path: "/",
    title: "Old Age Homes in Pune with Nursing Care | Swarnavihar",
    description:
      "Old age homes in Baner, Sus, Wakad, Sinhgad Road and Pimple Nilakh, Pune, with nurses on every shift, doctor visits and physiotherapy. Visit before you decide.",
    h1: "Care for your parents, close to where you live",
  },
  "/service/": {
    path: "/service/",
    title: "Elderly Care Services in Pune | Swarnavihar Old Age Homes",
    description:
      "Old age home, assisted living, nursing, dementia, bedridden and post-stroke care, physiotherapy and recovery after hospital at Swarnavihar's Pune homes.",
    h1: "Care services",
  },
  "/branches/": {
    path: "/branches/",
    title: "Our Old Age Homes in Pune & Bengaluru | Swarnavihar",
    description:
      "Six Swarnavihar homes: Baner, Sus, Wakad, Sinhgad Road and Pimple Nilakh in Pune, and Gottigere in Bengaluru. Addresses, phone numbers and directions.",
    h1: "Our homes",
  },
  "/contact/": {
    path: "/contact/",
    title: "Contact Swarnavihar Old Age Homes, Pune",
    description:
      "Phone, WhatsApp and email for all six Swarnavihar homes in Pune and Bengaluru, or send us a message and we'll reply.",
    h1: "Contact us",
  },
};

export function allPageMeta(): PageMeta[] {
  return [
    ...Object.values(fixedPageMeta),
    ...[admissionPage, aboutPage, facilitiesPage, medicalPage, faqPage, blogPage, galleryPage, testimonialsPage, privacyPage].map((pg) => ({ path: pg.path, title: pg.metaTitle, description: pg.metaDescription, h1: pg.h1 })),
    ...posts.map((pt) => ({ path: postPath(pt), title: pt.metaTitle, description: pt.metaDescription, h1: pt.title, legacy: pt.legacy })),
    ...servicePages.map((s) => ({ path: `/service/${s.slug}/`, title: s.metaTitle, description: s.metaDescription, h1: s.h1 })),
    ...locationPages.map((l) => ({ path: l.path, title: l.metaTitle, description: l.metaDescription, h1: l.h1 })),
  ];
}
