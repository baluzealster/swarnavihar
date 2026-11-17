import { LocationTemplate, locationMetadata } from "@/components/templates/LocationTemplate";

export const metadata = locationMetadata("baner");

export default function Page() {
  return <LocationTemplate area="baner" />;
}
