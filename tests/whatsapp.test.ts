import { test } from "node:test";
import assert from "node:assert/strict";
import { whatsappLink } from "../src/content/site";
import { whatsappMessageForPath } from "../src/lib/whatsapp";

test("WhatsApp messages match the page", () => {
  assert.match(whatsappMessageForPath("/old-age-home-wakad-pune/"), /Akshaya Nivas/);
  assert.match(whatsappMessageForPath("/old-age-home-baner-pune"), /Baner and Sus/);
  assert.match(whatsappMessageForPath("/service/dementia-care-in-pune/"), /dementia care/);
  assert.match(whatsappMessageForPath("/contact/"), /question/);
  assert.match(whatsappMessageForPath("/"), /care for my parent/);
});

test("click-to-chat links: wa.me, Indian number, encoded message, nothing sent automatically", () => {
  const url = new URL(whatsappLink("Hello & namaste?"));
  assert.equal(url.host, "wa.me");
  assert.match(url.pathname, /^\/91\d{10}$/);
  assert.equal(url.searchParams.get("text"), "Hello & namaste?");
});
