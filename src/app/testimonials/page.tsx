import Link from "next/link";
import { testimonials } from "@/content/care";
import { googleReviews, talkToAFamily, testimonialsPage as page } from "@/content/testimonials-page";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Container, Ph } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Family reviews", href: page.path }];

/** No Review or AggregateRating structured data: none of these are verified reviews yet. */
export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="pb-20 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">{page.h1}</h1>
          <p className="mt-6 max-w-read text-lead text-muted">{page.lede}</p>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={i}>
                <Ph status={t.quote.status} as="div" className="h-full rounded-card border border-line bg-paper p-6">
                  <Icon name="quote" className="size-8 text-brass-deep" />
                  <blockquote className="mt-4 font-serif text-[1.2rem] leading-snug text-ink">{t.quote.value}</blockquote>
                  <p className="mt-5 text-small">
                    <Ph status={t.name.status} className="block font-bold">{t.name.value}</Ph>
                    <span className="text-muted">{t.relation}, {t.branch}</span>
                  </p>
                </Ph>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="rounded-card bg-mist p-6 sm:p-8">
              <h2 className="text-h3">Reviews on Google</h2>
              <Ph status={googleReviews.status} as="p" className="mt-3 text-muted">{googleReviews.value}</Ph>
            </div>
            <div className="rounded-card bg-mist p-6 sm:p-8">
              <h2 className="text-h3">Talk to a family</h2>
              <Ph status={talkToAFamily.status} as="p" className="mt-3 text-muted">{talkToAFamily.value}</Ph>
              <p className="mt-4 text-muted">Or read <Link href="/what-to-check-before-admitting-a-parent-to-an-old-age-home/" className="font-bold text-sage">what to check before admitting a parent</Link>.</p>
            </div>
          </div>
        </Container>
      </section>
      <Enquiry intents={["visit", "callback"]} defaultIntent="visit" />
    </>
  );
}
