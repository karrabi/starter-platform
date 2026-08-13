import type { Metadata } from "next";
import {
  getGeneralSettings,
  getSeoSettings,
} from "@/services/settings.service";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { getMediaById } from "@/services/media.service";
import { getMediaUrl } from "@/lib/media";
import { Footer } from "@/components/layout/footer";

import { getSiteOrigin, getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [seo, general] = await Promise.all([
    getSeoSettings(),
    getGeneralSettings(),
  ]);

  let faviconUrl: string | null = null;

  if (general.faviconMediaId) {
    try {
      const faviconMedia = await getMediaById(general.faviconMediaId);

      faviconUrl = getMediaUrl(faviconMedia.path);
    } catch {
      faviconUrl = null;
    }
  }

  let defaultOgImageUrl: string | null = null;

  if (seo.defaultOgImageId) {
    try {
      const ogMedia = await getMediaById(seo.defaultOgImageId);

      defaultOgImageUrl = getMediaUrl(ogMedia.path);
    } catch {
      defaultOgImageUrl = null;
    }
  }
  const siteOrigin = getSiteOrigin();
  return {
    metadataBase: new URL(siteOrigin),

    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate || "%s",
    },

    description: seo.defaultDescription,

    alternates: {
      canonical: getSiteUrl("/"),
    },

    ...(faviconUrl
      ? {
          icons: {
            icon: faviconUrl,
          },
        }
      : {}),

    openGraph: {
      type: "website",
      url: getSiteUrl("/"),
      siteName: general.siteName,
      title: seo.defaultTitle,
      description: seo.defaultDescription,

      ...(defaultOgImageUrl
        ? {
            images: [
              {
                url: defaultOgImageUrl,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.defaultDescription,

      ...(defaultOgImageUrl
        ? {
            images: [defaultOgImageUrl],
          }
        : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
