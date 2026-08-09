export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface BlogCategoryItem {
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

export interface BlogCategoryRelation {
  blogId: number;
  categoryId: number;
  createdAt: string;
  category: BlogCategoryItem;
}

export interface BlogTagItem {
  id: number;
  name: string;
  slug: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogTagRelation {
  blogId: number;
  tagId: number;
  createdAt: string;
  tag: BlogTagItem;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: Record<string, unknown>;
  status: BlogStatus;
  seo?: Record<string, unknown> | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  categories: BlogCategoryRelation[];
  tags: BlogTagRelation[];
}

export interface CreateBlogRequest {
  title: string;
  slug: string;
  summary?: string | null;
  content: Record<string, unknown>;
  status: BlogStatus;
  publishedAt?: string | null;

  categoryIds: number[];
  tagIds: number[];

  seo?: {
    title?: string;
    description?: string;
    ogImageId?: number;
  };
}

export type UpdateBlogRequest = Partial<CreateBlogRequest>;
