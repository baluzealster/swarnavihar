import { faqs as homeFaqs } from "@/content/care";
import type { Fact } from "@/content/types";
import { Ph, Section } from "@/components/ui/Layout";
import { Icon } from "@/components/ui/Icon";

/** Native <details> accordion: accessible and works without JavaScript. */
export function Faq({
  items = homeFaqs,
  title = "Questions families ask us",
  intro = "If yours isn't here, ask us on WhatsApp or call any of our homes.",
  tone = "cream",
}: {
  items?: { q: string; a: Fact<string> }[];
  title?: string;
  intro?: string;
  tone?: "cream" | "paper";
}) {
  return (
    <Section id="faq" tone={tone} labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <h2 id="faq-title" className="text-h2">{title}</h2>
          <p className="mt-4 text-lead text-muted">{intro}</p>
        </div>
        <div className="border-t border-line-strong">
          {items.map((f) => (
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
    </Section>
  );
}
