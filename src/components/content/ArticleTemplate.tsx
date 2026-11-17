import Link from "next/link";
import { postPath, readingMinutes, type BlogPost } from "@/content/blog";
import { blockText } from "@/content/blocks";
import { isPlaceholder } from "@/content/types";
import { breadcrumbSchema, blogPostingSchema, faqSchema, graph, organizationSchema } from "@/lib/schema";
import { allPageMeta } from "@/lib/page-meta";
import { isLive } from "@/lib/routes";
import { Enquiry } from "@/components/home/Enquiry";
import { Faq } from "@/components/home/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Container, Ph } from "@/components/ui/Layout";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Prose, tocEntries } from "./Prose";

const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

/** Article page: breadcrumb, title, key points, contents, body, FAQs, related reading, enquiry. */
export function ArticleTemplate({ post }: { post: BlogPost }) {
  const path = postPath(post);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog/" },
    { name: post.title, href: path },
  ];
  const contents = tocEntries(post.body).entries;
  const reviewed = post.medicalReview && !isPlaceholder(post.medicalReview) ? post.medicalReview.value : undefined;
  const titles = new Map(allPageMeta().map((m) => [m.path, m.h1]));
  const related = post.related.filter(isLive).map((href) => ({ href, title: titles.get(href) ?? href }));
  const words = blockText(post.body).split(/\s+/).length;

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          { ...blogPostingSchema({ headline: post.title, description: post.metaDescription, path, published: post.published, updated: post.updated, reviewedBy: reviewed }), wordCount: words },
          breadcrumbSchema(crumbs),
          faqSchema(post.faqs ?? []),
        )}
      />
      <article aria-labelledby="page-title">
        <header className="pb-10 pt-8 sm:pt-10 lg:pb-14">
          <Container>
            <Breadcrumbs items={crumbs} />
            <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <p className="text-small font-bold text-sage">{post.category}</p>
                <h1 id="page-title" className="mt-3 text-display max-w-[20ch] tracking-[-0.01em]">{post.title}</h1>
                {/* Old posts' excerpts repeat their first paragraph, so only new guides show one here. */}
                {!post.legacy && <p className="mt-6 max-w-read text-lead text-muted">{post.excerpt}</p>}
                <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-small text-muted">
                  <span>By Swarnavihar Old Age Homes</span>
                  <span><time dateTime={post.updated ?? post.published}>{post.updated ? "Updated " : ""}{dateLabel(post.updated ?? post.published)}</time></span>
                  <span>{readingMinutes(post)} min read</span>
                </p>
                {post.legacy && (
                  <p className="mt-3 text-small text-muted">First published on our earlier website.</p>
                )}
                {post.medicalReview && (
                  <Ph status={post.medicalReview.status} as="p" className="mt-3 text-small text-muted">
                    {reviewed ? `Medically reviewed by ${reviewed}` : post.medicalReview.value}
                  </Ph>
                )}
              </div>
              <PhotoFrame noPeople ratio="4/3" scene={post.scene} shot={post.shot} priority sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Container>
        </header>

        <Container className="pb-16 sm:pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="min-w-0">
              {post.keyPoints.length > 0 && (
                <section aria-labelledby="key-points-title" className="mb-14 max-w-read rounded-card bg-mist p-6 sm:p-8">
                  <h2 id="key-points-title" className="text-h3">In short</h2>
                  <ul className="mt-4 space-y-3">
                    {post.keyPoints.map((k) => (
                      <li key={k} className="flex gap-3"><Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" /><span>{k}</span></li>
                    ))}
                  </ul>
                </section>
              )}
              <Prose blocks={post.body} />
              {(post.medicalReview || post.category === "Health and care") && (
                <p className="mt-12 max-w-read border-l-4 border-brass pl-4 text-small text-muted">
                  This article is general information, not medical advice. Please talk to your parent&apos;s doctor about their own situation.
                </p>
              )}
            </div>
            {contents.length > 1 && <aside aria-label="In this guide" className="hidden lg:block">
              <nav aria-labelledby="contents-title" className="sticky top-28 border-l-2 border-line pl-5">
                <p id="contents-title" className="font-bold text-sage">In this guide</p>
                <ol className="mt-3 space-y-2 text-small">
                  {contents.map((c) => (
                    <li key={c.id}><a href={`#${c.id}`} className="text-muted no-underline hover:text-sage hover:underline">{c.text.replace(/\*\*/g, "")}</a></li>
                  ))}
                </ol>
              </nav>
            </aside>}
          </div>
        </Container>
      </article>

      {post.faqs && post.faqs.length > 0 && <Faq items={post.faqs} title="Questions families ask" intro="Short answers to questions that often come up." tone="paper" />}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-cream py-14">
          <Container>
            <h2 id="related-title" className="text-h3">Read next</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="group flex h-full items-center justify-between gap-4 rounded-card border border-line bg-paper p-5 no-underline hover:border-sage">
                    <span className="font-serif text-[1.2rem] text-sage group-hover:underline">{r.title}</span>
                    <Icon name="chevron-right" className="size-5 shrink-0 text-brass-deep" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <Enquiry
        title="Talk to us about your parent"
        intro="If you have questions after reading this, leave your number and we'll call you back, or choose a day to visit."
        intents={["callback", "visit"]}
        defaultIntent="callback"
      />
    </>
  );
}
