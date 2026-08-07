export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: Record<string, unknown>;
  gallery?: number[] | null;
  seo?: Record<string, unknown> | null;
  featured: boolean;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  success: boolean;
  message?: string;
  data: Product[];
}

export interface ProductResponse {
  success: boolean;
  message?: string;
  data: Product;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  shortDescription?: string | null;
  description: Record<string, unknown>;
  status: ProductStatus;
  featured: boolean;
}
