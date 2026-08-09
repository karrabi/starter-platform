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

export interface ProductTagItem {
  id: number;
  name: string;
  slug: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTagRelation {
  productId: number;
  tagId: number;
  createdAt: string;
  tag: ProductTagItem;
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
  tags: ProductTagRelation[];
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
  tagIds: number[];
  seo?: {
    title?: string;
    description?: string;
    ogImageId?: number;
  };
}
