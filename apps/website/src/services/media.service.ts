import { apiGet } from "@/lib/api";

import type { PublicMedia } from "@/types/media";

export function getMediaById(id: number) {
  return apiGet<PublicMedia>(`/media/public/${id}`, {
    revalidate: 300,
    tags: ["media", `media:${id}`],
  });
}
