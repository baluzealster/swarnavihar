import { Section, SectionHeading } from "@/components/ui/Layout";
import { CareShowcase } from "./CareShowcase";
import { Enquiry } from "./Enquiry";
import { Facilities } from "./Facilities";
import { Faq } from "./Faq";
import { GlimpsesSlideshow } from "./GlimpsesSlideshow";
import { Hero } from "./Hero";
import { HomesSelector } from "./HomesSelector";
import { Intro } from "./Intro";
import { MedicalCare } from "./MedicalCare";
import { Testimonials } from "./Testimonials";
import { WhyChooseUs } from "./WhyChooseUs";

/**
 * Homepage, in the approved order:
 * navigation (layout) → "Glimpses of Swarnavihar" photo slideshow → hero with Schedule a visit + WhatsApp → introduction → care services →
 * why families choose us → facilities → medical and nursing → locations → testimonials →
 * FAQ → final enquiry → footer (layout).
 */
export function HomePage() {
  return (
    <>
      <GlimpsesSlideshow />
      <Hero />
      <Intro />
      <CareShowcase />
      <WhyChooseUs />
      <Facilities />
      <MedicalCare />
      <Section id="homes" tone="mist" labelledBy="homes-title">
        <SectionHeading
          id="homes-title"
          title="Our locations in Pune"
          intro="Five homes across Pune, and one in Bengaluru. Choose an area to see the nearest, and visit any of them before you decide."
        />
        <HomesSelector />
      </Section>
      <Testimonials />
      <Faq />
      <Enquiry />
    </>
  );
}
