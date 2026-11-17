import { gallery } from "@/content/gallery";
import { consentNote, galleryPage as page } from "@/content/gallery-page";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { Gallery } from "@/components/home/Gallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Ph } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Gallery", href: page.path }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="pb-20 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">{page.h1}</h1>
          <p className="mt-6 max-w-read text-lead text-muted">{page.lede}</p>
          <Ph status={consentNote.status} as="p" className="mt-4 max-w-read text-small text-muted">{consentNote.value}</Ph>
          <div className="mt-12">
            <Gallery items={gallery} />
          </div>
        </Container>
      </section>
      <Enquiry title="Come and see for yourself" intro="Photos only show so much. Choose a day to visit any of our homes, or leave your number and we'll call you." intents={["visit", "callback"]} defaultIntent="visit" />
    </>
  );
}
