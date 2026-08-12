import { apiGet } from "@/lib/api";

import type { PublicProduct } from "@/types/product";

export function getActiveProducts() {
  return apiGet<PublicProduct[]>("/products/public", {
    revalidate: 60,
    tags: ["products"],
  });
}

export function getProductBySlug(slug: string) {
  return apiGet<PublicProduct>(`/products/public/${encodeURIComponent(slug)}`, {
    revalidate: 60,
    tags: ["products", `product:${slug}`],
  });
}
