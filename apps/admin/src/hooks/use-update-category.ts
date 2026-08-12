"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CategoryService,
  type UpdateCategoryInput,
} from "@/services/category.service";

type UpdateCategoryVariables = {
  id: number;
  data: UpdateCategoryInput;
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryVariables) =>
      CategoryService.update(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
