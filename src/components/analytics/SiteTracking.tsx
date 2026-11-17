"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { captureUtm } from "@/lib/lead-client";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/**
 * Loads GA4 (when NEXT_PUBLIC_GA_MEASUREMENT_ID is set), records first-touch UTM parameters
 * for the lead forms, and tracks every WhatsApp click on the site with one delegated listener.
 * Page views, including client-side navigations, come from GA4's enhanced measurement.
 */
export function SiteTracking() {
  useEffect(() => {
    captureUtm();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='wa.me/']");
      if (!a) return;
      track("whatsapp_click", {
        link_location: a.getAttribute("data-wa-location") ?? a.closest("[data-wa-zone]")?.getAttribute("data-wa-zone") ?? "content",
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)},{anonymize_ip:true});`}
      </Script>
    </>
  );
}
