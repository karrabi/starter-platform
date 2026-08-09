"use client";

import { useQuery } from "@tanstack/react-query";

import { TagService } from "@/services/tag.service";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],

    queryFn: async () => {
      const response = await TagService.getAll();

      return response.data.data;
    },
  });
}
