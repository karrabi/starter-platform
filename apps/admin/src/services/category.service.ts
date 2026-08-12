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

export interface CreateCategoryInput {
  name: string;
  slug: string;
  type: string;
  description?: string | null;
  parentId?: number | null;
  sortOrder?: number;
  isActive?: boolean;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export class CategoryService {
  static getAll() {
    return apiClient.get<CategoryListResponse>("/categories");
  }

  static create(data: CreateCategoryInput) {
    return apiClient.post("/categories", data);
  }

  static update(id: number, data: UpdateCategoryInput) {
    return apiClient.put(`/categories/${id}`, data);
  }

  static delete(id: number) {
    return apiClient.delete(`/categories/${id}`);
  }
}
