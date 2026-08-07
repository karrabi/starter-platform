"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductService } from "@/services/product.service";

import type { CreateProductRequest } from "@/types/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => ProductService.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
