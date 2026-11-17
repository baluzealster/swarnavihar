import { serviceGroups, services, serviceHref } from "@/content/services";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { fixedPageMeta } from "@/lib/page-meta";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Section } from "@/components/ui/Layout";
import { MaybeLink } from "@/components/ui/MaybeLink";

export const metadata = pageMetadata(fixedPageMeta["/service/"]);

const crumbs = [{ name: "Home", href: "/" }, { name: "Care services", href: "/service/" }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="pb-6 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">Care services</h1>
          <p className="mt-6 max-w-read text-lead text-muted">Start from what your parent needs today. Each page explains what the care involves, who it's for and how admission works.</p>
        </Container>
      </section>
      {serviceGroups.map((g, i) => (
        <Section key={g.key} id={g.key} tone={i % 2 ? "paper" : "cream"} labelledBy={`${g.key}-title`}>
          <h2 id={`${g.key}-title`} className="text-h2">{g.title}</h2>
          <p className="mt-3 max-w-read text-muted">{g.whenToChoose}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.group === g.key).map((s) => (
              <li key={s.slug}>
                <MaybeLink
                  href={serviceHref(s)}
                  className="block h-full rounded-card border border-line bg-paper p-6 no-underline hover:border-sage"
                  textClassName="block h-full rounded-card border border-line bg-paper/60 p-6"
                >
                  <span className="block font-serif text-[1.3rem] text-sage">{s.title}</span>
                  <span className="mt-2 block text-small text-muted">{s.summary}</span>
                </MaybeLink>
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <Enquiry defaultIntent="callback" />
    </>
  );
}
