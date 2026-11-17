/**
 * schema.org JSON-LD builders. Pure functions so they can be unit-tested.
 *
 * Rules (enforced by tests/seo.test.ts):
 *  - Only facts we hold are emitted: no ratings, no review counts, no invented geo-coordinates,
 *    no opening hours or prices we haven't been given.
 *  - Placeholder facts (dummy phones, unconfirmed answers) are left out of structured data, so
 *    search engines never see them, even on preview builds.
 *  - Each home has one stable @id (on its area page), so every page describes the same entity.
 */
import { areas, type Branch } from "@/content/branches";
import { site } from "@/content/site";
import { isPlaceholder, type Fact } from "@/content/types";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import { OG_IMAGE } from "./metadata";

export const absoluteUrl = (path: string) => new URL(path, site.domain.value).toString();

const ORG_ID = `${site.domain.value}/#organization`;
const SITE_ID = `${site.domain.value}/#website`;

/** Value of a fact, or undefined while it's still a placeholder. */
const known = <T,>(f: Fact<T>): T | undefined => (isPlaceholder(f) ? undefined : f.value);

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(OG_IMAGE.url),
    email: known(site.email),
    telephone: known(site.phone)?.tel,
    areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "City", name: "Bengaluru" }],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

/** The page that represents a home: its area page, or /branches/ for homes without one. */
export function branchPath(b: Branch) {
  return areas.find((a) => a.key === b.area)?.href ?? "/branches/";
}

/** Splits our single-line addresses into a PostalAddress. */
export function postalAddress(b: Branch) {
  const pin = b.address.value.match(/\b(\d{6})\b/)?.[1];
  const street = b.address.value
    .replace(/,?\s*(Pune|Bengaluru|BLR)\s*-?\s*\d{6}\s*$/i, "")
    .replace(/,\s*$/, "");
  return {
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: b.city,
    addressRegion: b.city === "Pune" ? "Maharashtra" : "Karnataka",
    postalCode: pin,
    addressCountry: "IN",
  };
}

export function localBusinessSchema(b: Branch) {
  const path = branchPath(b);
  const house = known(b.house);
  const covers = areas.find((a) => a.key === b.area)?.covers ?? [b.locality];
  return {
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl(path)}#${b.id}`,
    name: house ? `${house}, ${site.name}` : `${site.name}, ${b.locality}`,
    url: absoluteUrl(path),
    image: absoluteUrl(OG_IMAGE.url),
    telephone: known(b.phone)?.tel,
    address: isPlaceholder(b.address) ? undefined : postalAddress(b),
    areaServed: covers.map((name) => ({ "@type": "Place", name: `${name}, ${b.city}` })),
    parentOrganization: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

/** FAQPage from confirmed answers only; null when none are confirmed yet. */
export function faqSchema(faqs: { q: string; a: Fact<string> }[]) {
  const ready = faqs.filter((f) => !isPlaceholder(f.a));
  if (!ready.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: ready.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.value },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "City", name: "Pune" }],
  };
}

/** Drops undefined fields so placeholders never reach the output. */
const clean = (o: object) => JSON.parse(JSON.stringify(o)) as object;

/** Wraps several nodes in one @graph document (null nodes are skipped). */
export function graph(...nodes: (object | null | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter((n): n is object => !!n).map(clean) };
}

/** BlogPosting for an article. Author and publisher are the organisation: no invented people. */
export function blogPostingSchema(opts: { headline: string; description: string; path: string; published: string; updated?: string; reviewedBy?: string }) {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    image: absoluteUrl(OG_IMAGE.url),
    datePublished: opts.published,
    dateModified: opts.updated ?? opts.published,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(opts.reviewedBy ? { reviewedBy: { "@type": "Person", name: opts.reviewedBy } } : {}),
  };
}
