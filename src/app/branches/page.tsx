import Link from "next/link";
import { locationPages } from "@/content/locations";
import { branches } from "@/content/branches";
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { fixedPageMeta } from "@/lib/page-meta";
import { Enquiry } from "@/components/home/Enquiry";
import { HomesSelector } from "@/components/home/HomesSelector";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Section } from "@/components/ui/Layout";

export const metadata = pageMetadata(fixedPageMeta["/branches/"]);

const crumbs = [{ name: "Home", href: "/" }, { name: "Our homes", href: "/branches/" }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), ...branches.map(localBusinessSchema), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="pb-6 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">Our homes</h1>
          <p className="mt-6 max-w-read text-lead text-muted">Five homes across Pune and one in Bengaluru. Choose an area to see the nearest, then visit before you decide.</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {locationPages.map((l) => (
              <li key={l.path}><Link href={l.path} className="font-bold text-sage">Old age home in {l.name}</Link></li>
            ))}
          </ul>
        </Container>
      </section>
      <Section id="homes" tone="mist" labelledBy="homes-title">
        <h2 id="homes-title" className="sr-only">Find your nearest home</h2>
        <HomesSelector />
      </Section>
      <Enquiry />
    </>
  );
}
