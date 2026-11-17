import type { Metadata } from "next";

export const OG_IMAGE = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Swarnavihar Old Age Homes: care for your parents, close to home in Pune",
};

/**
 * Per-page metadata: absolute title (no template suffix), meta description, canonical URL,
 * Open Graph and Twitter card. Every indexable page goes through this so none is missed.
 */
export function pageMetadata({ title, description, path, noindex = false }: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      siteName: "Swarnavihar Old Age Homes",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
