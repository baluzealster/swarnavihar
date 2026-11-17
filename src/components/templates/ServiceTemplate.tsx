import Link from "next/link";
import { areas } from "@/content/branches";
import { admissionSteps } from "@/content/care";
import { servicePageBySlug, type CareItem, type ServicePage } from "@/content/service-pages";
import { services, serviceHref } from "@/content/services";
import { breadcrumbSchema, faqSchema, graph, organizationSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { Enquiry } from "@/components/home/Enquiry";
import { Faq } from "@/components/home/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";
import { PageHero } from "./PageHero";
import { isLive } from "@/lib/routes";

export const servicePath = (slug: string) => `/service/${slug}/`;

export function serviceMetadata(page: ServicePage) {
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: servicePath(page.slug) });
}

function CareGrid({ items }: { items: CareItem[] }) {
  return (
    <ul className={"grid gap-x-10 gap-y-8 sm:grid-cols-2 " + (items.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((c) => (
        <Ph key={c.title} status={c.status} as="li" className="border-t border-sage/25 pt-5">
          <h3 className="text-[1.25rem] leading-snug">{c.title}</h3>
          <p className="mt-2 text-muted">{c.detail}</p>
        </Ph>
      ))}
    </ul>
  );
}

/** Service page template: what it is, who needs it, the care, facilities, what to consider, admission. */
export function ServiceTemplate({ page }: { page: ServicePage }) {
  const path = servicePath(page.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Care services", href: "/service/" },
    { name: page.name, href: path },
  ];
  const related = page.related
    .map((slug) => ({ slug, page: servicePageBySlug(slug), svc: services.find((s) => s.slug === slug)! }))
    .filter((r) => r.svc && isLive(serviceHref(r.svc)));
  const lower = page.name.charAt(0).toLowerCase() + page.name.slice(1);

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          serviceSchema({ name: page.h1, description: page.metaDescription, path, serviceType: page.name }),
          breadcrumbSchema(crumbs),
          faqSchema(page.faqs),
        )}
      />
      <PageHero
        noPeople
        crumbs={crumbs}
        title={page.h1}
        lede={page.lede}
        scene={page.scene}
        shot={page.name}
        whatsappMessage={`Hello, I'd like to know about ${lower} for my parent.`}
      />

      <Section id="what" tone="paper" labelledBy="what-title">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 id="what-title" className="text-h2">What is {lower}?</h2>
            <div className="mt-6 max-w-read space-y-4 text-lead text-muted">
              {page.what.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          <div className="rounded-card bg-cream p-6 sm:p-8">
            <h2 id="who-title" className="text-h3">Who needs it?</h2>
            <p className="mt-2 text-muted">{page.whoIntro}</p>
            <ul className="mt-4 space-y-3">
              {page.who.map((w) => (
                <li key={w} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="care" labelledBy="care-title">
        <SectionHeading id="care-title" title="What care we provide" intro="What your parent can expect from our nurses, attendants, doctors and therapists." />
        <CareGrid items={page.care} />
      </Section>

      <Section id="facilities" tone="mist" labelledBy="facilities-title">
        <SectionHeading id="facilities-title" title="Facilities available" />
        <CareGrid items={page.facilities} />
        <div data-placeholder="true" title="Placeholder: which homes offer this service is still to be confirmed (fact sheet Q5)" className="mt-12 rounded-card bg-paper p-6 sm:p-8">
          <h3 className="text-h3">Where it's available</h3>
          <p className="mt-2 text-muted">Ask us which of our homes has space for {lower} now.</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {areas.filter((a) => a.href).map((a) => (
              <li key={a.key}><ButtonLink href={a.href!} variant="outline">{a.label}</ButtonLink></li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="consider" tone="paper" labelledBy="consider-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="consider-title" className="text-h2">What families should consider</h2>
            <p className="mt-4 text-lead text-muted">Questions worth asking any home, including ours.</p>
          </div>
          <ol className="space-y-0">
            {page.consider.map((c) => (
              <li key={c} className="flex gap-4 border-t border-line py-4 last:border-b">
                <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="admission" labelledBy="admission-title">
        <SectionHeading id="admission-title" title="How to arrange admission" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <ol className="grid gap-8 sm:grid-cols-2">
            {admissionSteps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-sage pt-4">
                <span aria-hidden="true" className="block font-serif text-[2.2rem] leading-none text-brass-deep">{i + 1}</span>
                <h3 className="mt-3 text-[1.25rem]">{s.title}</h3>
                <Ph status={s.detail.status} as="p" className="mt-1 text-small text-muted">{s.detail.value}</Ph>
              </li>
            ))}
          </ol>
          <div className="rounded-card bg-paper p-6 sm:p-8">
            <h3 className="text-h3">What to bring</h3>
            <ul className="mt-4 space-y-3">
              {page.documents.map((d) => (
                <li key={d} className="flex gap-3 text-small">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brass-deep" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10">
          <Link href="/admission/" className="font-bold text-sage">How admission and monthly fees work</Link>
        </p>
        <p className="mt-10 max-w-read border-l-4 border-brass pl-4 text-small text-muted">
          This page explains care in general terms. It isn't medical advice: your parent's doctor is the best guide to what they need.
        </p>
      </Section>

      <Faq items={page.faqs} title={`Questions about ${lower}`} tone="paper" />

      <Enquiry
        title="Talk to us about your parent"
        intro={`Tell us a little about your parent and we'll call you back to talk about ${lower}, or choose a day to visit.`}
        whatsappMessage={`Hello, I'd like to know about ${lower} for my parent.`}
        intents={["enquiry", "visit", "callback"]}
        defaultIntent="enquiry"
        defaultNeed={page.need}
        service={page.slug}
      />

      <section aria-labelledby="related-title" className="bg-paper py-14">
        <div className="mx-auto w-full max-w-site px-5 sm:px-8">
          <h2 id="related-title" className="text-h3">Related care</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={serviceHref(r.svc)} className="group flex items-center justify-between gap-4 rounded-card border border-line p-5 no-underline hover:border-sage">
                  <span>
                    <span className="block font-serif text-[1.25rem] text-sage group-hover:underline">{r.svc.title}</span>
                    <span className="text-small text-muted">{r.svc.summary}</span>
                  </span>
                  <Icon name="chevron-right" className="size-5 shrink-0 text-brass-deep" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
