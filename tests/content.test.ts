import { test } from "node:test";
import assert from "node:assert/strict";
import { areas, branches, branchesIn } from "../src/content/branches";
import { services } from "../src/content/services";
import { gallery } from "../src/content/gallery";
import { reasons, homeFacilities } from "../src/content/care";
import { heroSlides } from "../src/content/photos";
import { mainNav, serviceMenu, homesMenu } from "../src/components/layout/nav";
import { isLive } from "../src/lib/routes";
import { findPlaceholders } from "../scripts/check-placeholders";

test("every area has at least one home, and every home belongs to an area", () => {
  for (const a of areas) assert.ok(branchesIn(a.key).length > 0, a.key);
  for (const b of branches) assert.ok(areas.some((a) => a.key === b.area), b.id);
});

test("the four Pune location pages use the URLs from the brief", () => {
  const hrefs = areas.map((a) => a.href).filter(Boolean);
  for (const slug of ["baner", "wakad", "sinhgad-road", "pimple-nilakh"]) {
    assert.ok(hrefs.includes(`/old-age-home-${slug}-pune/`), slug);
  }
});

test("service slugs are unique and the 6 existing WordPress URLs are kept", () => {
  const slugs = services.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  const existing = services.filter((s) => s.existingUrl).map((s) => s.slug).sort();
  assert.deepEqual(existing, [
    "assisted-living-care", "dementia-care-in-pune", "geriatric-care-in-pune",
    "hospice-palliative-care-in-pune", "paralysis-care-centre-in-pune", "post-operative-care-in-pune",
  ]);
});

test("internal links use trailing slashes (matches WordPress URLs)", () => {
  for (const n of mainNav) assert.match(n.href, /^\/.*\/$/, n.href);
  for (const a of areas) if (a.href) assert.match(a.href, /\/$/);
});

test("gallery items have unique ids and real alt text", () => {
  assert.equal(new Set(gallery.map((g) => g.id)).size, gallery.length);
  for (const g of gallery) assert.ok(g.alt.length > 20, g.id);
});

test("placeholder guard finds dummy facts (including unconfirmed reasons)", () => {
  const found = findPlaceholders();
  assert.ok(found.length > 0);
  assert.ok(found.some((f) => f.path.startsWith("site.site.phone")));
  assert.ok(reasons.some((r) => r.status === "placeholder"));
});

/**
 * Pricing tone (owner's decision, 17 Nov 2026): the site sells the care, not the price tier.
 * No price figures, and no words that signal a premium price bracket, anywhere in our own copy
 * or components. Legacy blog posts are reported, not blocked (already public; see
 * docs/blog-migration-review.md).
 */
test("no prices or premium-tier wording in site copy", async () => {
  const { readdirSync, readFileSync, statSync } = await import("node:fs");
  const { join } = await import("node:path");
  const banned = [
    /₹/,
    /\bRs\.?\s?\d/i,
    /\bINR\s?\d/i,
    /\d[\d,]*\s?(\/-|\/month|per month|a month|lakh)/i,
    /\b(premium|luxury|luxurious|exclusive|high-end|upscale|five-star|5-star|elite)\b/i,
  ];
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(f) ? [p] : [];
    });
  const files = [...walk("src/content"), ...walk("src/components"), ...walk("src/app")];
  const hits: string[] = [];
  for (const file of files) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments are not copy
      for (const re of banned) if (re.test(line)) hits.push(`${file}:${i + 1}: ${line.trim().slice(0, 100)}`);
    });
  }
  assert.deepEqual(hits, [], `Pricing-tone words found:\n${hits.join("\n")}`);
});

test("every care service has a menu icon, and the Care services menu is one plain list", () => {
  for (const sv of services) assert.ok(sv.icon, sv.slug);
  assert.equal(serviceMenu.length, 1);
  assert.equal(serviceMenu[0].title, undefined);
  assert.ok(serviceMenu[0].links.length > 0);
  for (const l of serviceMenu[0].links) assert.ok(l.icon, l.label);
});

test("homepage facilities: icon, title and one short line each", () => {
  assert.equal(homeFacilities.length, 8);
  for (const f of homeFacilities) {
    assert.ok(f.icon && f.title, f.title);
    assert.ok(f.detail.length <= 90, `${f.title}: ${f.detail.length} characters`);
  }
});

test("hero slideshow: real photos with captions, a people-free photo first", () => {
  assert.ok(heroSlides.length >= 5);
  assert.equal(heroSlides[0].photo.people, false);
  for (const s of heroSlides) assert.ok(s.photo.src.startsWith("/photos/") && s.caption.length > 5);
});

test("Our homes menu is one plain list of every home, with icon and area", () => {
  assert.equal(homesMenu.length, 1);
  assert.equal(homesMenu[0].title, undefined);
  assert.equal(homesMenu[0].links.length, branches.length);
  for (const l of homesMenu[0].links) {
    assert.ok(l.icon && l.hint, l.label);
    assert.ok(isLive(l.href) || l.href === "/branches/", l.href);
  }
});
