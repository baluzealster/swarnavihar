import Link from "next/link";
import { facilitiesPage as page, facilityGroups, medicalSummary, safety, visiting } from "@/content/facilities-page";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Facilities", href: page.path }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        title={page.h1}
        lede={page.lede}
        scene="meal"
        shot="Residents at the dining table at lunchtime"
        whatsappMessage="Hello, I'd like to know about the facilities at your homes."
      />

      {facilityGroups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 ? "cream" : "paper"} labelledBy={`${g.id}-title`}>
          <div className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-16">
            <div className={i % 2 ? "md:order-2" : undefined}>
              <h2 id={`${g.id}-title`} className="text-h2">{g.title}</h2>
              <p className="mt-4 max-w-read text-lead text-muted">{g.intro}</p>
              <ul className="mt-6 space-y-3">
                {g.items.map((it) => (
                  <Ph key={it.value} status={it.status} as="li" className="flex gap-3">
                    <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                    <span>{it.value}</span>
                  </Ph>
                ))}
              </ul>
            </div>
            <PhotoFrame ratio="4/3" scene={g.scene} shot={g.shot} sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </Section>
      ))}

      <Section id="medical" tone="sage" labelledBy="medical-title">
        <SectionHeading id="medical-title" title="Medical support" intro="Close at hand, without moving into a hospital." />
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {medicalSummary.map((m) => (
            <Ph key={m.value} status={m.status} as="li" className="flex gap-3">
              <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-light" />
              <span>{m.value}</span>
            </Ph>
          ))}
        </ul>
        <p className="mt-10"><Link href="/medical-care/" className="font-bold text-paper underline">How medical care works in our homes</Link></p>
      </Section>

      <Section id="safety" tone="paper" labelledBy="safety-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="safety-title" className="text-h2">Safety and access</h2>
            <ul className="mt-6 space-y-3">
              {safety.map((s) => (
                <Ph key={s.value} status={s.status} as="li" className="flex gap-3">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                  <span>{s.value}</span>
                </Ph>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2">Visiting</h2>
            <Ph status={visiting.status} as="p" className="mt-6 max-w-read text-lead text-muted">{visiting.value}</Ph>
            <p className="mt-6 max-w-read text-muted">
              The best way to judge any home is to see it. <Link href="/what-to-check-before-admitting-a-parent-to-an-old-age-home/" className="font-bold text-sage">Our checklist</Link> lists what to look for.
            </p>
          </div>
        </div>
      </Section>

      <Enquiry title="See it for yourself" intro="Visit any of our homes before you decide. Choose a day, or leave your number and we'll call you." intents={["visit", "callback"]} defaultIntent="visit" />
    </>
  );
}
