import Link from "next/link";

import { Navigation } from "./navigation";

import { getGeneralSettings } from "@/services/settings.service";
import { getPublicNavigation } from "@/services/navigation.service";

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";
import { getMediaById } from "@/services/media.service";

export async function Header() {
  const [settings, navigation] = await Promise.all([
    getGeneralSettings(),
    getPublicNavigation("blog"),
  ]);

  let logoMedia = null;

  if (settings.logoMediaId) {
    try {
      logoMedia = await getMediaById(settings.logoMediaId);
    } catch {
      logoMedia = null;
    }
  }

  const logoUrl = getMediaUrl(logoMedia?.path);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={settings.siteName}
              width={160}
              height={60}
              priority
              className="h-12 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold">{settings.siteName}</span>
          )}
        </Link>

        <Navigation items={navigation.items} />
      </div>
    </header>
  );
}
