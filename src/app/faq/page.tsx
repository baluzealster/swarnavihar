import Link from "next/link";
import { admissionFaqs } from "@/content/admission";
import { faqs as homeFaqs } from "@/content/care";
import { faqGroups, faqPage as page } from "@/content/family-faqs";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Container, Ph } from "@/components/ui/Layout";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Family FAQs", href: page.path }];

/** Questions already marked up on the home or admission page aren't marked up again here. */
const markedElsewhere = new Set([...homeFaqs, ...admissionFaqs].map((f) => f.q));
const uniqueFaqs = faqGroups.flatMap((g) => g.items).filter((f) => !markedElsewhere.has(f.q));

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs), faqSchema(uniqueFaqs))} />
      <section aria-labelledby="page-title" className="pb-8 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display max-w-[18ch]">{page.h1}</h1>
          <p className="mt-6 max-w-read text-lead text-muted">{page.lede}</p>
          <nav aria-label="FAQ topics" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-paper px-4 text-small font-medium text-sage no-underline hover:border-sage">{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <div id="faq">
        {faqGroups.map((g, i) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className={(i % 2 ? "bg-cream" : "bg-paper") + " scroll-mt-24 py-14 sm:py-16"}>
            <Container>
              <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
                <h2 id={`${g.id}-title`} className="text-h2">{g.title}</h2>
                <div className="border-t border-line-strong">
                  {g.items.map((f) => (
                    <details key={f.q} className="group border-b border-line-strong">
                      <summary className="flex min-h-16 items-center justify-between gap-6 py-4 font-serif text-[1.25rem] text-sage">
                        {f.q}
                        <Icon name="plus" className="size-6 shrink-0 text-brass-deep transition-transform duration-200 group-open:rotate-45" />
                      </summary>
                      <Ph status={f.a.status} as="p" className="max-w-read pb-6 text-muted">{f.a.value}</Ph>
                    </details>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section aria-labelledby="more-title" className="bg-mist py-14">
        <Container>
          <h2 id="more-title" className="text-h3">More help for families</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            <li><Link href="/how-to-choose-the-right-old-age-home-in-pune/" className="font-bold text-sage">How to choose an old age home in Pune</Link></li>
            <li><Link href="/understanding-old-age-home-charges-in-pune/" className="font-bold text-sage">Understanding the charges</Link></li>
            <li><Link href="/admission/" className="font-bold text-sage">Admission, care levels and fees</Link></li>
            <li><Link href="/medical-care/" className="font-bold text-sage">Medical care in our homes</Link></li>
          </ul>
        </Container>
      </section>

      <Enquiry title="Still have a question?" intro="Leave your number and we'll call you back, or choose a day to visit." intents={["callback", "visit"]} defaultIntent="callback" />
    </>
  );
}
