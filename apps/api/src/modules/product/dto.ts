import type { Prisma, ProductStatus } from "@prisma/client";

export interface CreateProductDto {
  name: string;
  slug: string;
  shortDescription?: string | null;
  description: Prisma.InputJsonValue;
  gallery?: Prisma.InputJsonValue;
  seo?: Prisma.InputJsonValue;
  status: ProductStatus;
  featured?: boolean;
  categoryIds?: number[];
  tagIds?: number[];
}

export interface UpdateProductDto {
  name?: string;
  slug?: string;
  shortDescription?: string | null;
  description?: Prisma.InputJsonValue;
  gallery?: Prisma.InputJsonValue;
  seo?: Prisma.InputJsonValue;
  status?: ProductStatus;
  featured?: boolean;
  categoryIds?: number[];
  tagIds?: number[];
}
