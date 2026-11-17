import { contactEmail, effectiveDate, grievanceOfficer, legalEntity, legalReview, privacyBody, privacyPage as page, retention } from "@/content/privacy";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Prose } from "@/components/content/Prose";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Ph } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Privacy policy", href: page.path }];

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="bg-paper pb-20 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">{page.h1}</h1>
          <p className="mt-6 max-w-read text-lead text-muted">{page.lede}</p>
          <Ph status={legalReview.status} as="p" className="mt-4 max-w-read text-small text-muted">{legalReview.value}</Ph>
          <Prose blocks={privacyBody} className="mt-12" />
          <div className="mt-14 max-w-read rounded-card border border-line bg-cream p-6 sm:p-8">
            <h2 className="text-h3">Contact and details</h2>
            <dl className="mt-4 space-y-4 text-small">
              <div><dt className="font-bold">Who runs this website</dt><dd><Ph status={legalEntity.status}>{legalEntity.value}</Ph></dd></div>
              <div><dt className="font-bold">Privacy requests and complaints</dt><dd><Ph status={grievanceOfficer.status}>{grievanceOfficer.value}</Ph></dd></div>
              <div><dt className="font-bold">Email</dt><dd><a href={`mailto:${contactEmail.value}`} className="text-sage">{contactEmail.value}</a></dd></div>
              <div><dt className="font-bold">How long we keep enquiries</dt><dd><Ph status={retention.status}>{retention.value}</Ph></dd></div>
              <div><dt className="font-bold">This version</dt><dd><Ph status={effectiveDate.status}>{effectiveDate.value}</Ph></dd></div>
            </dl>
          </div>
        </Container>
      </section>
      {/* Target of the site-wide "Schedule a visit" buttons. */}
      <Enquiry intents={["visit", "callback"]} defaultIntent="visit" />
    </>
  );
}
