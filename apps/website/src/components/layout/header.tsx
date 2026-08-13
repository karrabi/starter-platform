import Image from "next/image";
import Link from "next/link";

import { getMediaUrl } from "@/lib/media";
import { getMediaById } from "@/services/media.service";
import { getGeneralSettings } from "@/services/settings.service";

export async function Header() {
  const settings = await getGeneralSettings();

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
    <>
      <div className="bg-accent py-2 text-center text-xs font-bold text-navy md:hidden">
        مشاوره رایگان
      </div>

      <header className="absolute inset-x-0 top-8 z-50 text-white md:top-0">
        <div className="container-site flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={settings.siteName}
                width={120}
                height={55}
                priority
                className="h-11 w-auto brightness-0 invert"
              />
            ) : (
              <span className="text-lg font-black">{settings.siteName}</span>
            )}
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold md:flex">
            <a href="#services">خدمات</a>
            <a href="#portfolio">نمونه کارها</a>
            <a href="#articles">مقالات</a>
            <a href="#contact">تماس با ما</a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full bg-white px-5 py-2 text-xs font-bold text-primary md:block"
          >
            تماس با ما
          </a>

          <button
            type="button"
            aria-label="منو"
            className="grid h-10 w-10 grid-cols-2 gap-1 rounded-xl border border-white/20 p-2 md:hidden"
          >
            <span className="rounded-sm bg-white" />
            <span className="rounded-sm bg-white" />
            <span className="rounded-sm bg-white" />
            <span className="rounded-sm bg-white" />
          </button>
        </div>
      </header>
    </>
  );
}
