"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CategoryService } from "@/services/category.service";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CategoryService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
