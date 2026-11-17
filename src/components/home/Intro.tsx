import { stats } from "@/content/care";
import { photos } from "@/content/photos";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Ph, Section } from "@/components/ui/Layout";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { isLive } from "@/lib/routes";

/** Introduction to Swarnavihar: who we are, a real photo of the place, and the numbers. */
export function Intro() {
  return (
    <Section id="about" tone="paper" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div className="relative lg:order-2">
          <PhotoFrame photo={photos.gardenEvening} scene="verandah" shot="the garden at dusk" ratio="4/3" elevated sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="absolute -bottom-6 -left-3 hidden w-48 rounded-card bg-paper p-2 shadow-lift sm:block lg:-left-10">
            <PhotoFrame photo={photos.roomTwin} scene="room" shot="a twin room" ratio="1/1" sizes="12rem" />
          </div>
        </div>
        <div className="brass-rule">
          <h2 id="about-title" className="text-h2">Six homes, one way of caring</h2>
          <div className="mt-6 max-w-read space-y-4 text-lead text-muted">
            <p>
              Swarnavihar runs six old age homes, five across Pune and one in Bengaluru. Each is a home in a
              residential neighbourhood, with its own name.
            </p>
            <p>
              Inside, older parents get what they need as they age: help with daily living, nurses on every shift,
              regular doctor visits and physiotherapy, without having to live in a hospital.
            </p>
          </div>
          {isLive("/about/") && <ButtonLink href="/about/" variant="outline" className="mt-8">More about Swarnavihar</ButtonLink>}
        </div>
      </div>

      <ul aria-label="Swarnavihar in numbers" className="mt-12 grid grid-cols-2 overflow-hidden rounded-card border border-line bg-cream lg:mt-16 lg:grid-cols-4">
        {stats.map((s, i) => (
          <li key={s.label} className={"flex flex-col gap-2 p-6 sm:p-8 " + (i % 2 ? "border-l border-line " : "") + (i > 1 ? "border-t border-line lg:border-t-0 " : "") + (i === 2 ? "lg:border-l" : "")}>
            <Ph status={s.value.status} className="self-start font-serif text-[2.6rem] leading-none text-sage sm:text-[3.2rem]">
              <CountUp value={s.value.value} />
            </Ph>
            <span className="text-small text-muted">{s.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
