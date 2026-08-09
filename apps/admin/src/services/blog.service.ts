import { apiClient } from "@/lib/api/api-client";

import type { Blog, CreateBlogRequest, UpdateBlogRequest } from "@/types/blog";

interface BlogResponse {
  success: boolean;
  message?: string;
  data: Blog;
}

interface BlogListResponse {
  success: boolean;
  message?: string;
  data: Blog[];
}

export class BlogService {
  static getAll() {
    return apiClient.get<BlogListResponse>("/blog");
  }

  static getById(id: number) {
    return apiClient.get<BlogResponse>(`/blog/${id}`);
  }

  static create(data: CreateBlogRequest) {
    return apiClient.post<BlogResponse>("/blog", data);
  }

  static update(id: number, data: UpdateBlogRequest) {
    return apiClient.put<BlogResponse>(`/blog/${id}`, data);
  }

  static delete(id: number) {
    return apiClient.delete(`/blog/${id}`);
  }
}
