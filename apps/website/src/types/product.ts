export type ProductMediaFile = {
  id: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  extension: string;
  size: number;
  path: string;
  createdAt: string;
};

export type ProductMedia = {
  id: number;
  productId: number;
  mediaId: number;
  position: number;
  featured: boolean;
  media: ProductMediaFile;
};

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type ProductTag = {
  id: number;
  name: string;
  slug: string;
};

export type ProductCategoryRelation = {
  category: ProductCategory;
};

export type ProductTagRelation = {
  tag: ProductTag;
};

export type ProductDescription = {
  body?: string;
  [key: string]: unknown;
};

export type ProductSeo = {
  title?: string;
  description?: string;
  ogImageId?: number | null;
};

export type PublicProduct = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: ProductDescription | null;
  seo: ProductSeo | null;
  status: "ACTIVE";
  featured: boolean;
  createdAt: string;
  updatedAt: string;

  media: ProductMedia[];
  categories: ProductCategoryRelation[];
  tags: ProductTagRelation[];
};
