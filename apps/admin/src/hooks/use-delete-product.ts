"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductService } from "@/services/product.service";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ProductService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
