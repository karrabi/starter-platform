import { getPublicNavigation } from "@/services/navigation.service";
import { getGeneralSettings } from "@/services/settings.service";

export default async function HomePage() {
  const settings = await getGeneralSettings();
  const navigation = await getPublicNavigation("blog");
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">{settings.siteName}</h1>

      <p className="mt-4 text-gray-600">{settings.siteDescription}</p>
    </main>
  );
}
