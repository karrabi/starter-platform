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

export class TagService {
  static getAll() {
    return apiClient.get<TagListResponse>("/tags");
  }
}
