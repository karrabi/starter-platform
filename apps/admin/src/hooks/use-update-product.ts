"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductService } from "@/services/product.service";

import type { CreateProductRequest } from "@/types/product";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateProductRequest }) =>
      ProductService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", variables.id],
      });
    },
  });
}
