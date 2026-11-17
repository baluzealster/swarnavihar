#!/usr/bin/env python3
"""
One-time import of the old WordPress blog into the new site.

Input:  swarnavihar-wordpress-export.json (exported 16 Nov 2026 from the live site's public
        /wp-json API: posts, pages, media, categories)
Output: src/content/blog/legacy-posts.json (articles as content blocks, see src/content/blocks.ts)
        docs/blog-migration-review.md (claims in the old posts that the owner should review)

What it changes, and what it doesn't:
  - URL (slug), title, publish and update dates, and the text are kept exactly.
  - HTML is converted to the site's block format: headings, paragraphs, lists, tables, links, bold.
  - Internal links are repaired (the old site had malformed ones like "...comservice/x/") and
    pointed at the new URLs. Links to pages that don't exist yet render as plain text.
  - Images are not imported: the post images are stock photos with unknown licences.
  - Nothing is reworded. Claims that break the site's content rules (superlatives, guarantees,
    unsourced prices and statistics) are listed in the review document for the owner to decide.

Usage: python3 scripts/import-wordpress.py swarnavihar-wordpress-export.json
"""
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAINS = ("swarnaviharoldagehomes.com",)

# Old slugs seen in post links → current URLs.
OLD_LINKS = {
    "/services/": "/service/",
    "/service/dementia-care/": "/service/dementia-care-in-pune/",
    "/service/geriatric-care/": "/service/geriatric-care-in-pune/",
    "/service/paralytic-care/": "/service/paralysis-care-centre-in-pune/",
    "/service/post-operative-care/": "/service/post-operative-care-in-pune/",
    "/service/palliative-hospice-care/": "/service/hospice-palliative-care-in-pune/",
}


def norm_link(href: str):
    """Internal links → clean relative paths; external links kept; archive links dropped."""
    href = html.unescape(href.strip())
    if "web.archive.org" in href:
        return None
    m = re.match(r"https?://(?:www\.)?(swarnaviharoldagehomes\.com)(.*)$", href)
    if m:
        path = m.group(2) or "/"
        if not path.startswith("/"):
            path = "/" + path  # repairs "...comservice/x/"
        path = path.split("#")[0].split("?")[0]
        if not path.endswith("/"):
            path += "/"
        return OLD_LINKS.get(path, path)
    if href.startswith("/"):
        return OLD_LINKS.get(href, href)
    if href.startswith(("http://", "https://")):
        return href
    return None


def clean(text: str) -> str:
    text = html.unescape(text).replace("\xa0", " ")
    text = re.sub(r"[ \t\r\n]+", " ", text)
    # Tidy bold markers the converter adds: "** text **" → "**text**", and drop empty ones.
    text = re.sub(r"\*\*\s*\*\*", " ", text)
    if text.count("**") % 2:
        text = text.replace("**", "")
    else:
        # Trim spaces just inside each bold pair ("** text **" → " **text** "), keeping the ones outside.
        text = re.sub(r"\*\*(\s*)(.*?)(\s*)\*\*", lambda m: f"{m.group(1)}**{m.group(2)}**{m.group(3)}", text)
    return re.sub(r" {2,}", " ", text).strip()


