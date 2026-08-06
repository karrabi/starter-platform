import type { Prisma, BlogStatus } from "@prisma/client";

export interface CreateBlogDto {
  title: string;
  slug: string;
  summary?: string | null;
  content: Prisma.InputJsonValue;
  status: BlogStatus;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt?: Date | null;
}

export interface UpdateBlogDto {
  title?: string;
  slug?: string;
  summary?: string | null;
  content?: Prisma.InputJsonValue;
  status?: BlogStatus;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt?: Date | null;
}
