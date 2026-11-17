import { site, whatsappLink } from "@/content/site";
import type { EnquiryIntent } from "@/lib/enquiry";
import { Ph, Section } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { CallbackForm } from "./CallbackForm";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { photos } from "@/content/photos";

/** Final enquiry section. Target of every "Schedule a visit" button (#enquire). */
export function Enquiry({
  title = "Come and see for yourself",
  intro = "Visit any of our homes before you decide anything. Tell us when suits you, or leave your number and we'll call you back.",
  phone = site.phone,
  whatsappMessage,
  defaultIntent,
  defaultBranch,
  defaultNeed,
  intents,
  service,
}: {
  title?: string;
  intro?: string;
  phone?: typeof site.phone;
  whatsappMessage?: string;
  defaultIntent?: EnquiryIntent;
  defaultBranch?: string;
  defaultNeed?: string;
  intents?: EnquiryIntent[];
  service?: string;
}) {
  return (
    <Section id="enquire" tone="mist" labelledBy="enquire-title">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 id="enquire-title" className="text-h2">{title}</h2>
          <p className="mt-4 max-w-read text-lead text-muted">{intro}</p>
          <div className="mt-8 grid gap-3 sm:max-w-sm">
            <p className="font-bold">Prefer to talk now?</p>
            <Ph status={phone.status}>
              <ButtonLink href={`tel:${phone.value.tel}`} variant="outline" icon="phone" className="w-full">
                Call {phone.value.display}
              </ButtonLink>
            </Ph>
            <ButtonLink href={whatsappLink(whatsappMessage)} variant="outline" icon="whatsapp" className="w-full" data-wa-location="enquiry_section">
              Message us on WhatsApp
            </ButtonLink>
          </div>
          <PhotoFrame photo={photos.careCompanion} scene="tea" shot="a nurse with residents" ratio="3/2" elevated className="mt-10 hidden max-w-md lg:block" sizes="28rem" />
        </div>
        <CallbackForm intents={intents} defaultIntent={defaultIntent} defaultBranch={defaultBranch} defaultNeed={defaultNeed} service={service} />
      </div>
    </Section>
  );
}
