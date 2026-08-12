"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CategoryService,
  type CreateCategoryInput,
} from "@/services/category.service";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => CategoryService.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
