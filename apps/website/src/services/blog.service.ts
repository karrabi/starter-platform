import { apiGet } from "@/lib/api";

import type { PublicBlog } from "@/types/blog";

export function getPublishedBlogs() {
  return apiGet<PublicBlog[]>("/blog/public", {
    revalidate: 60,
    tags: ["blogs"],
  });
}

export function getBlogBySlug(slug: string) {
  return apiGet<PublicBlog>(`/blog/public/${encodeURIComponent(slug)}`, {
    revalidate: 60,
    tags: ["blogs", `blog:${slug}`],
  });
}
