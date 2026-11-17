import type { Scene } from "@/components/ui/Illustration";
import type { Block } from "../blocks";
import type { Fact } from "../types";

export type BlogCategory = "Choosing care" | "Health and care" | "Costs and admission";

/**
 * A blog article. New articles live at the site root (/<slug>/), like the old WordPress
 * posts, so every blog URL follows one pattern.
 *
 * Health articles carry `medicalReview`: a placeholder until a named, qualified doctor has
 * reviewed the text. The production build stays blocked until then (YMYL content).
 */
export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date, YYYY-MM-DD. */
  published: string;
  updated?: string;
  scene: Scene;
  shot: string;
  /** Three to five lines a hurried reader can take away (empty for migrated posts). */
  keyPoints: string[];
  body: Block[];
  faqs?: { q: string; a: Fact<string> }[];
  medicalReview?: Fact<string>;
  /** Pages to suggest at the end (paths). */
  related: string[];
  /** Moved across word for word from the old WordPress site (see scripts/import-wordpress.py). */
  legacy?: boolean;
}

export const postPath = (p: Pick<BlogPost, "slug">) => `/${p.slug}/`;
