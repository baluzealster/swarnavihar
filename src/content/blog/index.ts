import { bedriddenHomeVsResidential } from "./bedridden-home-vs-residential";
import { checkBeforeAdmitting } from "./check-before-admitting";
import { chooseOldAgeHomePune } from "./choose-old-age-home-pune";
import { dementiaCareFamilies } from "./dementia-care-families";
import { elderlyCareAssistedLiving } from "./elderly-care-assisted-living";
import { oldAgeHomeChargesPune } from "./old-age-home-charges-pune";
import { postHospitalizationCare } from "./post-hospitalization-care";
import { postPath, type BlogPost } from "./types";
import { blockLinks, blockText, type Block } from "../blocks";
import legacyData from "./legacy-posts.json";

export { postPath, type BlogPost } from "./types";

/** New guides (16 Nov 2026), in the order shown at the top of /blog/. */
export const guides: BlogPost[] = [
  chooseOldAgeHomePune,
  oldAgeHomeChargesPune,
  checkBeforeAdmitting,
  elderlyCareAssistedLiving,
  dementiaCareFamilies,
  bedriddenHomeVsResidential,
  postHospitalizationCare,
];

interface LegacyRecord {
  slug: string; title: string; metaTitle: string; metaDescription: string; excerpt: string;
  category: BlogPost["category"]; published: string; updated: string | null; scene: BlogPost["scene"]; body: Block[];
}

/** The 48 posts from the old site, newest first, word for word (see docs/blog-migration-review.md). */
export const legacyPosts: BlogPost[] = (legacyData as LegacyRecord[])
  .map((r) => ({
    slug: r.slug,
    title: r.title,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
    excerpt: r.excerpt,
    category: r.category,
    published: r.published,
    updated: r.updated ?? undefined,
    scene: r.scene,
    shot: `Illustration for the article "${r.title}"`,
    keyPoints: [],
    body: r.body,
    // Suggest the links the post already makes, then the newer guide in the same category.
    related: [...new Set([...blockLinks(r.body).filter((l) => l !== "/"), ...guides.filter((g) => g.category === r.category).map(postPath)])].slice(0, 3),
    legacy: true,
  }))
  .sort((a, b) => b.published.localeCompare(a.published));

/** Every article on the site. */
export const posts: BlogPost[] = [...guides, ...legacyPosts];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const postPaths = () => posts.map(postPath);

/** Words in the article body, for "x min read" (about 200 words a minute for careful reading). */
export const readingMinutes = (post: BlogPost) => Math.max(2, Math.round(blockText(post.body).split(/\s+/).length / 200));

export const blogPage = {
  path: "/blog/",
  h1: "Blog: guides for families",
  metaTitle: "Elderly Care Guides for Families in Pune | Swarnavihar",
  metaDescription:
    "Plain-language guides on choosing an old age home in Pune, charges, assisted living, dementia, bedridden care and recovery after hospital, written for families.",
  lede:
    "Practical, honest guides for sons and daughters working out how best to care for a parent: what to look for, what to ask, and what it costs.",
};
