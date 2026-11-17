import Link from "next/link";
import { branchPhotos, branchesIn, mapsSearchUrl, type AreaKey } from "@/content/branches";
import { facilities, medicalSupport } from "@/content/care";
import { locationByArea, locationPages } from "@/content/locations";
import { serviceGroups, services, serviceHref } from "@/content/services";
import { whatsappLink } from "@/content/site";
import { breadcrumbSchema, faqSchema, graph, localBusinessSchema, organizationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { Enquiry } from "@/components/home/Enquiry";
import { Faq } from "@/components/home/Faq";
import { Gallery } from "@/components/home/Gallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Ph, Section, SectionHeading } from "@/components/ui/Layout";
import { Nameplate } from "@/components/ui/Nameplate";
import { ScheduleVisitLink } from "@/components/ui/ScheduleVisitLink";
import { PageHero } from "./PageHero";
import { MaybeLink } from "@/components/ui/MaybeLink";

export function locationMetadata(area: AreaKey) {
  const l = locationByArea(area);
  return pageMetadata({ title: l.metaTitle, description: l.metaDescription, path: l.path });
}

/** Location landing page template. Text comes from content/locations.ts; nothing area-specific lives here. */
export function LocationTemplate({ area }: { area: AreaKey }) {
  const loc = locationByArea(area);
  const homes = branchesIn(area);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Our homes", href: "/branches/" },
    { name: loc.name, href: loc.path },
  ];
  const first = homes[0];
  const plural = homes.length > 1;

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          ...homes.map((b) => localBusinessSchema(b)),
          breadcrumbSchema(crumbs),
          faqSchema(loc.faqs),
        )}
      />
      <PageHero
        crumbs={crumbs}
        title={loc.h1}
        lede={loc.lede}
        scene={loc.heroScene}
        shot={`${first.house.value}, ${first.locality}`}
        whatsappMessage={loc.whatsappMessage}
        branch={plural ? undefined : first.id}
        houseName={plural ? undefined : first.house.value}
      />

      <Section id="introduction" tone="paper" labelledBy="intro-title">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <h2 id="intro-title" className="text-h2">Care for your parent, close to {loc.name}</h2>
            <div className="mt-6 max-w-read space-y-4 text-lead text-muted">
              {loc.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          <div>
            <h3 className="text-h3">Areas we serve from {plural ? "these homes" : first.house.value}</h3>
            <ul className="mt-5">
              {loc.areasServed.map((a) => (
                <li key={a.name} className="border-t border-line py-4 last:border-b">
                  <span className="block font-bold text-sage">{a.name}</span>
                  <span className="text-small text-muted">{a.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="our-home" tone="mist" labelledBy="home-title">
        <SectionHeading
          id="home-title"
          title={loc.homesTitle ?? (plural ? `Our ${homes.length} homes in ${loc.name}` : `${first.house.value}, our ${loc.name} home`)}
          intro="Come and see before you decide anything. Call ahead and we'll show you around."
        />
        <div className="grid gap-14">
          {homes.map((b) => {
            const finding = loc.findingUs.find((f) => f.branchId === b.id);
            return (
              <article key={b.id} aria-labelledby={`${b.id}-name`} className="rounded-card bg-paper p-6 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                  <div>
                    <h3 id={`${b.id}-name`} className="sr-only">{b.house.value}</h3>
                    <Nameplate branch={b} size="lg" />
                    <dl className="mt-6 space-y-5">
                      <div>
                        <dt className="font-bold">Address</dt>
                        <dd className="mt-1 text-muted"><Ph status={b.address.status}>{b.address.value}</Ph></dd>
                      </div>
                      {finding && (
                        <div>
                          <dt className="font-bold">How to find us</dt>
                          <dd className="mt-1 text-muted">{finding.landmarks}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="font-bold">Phone</dt>
                        <dd className="mt-1">
                          <Ph status={b.phone.status}>
                            <a href={`tel:${b.phone.value.tel}`} className="font-bold text-sage">{b.phone.value.display}</a>
                          </Ph>
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-7 flex flex-wrap gap-2">
                      <ScheduleVisitLink branch={b.id} houseName={b.house.value} />
                      <ButtonLink href={whatsappLink(`Hello, I'd like to know about ${b.house.value} in ${b.locality}.`)} variant="outline" icon="whatsapp" aria-label={`WhatsApp ${b.house.value}`} data-wa-location="home_card">
                        WhatsApp
                      </ButtonLink>
                      <a href={mapsSearchUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${b.house.value}`} className={buttonClass("quiet")}>
                        <Icon name="directions" className="size-5" /> Directions
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="sr-only">Pictures of {b.house.value}</h4>
                    <Gallery items={branchPhotos(b)} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="services" labelledBy="services-title">
        <SectionHeading
          id="services-title"
          align="split"
          title={`Care available in ${loc.name}`}
          intro="Choose a service to see what it involves day to day. Tell us about your parent and we'll confirm what this home can provide."
        />
        <div data-placeholder="true" title="Placeholder: which services each home provides is still to be confirmed (fact sheet Q5)" className="grid gap-10 md:grid-cols-3">
          {serviceGroups.map((g) => (
            <div key={g.key}>
              <h3 className="border-t-2 border-sage pt-4 text-h3">{g.title}</h3>
              <ul className="mt-3">
                {services.filter((s) => s.group === g.key).map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <MaybeLink href={serviceHref(s)} className="block py-3 font-medium text-ink no-underline hover:text-sage hover:underline" textClassName="block py-3 font-medium text-ink">{s.title}</MaybeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-muted">
          Wondering about cost? <Link href="/admission/" className="font-bold text-sage">How admission and monthly fees work</Link>
        </p>
      </Section>

      <Section id="facilities" tone="paper" labelledBy="facilities-title">
        <SectionHeading id="facilities-title" title={`Facilities at ${plural ? "our homes" : first.house.value}`} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f) => (
            <Ph key={f.title} status={f.status} as="div">
              <h3 className="text-[1.25rem]">{f.title}</h3>
              <ul className="mt-3 space-y-2">
                {f.items.map((i) => (
                  <li key={i} className="flex gap-2.5 text-small">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brass-deep" /> {i}
                  </li>
                ))}
              </ul>
            </Ph>
          ))}
        </div>
      </Section>

      <Section id="medical" tone="sage" labelledBy="medical-title">
        <SectionHeading
          id="medical-title"
          align="split"
          title="Medical support"
          intro="Day-to-day medical care happens inside the home. When a hospital is needed, we arrange the transfer and keep you informed."
        />
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {medicalSupport.map((m) => (
            <Ph key={m.title} status={m.status} as="li" className="flex gap-3">
              <Icon name={m.icon} className="size-7 shrink-0 text-brass-light" />
              <span>
                <span className="block font-bold text-paper">{m.title}</span>
                <span className="text-small">{m.detail}</span>
              </span>
            </Ph>
          ))}
        </ul>
        <Ph status="placeholder" as="p" className="mt-10 max-w-read text-on-sage">
          Hospitals we transfer residents to from {plural ? "these homes" : first.house.value}: to be confirmed by the owner.
        </Ph>
      </Section>

      <Faq items={loc.faqs} title={`Questions about our ${loc.name} ${plural ? "homes" : "home"}`} tone="paper" />

      <Enquiry
        title="Request a call back"
        intro={`Leave your number and someone from ${plural ? "our " + loc.name + " homes" : first.house.value} will call you back. Or choose a day to visit.`}
        phone={first.phone}
        whatsappMessage={loc.whatsappMessage}
        intents={["callback", "visit"]}
        defaultIntent="callback"
        defaultBranch={first.id}
      />

      <section aria-labelledby="other-homes-title" className="bg-paper py-14">
        <Container>
          <h2 id="other-homes-title" className="text-h3">Other Swarnavihar homes in Pune</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {locationPages.filter((l) => l.area !== area).map((l) => (
              <li key={l.path}><ButtonLink href={l.path} variant="outline">{l.name}</ButtonLink></li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
