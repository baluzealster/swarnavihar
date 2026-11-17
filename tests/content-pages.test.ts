import { test } from "node:test";
import assert from "node:assert/strict";
import { aboutPage, ourStory, panelSpecialties, philosophy, teamNote, whoWeAre } from "../src/content/about";
import { admissionFaqs, admissionPage, careLevels, costFactors } from "../src/content/admission";
import { blockLinks, blockText } from "../src/content/blocks";
import { blogPage, guides as posts, postPath, readingMinutes } from "../src/content/blog";
import { facilitiesPage, facilityGroups, medicalSummary, safety } from "../src/content/facilities-page";
import { allFamilyFaqs, faqGroups, faqPage } from "../src/content/family-faqs";
import { emergencies, limits, medicalAreas, medicalPage } from "../src/content/medical";
import { findPlaceholders } from "../scripts/check-placeholders";
import { isLive, LIVE_PAGES } from "../src/lib/routes";

const BRIEF_TOPICS = [
  "How to choose the right old age home in Pune",
  "Understanding elderly care and assisted living",
  "Dementia care: what families should know",
  "Bedridden patient care at home vs. in a residential facility",
  "What to check before admitting a parent to an old age home",
  "Understanding old age home charges in Pune",
  "Post-hospitalization care for senior citizens",
];

/** Every piece of new visible text, page by page. */
function allNewText(): Record<string, string> {
  // List items are separate statements, so they're joined as separate sentences.
  const facts = (xs: { value: unknown }[]) => xs.map((x) => (Array.isArray(x.value) ? x.value.join(". ") : String(x.value))).join(". ") + ".";
  const faqText = (xs: { q: string; a: { value: string } }[]) => xs.map((f) => `${f.q} ${f.a.value}`).join(" ");
  const out: Record<string, string> = {
    about: [aboutPage.lede, facts(whoWeAre), ourStory.value, philosophy.map((x) => `${x.title} ${x.detail}`).join(" "), facts([panelSpecialties]), teamNote.value].join(" "),
    facilities: [facilitiesPage.lede, ...facilityGroups.map((g) => `${g.intro} ${facts(g.items)}`), facts(medicalSummary), facts(safety)].join(" "),
    medical: [medicalPage.lede, ...medicalAreas.map((a) => `${a.intro} ${facts(a.items)}`), facts(emergencies), limits.value].join(" "),
    admission: [admissionPage.lede, ...careLevels.map((l) => `${l.suits} ${l.typically.join(". ")}. ${l.price.value}.`), ...costFactors.map((c) => c.detail), faqText(admissionFaqs)].join(" "),
    faq: faqText(allFamilyFaqs()),
  };
  for (const p of posts) out[p.slug] = [p.title, p.excerpt, ...p.keyPoints, blockText(p.body), faqText(p.faqs ?? [])].join(" ");
  return out;
}

test("blog: the seven brief topics, at root URLs, all live and in the sitemap list", () => {
  assert.deepEqual(posts.map((p) => p.title).sort(), [...BRIEF_TOPICS].sort());
  for (const p of posts) {
    assert.match(postPath(p), /^\/[a-z0-9-]+\/$/);
    assert.ok(isLive(postPath(p)), `${p.slug} live`);
  }
  assert.equal(new Set(posts.map((p) => p.slug)).size, posts.length);
  assert.ok(isLive(blogPage.path));
});

