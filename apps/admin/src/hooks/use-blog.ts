"use client";

import { useQuery } from "@tanstack/react-query";

import { BlogService } from "@/services/blog.service";

export function useBlog(id: number) {
  return useQuery({
    queryKey: ["blogs", id],

    queryFn: async () => {
      const response = await BlogService.getById(id);

      return response.data.data;
    },

    enabled: Number.isInteger(id) && id > 0,
  });
}
