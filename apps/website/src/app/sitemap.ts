import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";
import { getPublishedBlogs } from "@/services/blog.service";
import { getPublishedPages } from "@/services/page.service";
import { getActiveProducts } from "@/services/product.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, blogs, products] = await Promise.all([
    getPublishedPages(),
    getPublishedBlogs(),
    getActiveProducts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getSiteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getSiteUrl("/blog"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: getSiteUrl("/products"),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: getSiteUrl(`/${page.slug}`),
    lastModified: new Date(page.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: getSiteUrl(`/blog/${blog.slug}`),
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: getSiteUrl(`/products/${product.slug}`),
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...pageRoutes, ...blogRoutes, ...productRoutes];
}
