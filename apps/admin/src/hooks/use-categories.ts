"use client";

import { useQuery } from "@tanstack/react-query";

import { CategoryService } from "@/services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const response = await CategoryService.getAll();

      return response.data.data;
    },
  });
}
