import Link from "next/link";
import { blogPage as page, guides, legacyPosts, postPath, readingMinutes } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { Enquiry } from "@/components/home/Enquiry";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Layout";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const crumbs = [{ name: "Home", href: "/" }, { name: "Blog", href: page.path }];

export default function Page() {
  const [lead, ...rest] = guides;
  const dateLabel = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  return (
    <>
      <JsonLd data={graph(organizationSchema(), breadcrumbSchema(crumbs))} />
      <section aria-labelledby="page-title" className="pb-20 pt-8 sm:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 id="page-title" className="mt-8 text-display">{page.h1}</h1>
          <p className="mt-6 max-w-read text-lead text-muted">{page.lede}</p>

          <article className="mt-12 grid gap-8 rounded-card border border-line bg-paper p-6 sm:p-8 md:grid-cols-2 md:items-center lg:gap-14">
            <PhotoFrame noPeople ratio="3/2" scene={lead.scene} shot={lead.shot} sizes="(min-width: 768px) 45vw, 100vw" />
            <div>
              <p className="text-small font-bold text-sage">{lead.category}</p>
              <h2 className="mt-2 text-h2"><Link href={postPath(lead)} className="text-ink no-underline hover:text-sage hover:underline">{lead.title}</Link></h2>
              <p className="mt-4 text-muted">{lead.excerpt}</p>
              <p className="mt-4 text-small text-muted">{readingMinutes(lead)} min read</p>
            </div>
          </article>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <article className="flex h-full flex-col rounded-card border border-line bg-paper p-6">
                  <p className="text-small font-bold text-sage">{p.category}</p>
                  <h2 className="mt-2 font-serif text-[1.4rem] leading-snug"><Link href={postPath(p)} className="text-ink no-underline hover:text-sage hover:underline">{p.title}</Link></h2>
                  <p className="mt-3 text-small text-muted">{p.excerpt}</p>
                  <p className="mt-auto pt-4 text-small text-muted">{readingMinutes(p)} min read</p>
                </article>
              </li>
            ))}
          </ul>

          <section aria-labelledby="more-title" className="mt-20">
            <h2 id="more-title" className="text-h2">More articles</h2>
            <p className="mt-3 max-w-read text-muted">Articles from our earlier website, newest first.</p>
            <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
              {legacyPosts.map((p) => (
                <li key={p.slug} className="border-b border-line py-4">
                  <Link href={postPath(p)} className="font-serif text-[1.15rem] leading-snug text-sage no-underline hover:underline">{p.title}</Link>
                  <span className="mt-1 block text-small text-muted">{p.category}, {dateLabel(p.published)}</span>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </section>
      <Enquiry title="Talk to us about your parent" intro="If you'd rather talk it through, leave your number and we'll call you back, or choose a day to visit." intents={["callback", "visit"]} defaultIntent="callback" />
    </>
  );
}
