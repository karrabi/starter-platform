import Link from "next/link";

import { Navigation } from "./navigation";

import { getGeneralSettings } from "@/services/settings.service";
import { getPublicNavigation } from "@/services/navigation.service";

export async function Header() {
  const [settings, navigation] = await Promise.all([
    getGeneralSettings(),
    getPublicNavigation("blog"),
  ]);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          {settings.siteName}
        </Link>

        <Navigation items={navigation.items} />
      </div>
    </header>
  );
}
