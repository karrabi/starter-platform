export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface ProductMediaFile {
  id: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  extension: string;
  size: number;
  path: string;
  createdAt: string;
}

export interface ProductMedia {
  id: number;
  productId: number;
  mediaId: number;
  position: number;
  featured: boolean;
  media: ProductMediaFile;
}
export interface ProductCategoryItem {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string | null;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategoryRelation {
  productId: number;
  categoryId: number;
  createdAt: string;
  category: ProductCategoryItem;
}
export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: Record<string, unknown>;
  media: ProductMedia[];
  seo?: Record<string, unknown> | null;
  featured: boolean;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  categories: ProductCategoryRelation[];
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
  gallery: number[];
  categoryIds: number[];
}
