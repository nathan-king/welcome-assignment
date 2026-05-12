import Dashboard from "@/components/Dashboard";
import { getLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export default function Home() {
  const links = getLinks();

  return <Dashboard links={links} />;
}
