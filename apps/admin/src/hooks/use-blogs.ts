"use client";

import { useQuery } from "@tanstack/react-query";

import { BlogService } from "@/services/blog.service";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],

    queryFn: async () => {
      const response = await BlogService.getAll();

      return response.data.data;
    },
  });
}