class Converter(HTMLParser):
    """Turns WordPress post HTML into a flat list of blocks."""

    BLOCK = {"p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "td", "th"}

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.blocks = []
        self.buf = None  # current text buffer for a block-level element
        self.kind = None
        self.list_stack = []  # [{"type": "ul"|"ol", "items": [...]}]
        self.table = None  # {"head": [...], "rows": [[...]], "row": [...], "in_head": bool}
        self.link = None  # [href, text_start_index]
        self.skip = 0

    # Inline text goes into the current buffer, or into an implicit paragraph.
    def _text(self, s):
        if self.skip:
            return
        if self.buf is None:
            if not s.strip():
                return
            self.buf, self.kind = [], "p"
        self.buf.append(s)

    def _flush(self):
        if self.buf is None:
            return
        text = clean("".join(self.buf))
        kind = self.kind
        self.buf, self.kind = None, None
        if not text:
            return
        if kind == "li" and self.list_stack:
            self.list_stack[-1]["items"].append(text)
        elif kind in ("td", "th") and self.table is not None:
            self.table["row"].append(text.replace("**", ""))
        elif kind and kind[0] == "h":
            self.blocks.append({"type": "heading", "level": int(kind[1]), "text": text.replace("**", "").strip()})
        else:
            for part in [t.strip() for t in text.split("\n") if t.strip()]:
                self.blocks.append({"type": "p", "text": part})

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "figcaption", "img", "iframe"):
            self.skip += tag in ("script", "style", "figcaption", "iframe")
            return
        if tag in ("ul", "ol"):
            self._flush()
            self.list_stack.append({"type": tag, "items": []})
        elif tag == "table":
            self._flush()
            self.table = {"head": [], "rows": [], "row": [], "in_head": False}
        elif tag == "thead" and self.table is not None:
            self.table["in_head"] = True
        elif tag == "tr" and self.table is not None:
            self.table["row"] = []
        elif tag in self.BLOCK:
            self._flush()
            self.buf, self.kind = [], tag
        elif tag in ("strong", "b"):
            self._text("**")
        elif tag == "br":
            self._text("\n" if self.kind in (None, "p") else " ")
        elif tag == "a":
            href = norm_link(a.get("href", ""))
            self.link = [href, len(self.buf) if self.buf is not None else 0]
            if self.buf is None:
                self.buf, self.kind = [], "p"
            self.link[1] = len(self.buf)

    def handle_endtag(self, tag):
        if tag in ("script", "style", "figcaption", "iframe"):
            self.skip = max(0, self.skip - 1)
            return
        if tag in ("strong", "b"):
            self._text("**")
        elif tag == "a" and self.link is not None:
            href, start = self.link
            self.link = None
            if self.buf is not None and href:
                raw = html.unescape("".join(self.buf[start:])).replace("\xa0", " ")
                inner = clean(raw).replace("**", "")
                if inner:
                    # Keep the spaces that sat just inside the link, or words run together.
                    lead = " " if raw[:1].isspace() else ""
                    trail = " " if raw[-1:].isspace() else ""
                    self.buf[start:] = [f"{lead}[{inner}]({href}){trail}"]
        elif tag in self.BLOCK:
            self._flush()
            if tag in ("td", "th") and self.table is not None and self.table["in_head"]:
                pass
        elif tag == "tr" and self.table is not None:
            row = self.table["row"]
            if row:
                if self.table["in_head"] or (not self.table["head"] and not self.table["rows"] and False):
                    self.table["head"] = row
                else:
                    self.table["rows"].append(row)
            self.table["row"] = []
        elif tag == "thead" and self.table is not None:
            self.table["in_head"] = False
        elif tag == "table" and self.table is not None:
            t = self.table
            self.table = None
            if not t["head"] and t["rows"]:
                t["head"] = t["rows"].pop(0)
            if t["rows"]:
                self.blocks.append({"type": "table", "head": t["head"], "rows": t["rows"]})
        elif tag in ("ul", "ol") and self.list_stack:
            self._flush()
            lst = self.list_stack.pop()
            if lst["items"]:
                if self.list_stack:  # nested list: fold into the parent list
                    self.list_stack[-1]["items"].extend(lst["items"])
                else:
                    self.blocks.append({"type": lst["type"], "items": lst["items"]})

    def handle_data(self, data):
        self._text(data)

    def handle_entityref(self, name):
        self._text(f"&{name};")

    def handle_charref(self, name):
        self._text(f"&#{name};")

    def close(self):
        super().close()
        self._flush()


def convert(content_html: str):
    c = Converter()
    c.feed(content_html)
    c.close()
    blocks = c.blocks
    # Normalise heading levels: the highest level used becomes h2, everything below it h3.
    levels = sorted({b["level"] for b in blocks if b["type"] == "heading"})
    out = []
    seen_h2 = False
    for b in blocks:
        if b["type"] == "heading":
            # A sub-heading before any main heading is promoted, so heading levels never skip.
            kind = "h2" if (b["level"] == levels[0] or not seen_h2) else "h3"
            seen_h2 = seen_h2 or kind == "h2"
            out.append({"type": kind, "text": b["text"]})
        else:
            out.append(b)
    # A list of one-line bold items is common in these posts; keep as is.
    return out


CLAIM_PATTERNS = {
    "Price stated as fact": r"(₹\s?[\d,]+[^.]*|Rs\.?\s?[\d,]+[^.]*)",
    "Superlative about a home or service": r"[^.]*\b(best|No\.? ?1|number one|top[- ]rated|leading|finest|world[- ]class|state[- ]of[- ]the[- ]art)\b[^.]*",
    "Guarantee or cure": r"[^.]*\b(guarantee\w*|cure[sd]?|100%)\b[^.]*",
    "Statistic without a source": r"[^.]*\b\d{1,3}(\.\d)?\s?%[^.]*",
    "Credential or licence": r"[^.]*\b(certified|accredited|award\w*|licensed|registered)\b[^.]*",
    "Out of date": r"[^.]*\b20(1\d|2[0-3])\b[^.]*",
}


def fit_description(text: str, fallback: str) -> str:
    """Meta descriptions must be 70-160 characters: cut at a sentence end, else a word, else use the fallback."""
    text = text.strip()
    if len(text) < 70:
        text = fallback.strip() if len(fallback.strip()) >= 70 else text
    if len(text) <= 160:
        return text
    cut = text[:160]
    end = max(cut.rfind(". "), cut.rfind("? "), cut.rfind("! "))
    if end >= 70:
        return cut[: end + 1]
    return cut[: cut.rfind(" ")].rstrip(",;:–-") + "…"


