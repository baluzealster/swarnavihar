import type { Metadata } from "next";
import Link from "next/link";
import { locationPages } from "@/content/locations";
import { site, whatsappLink } from "@/content/site";
import { Enquiry } from "@/components/home/Enquiry";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Ph } from "@/components/ui/Layout";

/** Real 404 status (Next.js sets it), never indexed, and a way forward for a worried family. */
export const metadata: Metadata = {
  title: { absolute: "Page not found | Swarnavihar Old Age Homes" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
    <section aria-labelledby="page-title" className="pb-20 pt-12 sm:pt-16">
      <Container>
        <h1 id="page-title" className="text-display">We couldn't find that page</h1>
        <p className="mt-6 max-w-read text-lead text-muted">
          It may have moved when we rebuilt the website. If you were looking for care for a parent, these will help, or call us and we'll talk it through.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Ph status={site.phone.status}>
            <ButtonLink href={`tel:${site.phone.value.tel}`} variant="primary" icon="phone">Call {site.phone.value.display}</ButtonLink>
          </Ph>
          <ButtonLink href={whatsappLink()} variant="outline" icon="whatsapp" data-wa-location="not_found">WhatsApp us</ButtonLink>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-h3">Our homes in Pune</h2>
            <ul className="mt-4">
              {locationPages.map((l) => (
                <li key={l.path} className="border-b border-line">
                  <Link href={l.path} className="block py-3 font-medium text-ink no-underline hover:text-sage hover:underline">Old age home in {l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3">Useful pages</h2>
            <ul className="mt-4">
              {[
                { href: "/", label: "Home page" },
                { href: "/service/", label: "Care services" },
                { href: "/admission/", label: "Admission and fees" },
                { href: "/contact/", label: "Contact us" },
              ].map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} className="block py-3 font-medium text-ink no-underline hover:text-sage hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
    <Enquiry title="Book a visit or a call back" intents={["visit", "callback"]} defaultIntent="visit" />
    </>
  );
}
