import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { postBySlug, postPath, posts } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";
import { ArticleTemplate } from "@/components/content/ArticleTemplate";

/**
 * Articles live at the site root (/<slug>/), the same pattern as the old WordPress posts.
 * Fixed routes (/about/, /contact/…) always win over this one, and unknown slugs 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.metaTitle, description: post.metaDescription, path: postPath(post) });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.published, modifiedTime: post.updated ?? post.published },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  return <ArticleTemplate post={post} />;
}
