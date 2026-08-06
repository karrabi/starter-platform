import type { Prisma, ProductStatus } from "@prisma/client";

export interface CreateProductDto {
  name: string;
  slug: string;
  shortDescription?: string | null;
  description: Prisma.InputJsonValue;
  seo?: Prisma.InputJsonValue;
  status: ProductStatus;
  featured?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  slug?: string;
  shortDescription?: string | null;
  description?: Prisma.InputJsonValue;
  seo?: Prisma.InputJsonValue;
  status?: ProductStatus;
  featured?: boolean;
}
