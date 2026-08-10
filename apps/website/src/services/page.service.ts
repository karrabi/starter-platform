import { apiGet } from "@/lib/api";

import type { PublicPage } from "@/types/page";

export function getPageBySlug(slug: string) {
  return apiGet<PublicPage>(`/pages/public/${encodeURIComponent(slug)}`);
}
