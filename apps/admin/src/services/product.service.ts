import { apiClient } from "@/lib/api/api-client";

import type { ProductListResponse } from "@/types/product";

export class ProductService {
  static getAll() {
    return apiClient.get<ProductListResponse>("/products");
  }
}