def category_for(slug: str, title: str):
    t = (slug + " " + title).lower()
    if any(k in t for k in ("cost", "price", "charges", "fees")):
        return "Costs and admission"
    if any(k in t for k in ("dementia", "palliative", "hospice", "post-operative", "post operative", "post-surgery", "paralysis",
                            "physiotherapy", "health", "geriatric", "recovery", "nursing")):
        return "Health and care"
    return "Choosing care"


SCENES = {"Costs and admission": "gate", "Health and care": "medical", "Choosing care": "tea"}


def main(src: str):
    data = json.loads(Path(src).read_text())
    cats = {c["id"]: c["name"] for c in data["categories"]}
    posts, review = [], []
    for p in data["posts"]:
        title = clean(p["title"]["rendered"])
        body = convert(p["content"]["rendered"])
        yoast = p.get("yoast_head_json") or {}
        meta_title = clean(yoast.get("title") or title)
        meta_title = re.sub(r"\s*[-|–]\s*Swarnavihar.*$", "", meta_title) or title
        excerpt = clean(re.sub(r"<[^>]+>", " ", p.get("excerpt", {}).get("rendered", "")))
        excerpt = re.sub(r"\s*\[(&hellip;|…)\]\s*$", "…", excerpt)
        first_p = next((b["text"] for b in body if b["type"] == "p"), "")
        description = fit_description(clean(yoast.get("description") or "") or excerpt, re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", first_p).replace("**", ""))
        category = category_for(p["slug"], title)
        posts.append({
            "slug": p["slug"],
            "title": title,
            "metaTitle": meta_title,
            "metaDescription": description,
            "excerpt": excerpt,
            "category": category,
            "published": p["date"][:10],
            "updated": p["modified"][:10] if p["modified"][:10] != p["date"][:10] else None,
            "scene": SCENES[category],
            "wpCategories": [cats.get(c, str(c)) for c in p.get("categories", [])],
            # Word count of the original HTML text, so tests can prove nothing was lost in conversion.
            "sourceWords": len(re.findall(r"[A-Za-z0-9']+", html.unescape(re.sub(r"<(script|style|figcaption)[^>]*>.*?</\1>|<[^>]+>", " ", p["content"]["rendered"], flags=re.S)))),
            "body": body,
        })
        text = " ".join(json.dumps(b, ensure_ascii=False) for b in body)
        text = re.sub(r'\{"type": "\w+", "(text|items)": ', " ", text)
        plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", " ".join(
            [b.get("text", "") for b in body] + [i for b in body for i in b.get("items", [])] +
            [" ".join(r) for b in body if b["type"] == "table" for r in b["rows"]])).replace("**", "")
        found = []
        for label, pat in CLAIM_PATTERNS.items():
            if re.search(pat, title, re.I):
                found.append((label + " (in the title)", title))
            for m in re.finditer(pat, plain, re.I):
                found.append((label, m.group(0).strip()[:220]))
        if found:
            review.append((p["slug"], title, found))

    out = ROOT / "src/content/blog/legacy-posts.json"
    out.write_text(json.dumps(posts, ensure_ascii=False, indent=1) + "\n")
    # Just the URLs, for src/lib/routes.ts (kept tiny so menus don't pull article text into the browser).
    (ROOT / "src/content/blog/legacy-slugs.json").write_text(json.dumps([p["slug"] for p in posts], indent=1) + "\n")

    lines = [
        "# Old blog posts: claims to review",
        "",
        f"All {len(posts)} posts from the old site were moved across **word for word**, at the same URLs and with their original dates.",
        "Nothing was reworded. The import script (`scripts/import-wordpress.py`) found the statements below, which",
        "break the rules the new content follows (no superlatives, guarantees, unsourced prices or statistics, or",
        "unverified credentials). They were already public on the old site, so they are **not blocked**, but",
        "each one is worth a decision: keep, soften, or remove. Health-related claims are the most important.",
        "",
        f"{len(review)} of {len(posts)} posts have something to review.",
        "",
    ]
    titles = {}
    for p in posts:
        titles.setdefault(p["title"].lower(), []).append(p["slug"])
    dupes = [v for v in titles.values() if len(v) > 1]
    if dupes:
        lines.append("## Posts with the same title")
        lines.append("")
        lines.append("These compete with each other in search. See the merge recommendations in `docs/seo/keyword-map.md`.")
        lines.append("")
        for v in dupes:
            lines.append("- " + ", ".join(f"`/{x}/`" for x in v))
        lines.append("")
    for slug, title, found in review:
        lines.append(f"## {title}")
        lines.append(f"`/{slug}/`")
        lines.append("")
        seen = set()
        for label, snippet in found:
            key = (label, snippet)
            if key in seen:
                continue
            seen.add(key)
            lines.append(f"- **{label}:** \"{snippet}\"")
        lines.append("")
    (ROOT / "docs/blog-migration-review.md").write_text("\n".join(lines))
    print(f"{len(posts)} posts → {out.relative_to(ROOT)}; {len(review)} posts with claims to review")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "swarnavihar-wordpress-export.json"))
