"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Every new page opens at the top.
 *
 * Next.js normally scrolls to the new page itself, but it skips the scroll when it
 * believes the new content is already in view (for example when the page starts with
 * a hidden JSON-LD script), which left some pages open halfway down. This resets the
 * scroll after link navigation only: Back and Forward keep the browser's own scroll
 * restoration, and links to a #section on the page are left alone.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const fromHistory = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    // A link to the page you are already on (the logo on the homepage, say) goes back to the top.
    const onClick = (event: MouseEvent) => {
      // Next.js's <Link> has already called preventDefault() here, so that flag can't be used to skip.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
