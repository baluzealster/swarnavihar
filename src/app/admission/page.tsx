import Link from "next/link";
import { admissionFaqs, admissionPage as page, careLevels, costFactors, documents, included, priceNote } from "@/content/admission";
import { Inline } from "@/components/content/Prose";
import { admissionSteps, visitChecklist } from "@/content/care";
import { locationPages } from "@/content/locations";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { Faq } from "@/components/home/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Admission and fees", href: page.path }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs), faqSchema(admissionFaqs))} />
      <PageHero
        crumbs={crumbs}
        title={page.h1}
        lede={page.lede}
        scene="gate"
        shot="a daughter and her father arriving at the gate of the home"
        whatsappMessage="Hello, I'd like to know about admission and monthly charges for my parent."
      />

      <Section id="steps" tone="mist" labelledBy="steps-title">
        <SectionHeading id="steps-title" title="How admission works" intro="From your first call to the day your parent moves in." />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-sage pt-5">
              <span aria-hidden="true" className="block font-serif text-[2.5rem] leading-none text-brass-deep">{i + 1}</span>
              <h3 className="mt-4 text-[1.3rem]">{step.title}</h3>
              <Ph status={step.detail.status} as="p" className="mt-2 text-small text-muted">{step.detail.value}</Ph>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="care-levels" labelledBy="levels-title">
        <SectionHeading
          id="levels-title"
          title="Levels of care"
          intro="Most families aren't sure at first which level their parent needs. The care assessment settles it, and the level can change later if their needs do."
        />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {careLevels.map((l) => (
            <li key={l.title} className="flex flex-col rounded-card border border-line bg-paper p-6">
              <h3 className="text-h3">{l.title}</h3>
              <p className="mt-2 text-muted">{l.suits}</p>
              <ul className="mt-4 space-y-2 text-small">
                {l.typically.map((t) => (
                  <li key={t} className="flex gap-2"><Icon name="check" className="mt-0.5 size-5 shrink-0 text-brass-deep" />{t}</li>
                ))}
              </ul>
              <Ph status={l.price.status} as="p" className="mt-auto pt-5 text-small font-bold text-sage">{l.price.value}</Ph>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cost" tone="paper" labelledBy="cost-title">
        <SectionHeading
          id="cost-title"
          title="What affects the monthly charge"
          intro="Two parents in the same home can pay quite different amounts. These are the things that make the difference, at any home."
        />
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {costFactors.map((c) => (
            <li key={c.title} className="border-t border-sage/25 pt-5">
              <h3 className="text-[1.25rem] leading-snug">{c.title}</h3>
              <p className="mt-2 text-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-card bg-cream p-6 sm:p-8">
            <h3 className="text-h3">What the monthly fee includes</h3>
            <ul className="mt-4 space-y-3">
              {included.map((item) => (
                <Ph key={item.value} status={item.status} as="li" className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                  <span>{item.value}</span>
                </Ph>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h3">Getting a figure for your parent</h3>
            <Ph status={priceNote.status} as="p" className="mt-4 max-w-read text-muted">{priceNote.value}</Ph>
            <p className="mt-4 max-w-read text-muted">
              <Inline text="For a fuller guide to what families pay for and how to compare homes, read [understanding old age home charges in Pune](/understanding-old-age-home-charges-in-pune/)." />
            </p>
            <p className="mt-4 max-w-read text-muted">
              The quickest way is to call or WhatsApp us with a little about your parent&apos;s health. We&apos;ll tell you which home has space and what care would suit them.
            </p>
          </div>
        </div>
      </Section>

      <Section id="documents" labelledBy="documents-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="documents-title" className="text-h2">What to bring</h2>
            <ul className="mt-6 space-y-3">
              {documents.map((d) => (
                <Ph key={d.value} status={d.status} as="li" className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                  <span>{d.value}</span>
                </Ph>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2">Questions to ask on your visit</h2>
            <p className="mt-4 text-muted">Worth asking any home, including ours.</p>
            <ul className="mt-6 space-y-3">
              {visitChecklist.map((c) => (
                <li key={c} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Faq items={admissionFaqs} title="Questions about admission and fees" tone="paper" />

      <section aria-labelledby="homes-links-title" className="bg-cream py-14">
        <div className="mx-auto w-full max-w-site px-5 sm:px-8">
          <h2 id="homes-links-title" className="text-h3">Visit a home near you</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {locationPages.map((l) => (
              <li key={l.path}><Link href={l.path} className="font-bold text-sage">Old age home in {l.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <Enquiry
        title="Ask for a written estimate"
        intro="Tell us a little about your parent and we'll call you back, or choose a day to visit."
        whatsappMessage="Hello, I'd like an estimate of the monthly charges for my parent."
        intents={["callback", "visit"]}
        defaultIntent="callback"
      />
    </>
  );
}
