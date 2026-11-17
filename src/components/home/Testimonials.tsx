import { testimonials } from "@/content/care";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { isLive } from "@/lib/routes";

/**
 * Family reviews. The brief forbids invented testimonials: these slots stay marked as
 * placeholders until families give written consent, or are replaced by a Google reviews embed.
 */
export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <Section id="families" labelledBy="families-title">
      <SectionHeading id="families-title" title="In the words of families" />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <figure className="relative rounded-card border-t-4 border-brass bg-paper p-7 shadow-soft sm:p-10">
          <Icon name="quote" className="size-10 text-brass" />
          <Ph status={featured.quote.status} as="div" className="mt-4">
            <blockquote className="font-serif text-[1.45rem] leading-[1.45] text-ink sm:text-[1.7rem]">
              {featured.quote.value}
            </blockquote>
          </Ph>
          <figcaption className="mt-8 border-t border-line pt-5">
            <Ph status={featured.name.status} className="block font-bold">{featured.name.value}</Ph>
            <span className="text-small text-muted">{featured.relation}, {featured.branch}</span>
          </figcaption>
        </figure>
        <div className="grid gap-6">
          {rest.map((t, i) => (
            <figure key={i} className="card-lift rounded-card bg-paper p-6 shadow-soft sm:p-7">
              <Ph status={t.quote.status} as="div">
                <blockquote className="text-lead leading-relaxed">{t.quote.value}</blockquote>
              </Ph>
              <figcaption className="mt-5">
                <Ph status={t.name.status} className="block font-bold">{t.name.value}</Ph>
                <span className="text-small text-muted">{t.relation}, {t.branch}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      {isLive("/testimonials/") && (
        <div className="mt-10">
          <ButtonLink href="/testimonials/" variant="outline">Read more family reviews</ButtonLink>
        </div>
      )}
    </Section>
  );
}
