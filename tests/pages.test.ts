import { test } from "node:test";
import assert from "node:assert/strict";
import { branches, branchesIn, branchPhotos } from "../src/content/branches";
import { locationPages } from "../src/content/locations";
import { servicePages } from "../src/content/service-pages";
import { services } from "../src/content/services";
import { breadcrumbSchema, faqSchema, graph, localBusinessSchema, postalAddress, serviceSchema } from "../src/lib/schema";
import { pageMetadata } from "../src/lib/metadata";

/** Splits text into normalised sentences for duplicate detection. */
const sentences = (texts: string[]) =>
  texts.flatMap((t) => t.split(/(?<=[.!?])\s+/)).map((s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim()).filter((s) => s.split(" ").length >= 6);

function assertNoSharedSentences(groups: Record<string, string[]>) {
  const seen = new Map<string, string>();
  for (const [owner, texts] of Object.entries(groups)) {
    for (const s of new Set(sentences(texts))) {
      const prev = seen.get(s);
      assert.ok(!prev || prev === owner, `"${s}" appears on both ${prev} and ${owner}`);
      seen.set(s, owner);
    }
  }
}

test("location pages: four, with the brief's URLs, each with its own metadata", () => {
  assert.deepEqual(locationPages.map((l) => l.path).sort(), [
    "/old-age-home-baner-pune/", "/old-age-home-pimple-nilakh-pune/",
    "/old-age-home-sinhgad-road-pune/", "/old-age-home-wakad-pune/",
  ]);
  for (const key of ["h1", "metaTitle", "metaDescription", "lede"] as const) {
    assert.equal(new Set(locationPages.map((l) => l[key])).size, 4, `${key} must be unique`);
  }
});

test("metadata lengths suit search results (title ≤ 60, description 70–160)", () => {
  for (const p of [...locationPages, ...servicePages]) {
    assert.ok(p.metaTitle.length <= 60, `${p.metaTitle} (${p.metaTitle.length})`);
    assert.ok(p.metaDescription.length >= 70 && p.metaDescription.length <= 160, `${p.metaDescription.length}: ${p.metaDescription}`);
  }
});

test("location content is genuinely unique: no sentence shared between areas", () => {
  assertNoSharedSentences(Object.fromEntries(locationPages.map((l) => [
    l.name, [l.lede, ...l.intro, ...l.areasServed.map((a) => a.note), ...l.findingUs.map((f) => f.landmarks), ...l.faqs.map((f) => f.a.value)],
  ])));
});

test("service content is genuinely unique: no sentence shared between services", () => {
  assertNoSharedSentences(Object.fromEntries(servicePages.map((s) => [
    s.slug, [s.lede, ...s.what, ...s.who, ...s.consider, ...s.care.map((c) => c.detail), ...s.faqs.map((f) => f.a.value)],
  ])));
});

test("no keyword stuffing: 'old age home' used at most twice in a location page's prose", () => {
  for (const l of locationPages) {
    const prose = [l.lede, ...l.intro, ...l.areasServed.map((a) => a.note)].join(" ").toLowerCase();
    const n = prose.split("old age home").length - 1;
    assert.ok(n <= 2, `${l.name}: ${n}`);
  }
});

test("each location's directions refer to its own homes", () => {
  for (const l of locationPages) {
    const ids = branchesIn(l.area).map((b) => b.id).sort();
    assert.deepEqual(l.findingUs.map((f) => f.branchId).sort(), ids, l.name);
  }
});

test("the brief's six service pages exist and keep existing WordPress URLs", () => {
  const slugs = servicePages.map((s) => s.slug);
  for (const s of [
    "dementia-care-in-pune", "bedridden-patient-care-in-pune", "nursing-care-in-pune",
    "post-stroke-rehabilitation-in-pune", "physiotherapy-rehabilitation-in-pune", "post-operative-care-in-pune",
  ]) assert.ok(slugs.includes(s), s);
  for (const s of slugs) assert.ok(services.some((x) => x.slug === s), `${s} missing from services list`);
});

test("every service page answers all six questions with real substance", () => {
  for (const s of servicePages) {
    assert.ok(s.what.length >= 2, `${s.slug}: what`);
    assert.ok(s.who.length >= 4, `${s.slug}: who`);
    assert.ok(s.care.length >= 5, `${s.slug}: care`);
    assert.ok(s.facilities.length >= 3, `${s.slug}: facilities`);
    assert.ok(s.consider.length >= 4, `${s.slug}: consider`);
    assert.ok(s.documents.length >= 3, `${s.slug}: admission documents`);
    assert.ok(s.faqs.length >= 3, `${s.slug}: faqs`);
  }
});

test("related links only point to service pages that exist", () => {
  const built = new Set(servicePages.map((s) => s.slug));
  for (const s of servicePages) for (const r of s.related) assert.ok(built.has(r) && r !== s.slug, `${s.slug} → ${r}`);
});

test("no outcome promises in service copy", () => {
  const banned = /\b(guarantee|cure[sd]?|100%|best in pune|no\.? ?1|fully recover|will recover)\b/i;
  for (const s of servicePages) {
    const text = [s.lede, ...s.what, ...s.care.map((c) => c.detail), ...s.faqs.map((f) => f.a.value)].join(" ");
    assert.ok(!banned.test(text), `${s.slug}: ${text.match(banned)?.[0]}`);
  }
});

test("schema: LocalBusiness has a parsed postal address and no invented ratings", () => {
  const b = branches.find((x) => x.id === "wakad")!;
  const node = localBusinessSchema(b) as ReturnType<typeof localBusinessSchema> & { address: ReturnType<typeof postalAddress> };
  assert.equal(node["@type"], "LocalBusiness");
  assert.equal(node.address.postalCode, "411057");
  assert.equal(node.address.addressLocality, "Pune");
  assert.ok(!node.address.streetAddress.includes("411057"));
  assert.match(node.url, /^https:\/\/swarnaviharoldagehomes\.com\/old-age-home-wakad-pune\/$/);
  const json = JSON.stringify(graph(node));
  assert.ok(!/aggregateRating|review/i.test(json));
});

test("schema: every branch address yields a 6-digit PIN", () => {
  for (const b of branches) assert.match(postalAddress(b).postalCode ?? "", /^\d{6}$/, b.id);
});

test("schema: breadcrumb positions and FAQ entries", () => {
  const bc = breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Care services", href: "/service/" }]);
  assert.deepEqual(bc.itemListElement.map((i) => i.position), [1, 2]);
  assert.equal(bc.itemListElement[1].item, "https://swarnaviharoldagehomes.com/service/");
  const faq = faqSchema(servicePages[0].faqs)!;
  assert.equal(faq.mainEntity.length, servicePages[0].faqs.filter((f) => f.a.status !== "placeholder").length);
  assert.equal(serviceSchema({ name: "x", description: "y", path: "/service/x/", serviceType: "x" }).provider["@id"], "https://swarnaviharoldagehomes.com/#organization");
});

test("pageMetadata sets an absolute title and canonical", () => {
  const m = pageMetadata({ title: "T", description: "D", path: "/p/" });
  assert.deepEqual(m.title, { absolute: "T" });
  assert.equal((m.alternates as { canonical: string }).canonical, "/p/");
});

test("each home has a three-picture set with descriptive alt text", () => {
  for (const b of branches) {
    const photos = branchPhotos(b);
    assert.equal(photos.length, 3);
    for (const p of photos) assert.ok(p.alt.includes(b.house.value));
  }
});
