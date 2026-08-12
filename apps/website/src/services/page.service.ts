import { cache } from "react";

import { apiGet } from "@/lib/api";

import type { PublicPage } from "@/types/page";

export const getPageBySlug = cache(async (slug: string) => {
  return apiGet<PublicPage>(`/pages/public/${encodeURIComponent(slug)}`, {
    revalidate: 60,
    tags: ["pages", `page:${slug}`],
  });
});

export function getPublishedPages() {
  return apiGet<PublicPage[]>("/pages/public", {
    revalidate: 60,
    tags: ["pages"],
  });
}
