import { apiGet } from "@/lib/api";

import type { PublicBlog } from "@/types/blog";

export function getPublishedBlogs() {
  return apiGet<PublicBlog[]>("/blog/public");
}

export function getBlogBySlug(slug: string) {
  return apiGet<PublicBlog>(`/blog/public/${encodeURIComponent(slug)}`);
}
