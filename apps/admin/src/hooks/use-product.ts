"use client";

import { useQuery } from "@tanstack/react-query";

import { ProductService } from "@/services/product.service";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      const response = await ProductService.getById(id);

      return response.data.data;
    },

    enabled: !!id,
  });
}
