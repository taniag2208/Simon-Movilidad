import { getSession } from "@/lib/auth";
import { HomeHero } from "@/components/home/HomeHero";

export default async function InicioPage() {
  const user = await getSession();
  return <HomeHero firstName={user?.name.split(" ")[0] ?? ""} />;
}
