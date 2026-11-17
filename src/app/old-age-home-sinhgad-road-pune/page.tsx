import { LocationTemplate, locationMetadata } from "@/components/templates/LocationTemplate";

export const metadata = locationMetadata("sinhgad-road");

export default function Page() {
  return <LocationTemplate area="sinhgad-road" />;
}
