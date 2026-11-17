import Link from "next/link";
import { aboutPage as page, ourStory, panelSpecialties, philosophy, teamNote, whoWeAre } from "@/content/about";
import { branches } from "@/content/branches";
import { careTeam } from "@/content/care";
import { pageMetadata } from "@/lib/metadata";
import { branchPath, breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "About us", href: page.path }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <PageHero
        crumbs={crumbs}
        title={page.h1}
        lede={page.lede}
        scene="verandah"
        shot="Residents and a carer talking together on the verandah of a Swarnavihar home"
        whatsappMessage="Hello, I'd like to know more about Swarnavihar."
      />

      <Section id="who-we-are" tone="paper" labelledBy="who-title">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 id="who-title" className="text-h2">Who we are</h2>
            <div className="mt-6 max-w-read space-y-4 text-lead text-muted">
              {whoWeAre.map((f) => <Ph key={f.value.slice(0, 30)} status={f.status} as="p">{f.value}</Ph>)}
            </div>
            <h3 className="mt-12 text-h3">Our story</h3>
            <Ph status={ourStory.status} as="p" className="mt-3 max-w-read text-muted">{ourStory.value}</Ph>
          </div>
          <div className="rounded-card bg-cream p-6 sm:p-8">
            <h2 className="text-h3">Our homes</h2>
            <ul className="mt-4">
              {branches.map((b) => (
                <li key={b.id} className="border-b border-line py-3 last:border-0">
                  <Link href={branchPath(b)} className="font-serif text-[1.2rem] text-sage no-underline hover:underline">
                    <Ph status={b.house.status}>{b.house.value}</Ph>
                  </Link>
                  <span className="block text-small text-muted">{b.locality}{b.city === "Bengaluru" ? ", Bengaluru" : ", Pune"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="philosophy" labelledBy="philosophy-title">
        <SectionHeading
          id="philosophy-title"
          align="split"
          title="Our care philosophy"
          intro="What we promise every family, and what we hold ourselves to on an ordinary Tuesday as much as on a visiting day."
        />
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.map((pr) => (
            <Ph key={pr.title} status={pr.status} as="li" className="border-t-2 border-sage pt-5">
              <h3 className="text-[1.3rem] leading-snug">{pr.title}</h3>
              <p className="mt-2 text-muted">{pr.detail}</p>
            </Ph>
          ))}
        </ul>
      </Section>

      <Section id="team" tone="mist" labelledBy="team-title">
        <SectionHeading id="team-title" title="Who looks after your parent" intro="Nurses and attendants on every shift, with doctors and therapists who visit." />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <ul className="grid gap-6 sm:grid-cols-2">
            {careTeam.map((m) => (
              <li key={m.role} className="rounded-card bg-paper p-6">
                <Icon name="stethoscope" className="size-7 text-brass-deep" />
                <h3 className="mt-4 text-[1.3rem]">{m.role}</h3>
                <Ph status={m.name.status} className="mt-1 block text-small">{m.name.value}</Ph>
                <p className="mt-2 text-small text-muted">{m.detail}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="text-h3">Our visiting panel</h3>
            <Ph status={panelSpecialties.status} as="div" className="mt-4">
              <ul className="space-y-2">
                {panelSpecialties.value.map((s) => (
                  <li key={s} className="flex gap-3"><Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />{s}</li>
                ))}
              </ul>
            </Ph>
            <p className="mt-6 text-small text-muted">{teamNote.value}</p>
            <p className="mt-6"><Link href="/medical-care/" className="font-bold text-sage">How medical care works in our homes</Link></p>
          </div>
        </div>
      </Section>

      <Enquiry title="Come and meet us" intro="The best way to know us is to visit. Choose a day, or leave your number and we'll call you." intents={["visit", "callback"]} defaultIntent="visit" />
    </>
  );
}
