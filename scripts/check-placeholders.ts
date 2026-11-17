/**
 * Placeholder guard.
 * Lists every fact still marked "placeholder" in src/content.
 * Fails the build when deploying to production (Vercel production or STRICT_CONTENT=1),
 * so dummy phone numbers, names or statistics can never go live.
 *
 *   npm run check:content     → report only
 *   npm run build             → runs automatically; blocks production builds
 */
import * as site from "../src/content/site";
import * as branches from "../src/content/branches";
import * as services from "../src/content/services";
import * as care from "../src/content/care";
import * as gallery from "../src/content/gallery";
import * as locations from "../src/content/locations";
import * as servicePagesContent from "../src/content/service-pages";
import * as admission from "../src/content/admission";
import * as about from "../src/content/about";
import * as facilitiesPage from "../src/content/facilities-page";
import * as medical from "../src/content/medical";
import * as familyFaqs from "../src/content/family-faqs";
import * as blog from "../src/content/blog/index";
import * as privacy from "../src/content/privacy";
import * as galleryPage from "../src/content/gallery-page";
import * as testimonialsPage from "../src/content/testimonials-page";
import * as photosContent from "../src/content/photos";
import { pathToFileURL } from "node:url";

type Found = { path: string; value: unknown };

function walk(node: unknown, path: string, out: Found[]) {
  if (!node || typeof node !== "object") return;
  const obj = node as Record<string, unknown>;
  if (obj.status === "placeholder") out.push({ path, value: "value" in obj ? obj.value : "(whole record)" });
  for (const [k, v] of Object.entries(obj)) {
    if (k === "value" && obj.status) continue;
    walk(v, Array.isArray(node) ? `${path}[${k}]` : `${path}.${k}`, out);
  }
}

export function findPlaceholders(): Found[] {
  const out: Found[] = [];
  const modules = { site, branches, services, care, gallery, locations, servicePages: servicePagesContent, admission, about, facilitiesPage, medical, familyFaqs, blog, privacy, galleryPage, testimonialsPage, photos: photosContent };
  for (const [name, mod] of Object.entries(modules)) {
    for (const [exp, value] of Object.entries(mod)) {
      if (typeof value !== "function") walk(value, `${name}.${exp}`, out);
    }
  }
  return out;
}

function main() {
const found = findPlaceholders();
const strict = process.env.VERCEL_ENV === "production" || process.env.STRICT_CONTENT === "1";

if (found.length === 0) {
  console.log("✓ No placeholder content left.");
} else {
  const log = strict ? console.error : console.warn;
  log(`${strict ? "✗" : "!"} ${found.length} placeholder facts remain (see docs/phase-2/fact-sheet.md):`);
  for (const f of found) log(`   ${f.path} = ${JSON.stringify(f.value)}`);
  if (strict) {
    log("\nProduction build blocked: replace these with verified facts first.");
    process.exit(1);
  }
}
}

// Run only when executed directly (npm run build / check:content), not when imported by tests.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
