import { whatsappLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Layout";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ScheduleVisitLink } from "@/components/ui/ScheduleVisitLink";
import type { Scene } from "@/components/ui/Illustration";

/** Hero for inner pages: breadcrumb, H1, one-paragraph lede, the two CTAs, and a picture. */
export function PageHero({
  crumbs, title, lede, scene, shot, whatsappMessage, branch, houseName, noPeople, children,
}: {
  crumbs: Crumb[];
  title: string;
  lede: string;
  scene: Scene;
  shot: string;
  whatsappMessage: string;
  branch?: string;
  houseName?: string;
  /** Pages about a medical condition: show places, never recognisable people. */
  noPeople?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="pb-14 pt-8 sm:pt-10 lg:pb-20">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <h1 id="page-title" className="text-display max-w-[16ch] tracking-[-0.01em]">{title}</h1>
            <p className="mt-6 max-w-read text-lead text-muted">{lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ScheduleVisitLink size="lg" withIcon branch={branch} houseName={houseName}>Schedule a visit</ScheduleVisitLink>
              <ButtonLink href={whatsappLink(whatsappMessage)} variant="outline" size="lg" icon="whatsapp" data-wa-location="hero">WhatsApp us</ButtonLink>
            </div>
            {children}
          </div>
          <div className="relative">
            <span aria-hidden="true" className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-card border border-brass/50 sm:block" />
            <PhotoFrame ratio="4/3" scene={scene} shot={shot} priority elevated noPeople={noPeople} className="relative" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
