import { LocationTemplate, locationMetadata } from "@/components/templates/LocationTemplate";

export const metadata = locationMetadata("wakad");

export default function Page() {
  return <LocationTemplate area="wakad" />;
}
