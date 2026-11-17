import { whatsappLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { ScheduleVisitLink } from "@/components/ui/ScheduleVisitLink";
import { AreaFinder } from "./AreaFinder";

/** Facts already stated on the old site (sourced) and in the copy below; nothing new is claimed. */
const assurances = ["Nurses on every shift", "Visiting doctors", "In-house physiotherapy", "Homes in Pune and Bengaluru"];

/**
 * The promise, right under the "Glimpses of Swarnavihar" slideshow: headline, the two
 * calls to action, four reassurances, and the area picker on a raised white card.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-cream">
      <Container className="grid gap-12 pb-14 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <span aria-hidden="true" className="mb-6 block h-0.5 w-14 bg-brass" />
          <h1 id="hero-title" className="text-display max-w-[13ch] tracking-[-0.01em]">
            Care for your parents, close to where you live
          </h1>
          <p className="mt-6 max-w-read text-lead text-muted">
            Swarnavihar runs six old age homes across Pune and Bengaluru, with nurses on every shift, visiting doctors and physiotherapy,
            so you can drop in often, not just on weekends.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ScheduleVisitLink size="lg" withIcon />
            <ButtonLink href={whatsappLink()} variant="outline" size="lg" icon="whatsapp" data-wa-location="hero">WhatsApp us</ButtonLink>
          </div>
          <ul aria-label="At every Swarnavihar home" className="mt-10 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
            {assurances.map((a) => (
              <li key={a} className="flex items-center gap-2.5">
                <Icon name="check" className="size-5 shrink-0 text-brass-deep" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card shadow-lift lg:justify-self-end lg:w-full lg:max-w-[30rem]">
          <AreaFinder />
        </div>
      </Container>
    </section>
  );
}
