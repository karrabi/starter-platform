import { apiClient } from "@/lib/api/api-client";

export interface Tag {
  id: number;
  name: string;
  slug: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TagListResponse {
  success: boolean;
  message?: string;
  data: Tag[];
}

export interface CreateTagInput {
  name: string;
  slug: string;
  type: string;
  isActive?: boolean;
}

export type UpdateTagInput = Partial<CreateTagInput>;

export class TagService {
  static getAll() {
    return apiClient.get<TagListResponse>("/tags");
  }

  static create(data: CreateTagInput) {
    return apiClient.post("/tags", data);
  }

  static update(id: number, data: UpdateTagInput) {
    return apiClient.put(`/tags/${id}`, data);
  }

  static delete(id: number) {
    return apiClient.delete(`/tags/${id}`);
  }
}
