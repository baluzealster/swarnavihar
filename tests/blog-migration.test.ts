import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { blockLinks, blockText } from "../src/content/blocks";
import { legacyPosts, postPath } from "../src/content/blog";
import legacy from "../src/content/blog/legacy-posts.json";
import { isLive, PLANNED_PAGES } from "../src/lib/routes";
import { checkOldUrls } from "../scripts/check-urls";

const csv = readFileSync(new URL("../docs/phase-2/url-redirect-map.csv", import.meta.url), "utf8");
const oldPostUrls = csv.trim().split("\n").filter((l) => l.includes("blog post")).map((l) => l.split(",")[0]);

test("migration: all 48 old posts, at exactly their old URLs", () => {
  assert.equal(legacyPosts.length, 48);
  assert.deepEqual(legacyPosts.map(postPath).sort(), [...oldPostUrls].sort());
  for (const p of legacyPosts) assert.ok(isLive(postPath(p)), p.slug);
});

test("migration: no words lost in conversion (within 1% of the original text)", () => {
  for (const r of legacy as { slug: string; sourceWords: number; body: Parameters<typeof blockText>[0] }[]) {
    // Count real words (letters and digits) on both sides, so punctuation and markup can't hide a loss.
    const words = (blockText(r.body).match(/[A-Za-z0-9']+/g) ?? []).length;
    const diff = Math.abs(words - r.sourceWords) / r.sourceWords;
    assert.ok(diff <= 0.01, `${r.slug}: ${words} words vs ${r.sourceWords} in the original (${(diff * 100).toFixed(1)}%)`);
  }
});

test("migration: original dates kept, clean text, no leftover HTML", () => {
  for (const p of legacyPosts) {
    assert.match(p.published, /^20(2[2-5])-\d{2}-\d{2}$/, p.slug);
    const text = blockText(p.body);
    assert.ok(!/<\/?[a-z]+[^>]*>|&[a-z]+;|&#\d+;/i.test(text), `${p.slug} has leftover HTML`);
    assert.ok(p.body.every((b) => !("text" in b) || b.text.trim().length > 0), `${p.slug} has an empty block`);
    assert.ok(p.metaDescription.length >= 70 && p.metaDescription.length <= 161, `${p.slug} description ${p.metaDescription.length}`);
  }
});

test("migration: internal links repaired, pointing at built (or planned) pages", () => {
  for (const p of legacyPosts) {
    for (const l of blockLinks(p.body)) {
      assert.ok(!/comservice|\/services\/|paralytic-care|palliative-hospice-care|\/dementia-care\/$/.test(l), `${p.slug}: ${l}`);
      assert.ok(isLive(l) || (PLANNED_PAGES as readonly string[]).includes(l), `${p.slug} links to ${l}`);
    }
  }
});

test("migration: no stock images copied (licences unknown)", () => {
  assert.ok(!JSON.stringify(legacy).includes("wp-content/uploads"));
});

test("old URLs: every old blog post is now served", () => {
  const served = new Set(checkOldUrls().filter((r) => r.ok).map((r) => r.old));
  for (const u of oldPostUrls) assert.ok(served.has(u), u);
});
