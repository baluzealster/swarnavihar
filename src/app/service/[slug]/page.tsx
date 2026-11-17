import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePageBySlug, servicePages } from "@/content/service-pages";
import { ServiceTemplate, serviceMetadata } from "@/components/templates/ServiceTemplate";

/** Only services with a finished page are built; other slugs 404 until their content is written. */
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = servicePageBySlug((await params).slug);
  return page ? serviceMetadata(page) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = servicePageBySlug((await params).slug);
  if (!page) notFound();
  return <ServiceTemplate page={page} />;
}
