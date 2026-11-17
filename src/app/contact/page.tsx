import { branches } from "@/content/branches";
import { site, whatsappLink } from "@/content/site";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { fixedPageMeta } from "@/lib/page-meta";
import { ContactForm } from "@/components/forms/ContactForm";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Ph } from "@/components/ui/Layout";

export const metadata = pageMetadata(fixedPageMeta["/contact/"]);

const crumbs = [{ name: "Home", href: "/" }, { name: "Contact us", href: "/contact/" }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="pb-20 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">Contact us</h1>
          <p className="mt-6 max-w-read text-lead text-muted">The quickest way to reach us is a call or a WhatsApp message. For anything else, send a message and we'll reply.</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="grid gap-3 sm:max-w-sm">
                <Ph status={site.phone.status}>
                  <ButtonLink href={`tel:${site.phone.value.tel}`} variant="primary" icon="phone" className="w-full">Call {site.phone.value.display}</ButtonLink>
                </Ph>
                <ButtonLink href={whatsappLink()} variant="outline" icon="whatsapp" className="w-full" data-wa-location="contact_page">WhatsApp us</ButtonLink>
                <ButtonLink href={`mailto:${site.email.value}`} variant="quiet" className="w-full">{site.email.value}</ButtonLink>
              </div>
              <h2 className="mt-12 text-h3">Our homes</h2>
              <ul className="mt-4">
                {branches.map((b) => (
                  <li key={b.id} className="border-t border-line py-4 last:border-b">
                    <span className="block font-serif text-[1.2rem] text-sage">{b.house.value}, {b.locality}</span>
                    <Ph status={b.address.status} as="span" className="block text-small text-muted">{b.address.value}</Ph>
                    <Ph status={b.phone.status}><a href={`tel:${b.phone.value.tel}`} className="font-bold text-sage" aria-label={`Call ${b.house.value}`}>{b.phone.value.display}</a></Ph>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
      {/* Target of the site-wide "Schedule a visit" buttons on this page too. */}
      <Enquiry
        title="Book a visit or a call back"
        intro="Choose a day to see one of our homes, or leave your number and we'll call you."
        intents={["visit", "callback"]}
        defaultIntent="visit"
      />
    </>
  );
}
