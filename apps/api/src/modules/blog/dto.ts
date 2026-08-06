import type { BlogStatus, Prisma } from "@prisma/client";

export interface CreateBlogDto {
  title: string;
  slug: string;
  summary?: string | null;
  content: Prisma.InputJsonValue;
  status: BlogStatus;
  seo?: Prisma.InputJsonValue;
  publishedAt?: Date | null;
}

export interface UpdateBlogDto {
  title?: string;
  slug?: string;
  summary?: string | null;
  content?: Prisma.InputJsonValue;
  status?: BlogStatus;
  seo?: Prisma.InputJsonValue;
  publishedAt?: Date | null;
}
