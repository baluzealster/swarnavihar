import Link from "next/link";
import { branches } from "@/content/branches";
import { services, serviceHref } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import { Container, Ph } from "@/components/ui/Layout";
import { Logo } from "./SiteHeader";
import { isLive } from "@/lib/routes";

const footerServices = ["assisted-living-care", "dementia-care-in-pune", "nursing-care-in-pune", "post-stroke-rehabilitation-in-pune", "hospice-palliative-care-in-pune"]
  .map((slug) => services.find((s) => s.slug === slug)!)
  .filter((s) => s && isLive(serviceHref(s)));

const aboutLinks = [
  { href: "/about/", label: "About us" },
  { href: "/facilities/", label: "Facilities" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/admission/", label: "Admission and fees" },
  { href: "/medical-care/", label: "Medical care" },
  { href: "/faq/", label: "Family FAQs" },
  { href: "/testimonials/", label: "Family reviews" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact us" },
].filter((l) => isLive(l.href));

const linkCls = "text-on-sage no-underline hover:text-paper hover:underline";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-sage bg-sage pb-28 pt-16 text-on-sage lg:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
          <div>
            <Logo light size="lg" />
            <p className="mt-6 max-w-sm">
              Six homes in Pune and Bengaluru, run by people who want your parents to feel at home.
            </p>
            <dl className="mt-6 space-y-2 text-small">
              <div className="flex gap-2"><dt className="sr-only">Phone</dt>
                <dd><Ph status={site.phone.status}><a className={linkCls} href={`tel:${site.phone.value.tel}`}>{site.phone.value.display}</a></Ph></dd></div>
              <div className="flex gap-2"><dt className="sr-only">WhatsApp</dt>
                <dd><a className={linkCls} href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-wa-location="footer">Message us on WhatsApp</a></dd></div>
              <div className="flex gap-2"><dt className="sr-only">Email</dt>
                <dd><a className={linkCls} href={`mailto:${site.email.value}`}>{site.email.value}</a></dd></div>
            </dl>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h2 className="font-sans text-base font-bold text-paper">Our homes</h2>
              <ul className="mt-4 space-y-3 text-small">
                {branches.map((b) => (
                  <li key={b.id}>
                    <span className="block font-serif text-[1.05rem] text-paper">{b.house.value}</span>
                    <span className="block">{b.locality}{b.city === "Bengaluru" ? ", Bengaluru" : ""}</span>
                    <Ph status={b.phone.status}><a className={linkCls} href={`tel:${b.phone.value.tel}`}>{b.phone.value.display}</a></Ph>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-base font-bold text-paper">Care</h2>
              <ul className="mt-4 space-y-3 text-small">
                {footerServices.map((s) => (
                  <li key={s.slug}><Link className={linkCls} href={serviceHref(s)}>{s.title}</Link></li>
                ))}
                <li><Link className={linkCls} href="/service/">All care services</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-base font-bold text-paper">Swarnavihar</h2>
              <ul className="mt-4 space-y-3 text-small">
                {aboutLinks.map((l) => (
                  <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/20 pt-6 text-[0.9375rem] sm:flex-row sm:justify-between">
          <p>© {year} {site.name}</p>
          {isLive("/privacy-policy/") && <p><Link className={linkCls} href="/privacy-policy/">Privacy policy</Link></p>}
        </div>
      </Container>
    </footer>
  );
}
