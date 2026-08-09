import { apiClient } from "@/lib/api/api-client";

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string | null;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
}

export interface CategoryListResponse {
  success: boolean;
  message?: string;
  data: Category[];
}

export class CategoryService {
  static getAll() {
    return apiClient.get<CategoryListResponse>("/categories");
  }
}
