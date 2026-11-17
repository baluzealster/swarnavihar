import { cn } from "@/lib/cn";
import type { FactStatus } from "@/content/types";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-8", className)}>{children}</div>;
}

type Tone = "cream" | "paper" | "mist" | "sage" | "olive";

const tones: Record<Tone, string> = {
  cream: "bg-cream",
  paper: "bg-paper",
  mist: "bg-mist",
  sage: "on-sage bg-sage text-on-sage [&_h2]:text-paper [&_h3]:text-paper",
  olive: "on-sage bg-olive text-on-sage [&_h2]:text-paper [&_h3]:text-paper",
};

/** Page band. All homepage sections share the same vertical rhythm. */
export function Section({
  id, tone = "cream", labelledBy, className, reveal = true, children,
}: {
  id?: string; tone?: Tone; labelledBy?: string; className?: string;
  /** Fade the band's content up as it scrolls into view (ScrollReveal). Turn off when children reveal themselves. */
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "py-12 sm:py-16 lg:py-20", className)}>
      <Container>{reveal ? <div data-reveal="">{children}</div> : children}</Container>
    </section>
  );
}

/** Section heading: a serif title and one plain sentence. No eyebrow labels. */
export function SectionHeading({
  id, title, intro, className, align = "left",
}: { id: string; title: string; intro?: React.ReactNode; className?: string; align?: "left" | "split" }) {
  if (align === "split") {
    return (
      <div className={cn("mb-8 grid gap-4 lg:mb-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16", className)}>
        <h2 id={id} className="text-h2">{title}</h2>
        {intro && <p className="max-w-read text-lead text-muted [.on-sage_&]:text-on-sage">{intro}</p>}
      </div>
    );
  }
  return (
    <div className={cn("mb-8 max-w-3xl lg:mb-10", className)}>
      <h2 id={id} className="text-h2">{title}</h2>
      {intro && <p className="mt-4 max-w-read text-lead text-muted [.on-sage_&]:text-on-sage">{intro}</p>}
    </div>
  );
}

/** Marks dummy content with a dashed outline in development (see fact sheet). */
export function Ph({
  status, as: Tag = "span", className, children,
}: { status: FactStatus; as?: "span" | "div" | "p" | "li"; className?: string; children: React.ReactNode }) {
  const isPh = status === "placeholder";
  return (
    <Tag
      className={className}
      data-placeholder={isPh ? "true" : undefined}
      title={isPh ? "Placeholder: replace before launch" : undefined}
    >
      {children}
    </Tag>
  );
}
