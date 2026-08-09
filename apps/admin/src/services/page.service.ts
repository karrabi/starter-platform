import { apiClient } from "@/lib/api/api-client";

import type { CreatePageRequest, Page, UpdatePageRequest } from "@/types/page";

interface PageResponse {
  success: boolean;
  message?: string;
  data: Page;
}

interface PageListResponse {
  success: boolean;
  message?: string;
  data: Page[];
}

export class PageService {
  static getAll() {
    return apiClient.get<PageListResponse>("/pages");
  }

  static getById(id: number) {
    return apiClient.get<PageResponse>(`/pages/${id}`);
  }

  static create(data: CreatePageRequest) {
    return apiClient.post<PageResponse>("/pages", data);
  }

  static update(id: number, data: UpdatePageRequest) {
    return apiClient.put<PageResponse>(`/pages/${id}`, data);
  }

  static delete(id: number) {
    return apiClient.delete(`/pages/${id}`);
  }
}
