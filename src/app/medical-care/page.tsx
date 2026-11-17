import Link from "next/link";
import { emergencies, limits, medicalAreas, medicalDisclaimer, medicalPage as page } from "@/content/medical";
import { panelSpecialties } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Medical care", href: page.path }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        title={page.h1}
        lede={page.lede}
        scene="medical"
        shot="A nurse checking a resident's blood pressure"
        whatsappMessage="Hello, I'd like to know about the medical care at your homes."
      />

      <Section id="care" tone="paper" labelledBy="care-title">
        <SectionHeading id="care-title" align="split" title="What's available in our homes" intro="Every resident's care is different. The doctor and nurses plan it around your parent's own conditions and medicines." />
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {medicalAreas.map((a) => (
            <section key={a.id} id={a.id} aria-labelledby={`${a.id}-title`}>
              <h3 id={`${a.id}-title`} className="border-t-2 border-sage pt-5 text-h3">{a.title}</h3>
              <p className="mt-2 text-muted">{a.intro}</p>
              <ul className="mt-4 space-y-3">
                {a.items.map((it) => (
                  <Ph key={it.value} status={it.status} as="li" className="flex gap-3">
                    <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                    <span>{it.value}</span>
                  </Ph>
                ))}
              </ul>
            </section>
          ))}
          <section aria-labelledby="panel-title">
            <h3 id="panel-title" className="border-t-2 border-sage pt-5 text-h3">The visiting panel</h3>
            <Ph status={panelSpecialties.status} as="div" className="mt-4">
              <ul className="space-y-3">
                {panelSpecialties.value.map((s) => (
                  <li key={s} className="flex gap-3"><Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />{s}</li>
                ))}
              </ul>
            </Ph>
          </section>
        </div>
      </Section>

      <Section id="emergencies" labelledBy="emergencies-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="emergencies-title" className="text-h2">In an emergency</h2>
            <ul className="mt-6 space-y-4">
              {emergencies.map((e) => (
                <Ph key={e.value} status={e.status} as="li" className="flex gap-3">
                  <Icon name="ambulance" className="mt-0.5 size-6 shrink-0 text-brass-deep" />
                  <span>{e.value}</span>
                </Ph>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-paper p-6 sm:p-8">
            <h2 className="text-h3">What a care home can't do</h2>
            <Ph status={limits.status} as="p" className="mt-3 text-muted">{limits.value}</Ph>
            <p className="mt-6 text-muted">
              Coming from hospital? Read about <Link href="/service/post-operative-care-in-pune/" className="font-bold text-sage">recovery after a hospital stay</Link> and our guide to <Link href="/post-hospitalization-care-for-senior-citizens/" className="font-bold text-sage">post-hospitalization care</Link>.
            </p>
          </div>
        </div>
        <p className="mt-12 max-w-read border-l-4 border-brass pl-4 text-small text-muted">{medicalDisclaimer.value}</p>
      </Section>

      <Enquiry title="Talk to us about your parent's health" intro="Tell us about their conditions and medicines, and we'll tell you honestly whether our homes can care for them." intents={["callback", "visit"]} defaultIntent="callback" />
    </>
  );
}
