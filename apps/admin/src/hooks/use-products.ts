"use client";

import { useQuery } from "@tanstack/react-query";

import { ProductService } from "@/services/product.service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const response = await ProductService.getAll();

      return response.data.data;
    },
  });
}
