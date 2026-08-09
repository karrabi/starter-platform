"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BlogService } from "@/services/blog.service";

import type { CreateBlogRequest } from "@/types/blog";

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogRequest) => BlogService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
}
