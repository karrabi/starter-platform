export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type BlogTag = {
  id: number;
  name: string;
  slug: string;
};

export type BlogCategoryRelation = {
  category: BlogCategory;
};

export type BlogTagRelation = {
  tag: BlogTag;
};

export type BlogSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImageId?: number | null;
};

export type BlogContent = {
  heading?: string;
  body?: string;
  excerpt?: string;
  [key: string]: unknown;
};

export type PublicBlog = {
  id: number;
  title: string;
  slug: string;
  content: BlogContent;
  status: "PUBLISHED";
  seo: BlogSeo | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categories: BlogCategoryRelation[];
  tags: BlogTagRelation[];
};
