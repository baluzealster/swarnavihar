import { faqs } from "@/content/care";
import { pageMetadata } from "@/lib/metadata";
import { fixedPageMeta } from "@/lib/page-meta";
import { faqSchema, graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata(fixedPageMeta["/"]);

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organizationSchema(), websiteSchema(), faqSchema(faqs))} />
      <HomePage />
    </>
  );
}
