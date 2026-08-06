export type CategoryType = "BLOG" | "PRODUCT" | "PORTFOLIO" | "SERVICE";

export interface CreateCategoryDto {
  name: string;
  slug: string;
  type: CategoryType;
  description?: string | null;
  parentId?: number | null;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  type?: CategoryType;
  description?: string | null;
  parentId?: number | null;
  sortOrder?: number;
  isActive?: boolean;
}
