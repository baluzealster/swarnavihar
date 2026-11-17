import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Literata } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/content/site";
import { isIndexable } from "@/lib/indexing";
import { OG_IMAGE } from "@/lib/metadata";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-literata",
  display: "swap",
});

/**
 * Next.js can't compute a metric-matched fallback for this font, so we supply one
 * ("Atkinson Fallback" in globals.css: Arial scaled to Atkinson's width and line height).
 * Text then doesn't jump when the web font arrives, which protects the CLS score.
 */
const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-atkinson",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Atkinson Fallback", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain.value),
  title: {
    default: "Old Age Home in Pune | Swarnavihar Old Age Homes",
    template: "%s | Swarnavihar Old Age Homes",
  },
  description:
    "Six old age homes in Baner, Sus, Wakad, Sinhgad Road, Pimple Nilakh and Bengaluru, with nursing, visiting doctors and physiotherapy.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  // Previews and local builds are never indexed; the live site is.
  ...(isIndexable() ? {} : { robots: { index: false, follow: false } }),
  formatDetection: { telephone: false },
};

/** Pinch-zoom is never disabled: many of our readers are older. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f2e7",
};

/** Dashed outlines on dummy content: on in development, off in production and with NEXT_PUBLIC_HIDE_PLACEHOLDERS=1. */
const showPlaceholders = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS !== "1";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${literata.variable} ${atkinson.variable}${showPlaceholders ? " show-placeholders" : ""}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
