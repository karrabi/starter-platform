import { apiClient } from "@/lib/api/api-client";

import type {
  CreateProductRequest,
  ProductListResponse,
  ProductResponse,
} from "@/types/product";

export class ProductService {
  static getAll() {
    return apiClient.get<ProductListResponse>("/products");
  }

  static create(data: CreateProductRequest) {
    return apiClient.post<ProductResponse>("/products", data);
  }

  static getById(id: number) {
    return apiClient.get<ProductResponse>(`/products/${id}`);
  }

  static update(id: number, data: CreateProductRequest) {
    return apiClient.put<ProductResponse>(`/products/${id}`, data);
  }

  static delete(id: number) {
    return apiClient.delete(`/products/${id}`);
  }
}
