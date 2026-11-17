import type { NextConfig } from "next";

/**
 * Old WordPress URLs that change. Everything else on the old site keeps its exact URL
 * (see docs/phase-2/url-redirect-map.csv). swarnavihar.org → .com is set up as a
 * domain redirect in Vercel, not here.
 */
export const legacyRedirects = [
  { source: "/events/", destination: "/gallery/" },
  { source: "/category/uncategorized/", destination: "/blog/" },
  { source: "/category/blog/", destination: "/blog/" },
  { source: "/service/dementia-care/", destination: "/service/dementia-care-in-pune/" },
  // Common guesses at the services URL.
  { source: "/services/", destination: "/service/" },
];

/** Vercel preview / development deployments must never be indexed (see src/lib/indexing.ts). */
const isPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

/**
 * Content Security Policy: only our own origin plus the three services the site uses
 * (Google Analytics, Cloudflare Turnstile, and nothing else). 'unsafe-inline' for scripts is
 * required by Next.js's inline bootstrap without nonces; everything else stays locked down.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  trailingSlash: true, // matches WordPress, so every existing URL stays identical
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
          ...(isPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
