import { SiteTracking } from "@/components/analytics/SiteTracking";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { MobileActionBar } from "./MobileActionBar";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollToTop } from "./ScrollToTop";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <MobileActionBar />
      <aside aria-label="Quick contact">
        <FloatingWhatsApp />
      </aside>
      <SiteTracking />
      <ScrollReveal />
    </>
  );
}