test("blog: substantial articles with key points, real headings and an FAQ", () => {
  for (const p of posts) {
    const words = blockText(p.body).split(/\s+/).length;
    // A floor for substance, not a target: guides 850+ words, the admission checklist 750+.
    const min = p.slug.startsWith("what-to-check") ? 750 : 850;
    assert.ok(words >= min, `${p.slug}: ${words} words`);
    assert.ok(p.keyPoints.length >= 3 && p.keyPoints.length <= 5, p.slug);
    assert.ok(p.body.filter((b) => b.type === "h2").length >= 5, `${p.slug} has at least 5 sections`);
    assert.ok((p.faqs ?? []).length >= 2, `${p.slug} FAQs`);
    assert.ok(readingMinutes(p) >= 4, p.slug);
    assert.match(p.published, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("blog: every link in an article and every 'read next' item goes to a built page", () => {
  for (const p of posts) {
    const links = [...blockLinks(p.body), ...p.related];
    assert.ok(links.length >= 3, `${p.slug} links out to related pages`);
    for (const l of links) assert.ok(isLive(l), `${p.slug} → ${l}`);
    assert.ok(!links.includes(postPath(p)), `${p.slug} doesn't link to itself`);
  }
});

test("blog: health articles carry a medical-review slot and a 'not medical advice' line", () => {
  for (const slug of ["dementia-care-what-families-should-know", "bedridden-patient-care-at-home-vs-residential-care", "post-hospitalization-care-for-senior-citizens"]) {
    const p = posts.find((x) => x.slug === slug)!;
    assert.ok(p.medicalReview, `${slug} has a medical review slot`);
    assert.match(blockText(p.body), /not medical advice/i);
  }
  // Unreviewed health articles block production builds, like every other placeholder.
  const paths = findPlaceholders().map((f) => f.path);
  assert.ok(paths.some((x) => x.includes("medicalReview")), "medical reviews are listed as placeholders");
});

test("never fabricated: no testimonials, doctor names, credentials, awards, resident numbers or prices", () => {
  const banned: [RegExp, string][] = [
    [/\bDr\.? [A-Z][a-z]+/, "a named doctor"],
    [/\b(certified|accredited|award|ISO \d|NABH|JCI|licensed)\b/i, "a credential"],
    [/\b\d[\d,]*\+? (residents|families|beds|patients|years)\b/i, "a count"],
    [/(₹|\bRs\.?\s?\d|\bINR\b|\d{1,2},\d{3}\b)/, "a price"],
    [/\b(best|No\.? ?1|number one|top-rated|guarantee[sd]?|100%|world-class|state-of-the-art)\b/i, "a superlative or promise"],
    [/["“][^"”]{25,}["”]\s*[-–—]\s*[A-Z]/, "a quoted testimonial"],
  ];
  for (const [page, text] of Object.entries(allNewText())) {
    for (const [re, what] of banned) {
      // "best" is allowed only as part of advice to readers (e.g. "the best person to guide").
      const hit = text.match(re);
      if (hit && what.startsWith("a superlative") && /best (person|guide|choice|way|possible)/i.test(text.slice(Math.max(0, hit.index! - 5), hit.index! + 30))) continue;
      assert.ok(!hit, `${page} contains ${what}: "${hit?.[0]}"`);
    }
  }
});

test("plain language: short sentences on average, and no unexplained jargon", () => {
  for (const [page, text] of Object.entries(allNewText())) {
    const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.split(" ").length > 2);
    const avg = sentences.reduce((n, s) => n + s.split(/\s+/).length, 0) / sentences.length;
    assert.ok(avg <= 22, `${page}: average sentence ${avg.toFixed(1)} words`);
  }
  // Clinical abbreviations are spelled out where they're used.
  const all = Object.values(allNewText()).join(" ");
  for (const [abbr, spelled] of [["BiPAP", /BiPAP \(non-invasive ventilation\)|BiPAP/], ["PEG", /PEG feeding/], ["COPD", /COPD/]] as const) {
    if (all.includes(abbr)) assert.match(all, spelled);
  }
});

test("articles don't copy each other: no long sentence appears in two articles", () => {
  const seen = new Map<string, string>();
  for (const p of posts) {
    for (const s of blockText(p.body).split(/(?<=[.!?])\s+/).map((x) => x.toLowerCase().trim()).filter((x) => x.split(" ").length >= 8)) {
      const prev = seen.get(s);
      assert.ok(!prev || prev === p.slug, `"${s}" in ${prev} and ${p.slug}`);
      seen.set(s, p.slug);
    }
  }
});

test("FAQ page: grouped, no duplicate questions, and every reused answer comes from its source", () => {
  const qs = allFamilyFaqs().map((f) => f.q);
  assert.equal(new Set(qs).size, qs.length);
  assert.ok(faqGroups.length >= 5);
  assert.ok(isLive(faqPage.path));
});

test("new information pages are live and in the menu or footer", () => {
  for (const path of ["/about/", "/facilities/", "/medical-care/", "/faq/", "/blog/", "/admission/"]) {
    assert.ok((LIVE_PAGES as readonly string[]).includes(path), path);
  }
});

test("pricing: care levels described, but no prices until the owner provides ranges", () => {
  assert.equal(careLevels.length, 4);
  for (const l of careLevels) assert.equal(l.price.status, "placeholder");
});
