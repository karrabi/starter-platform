"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BlogService } from "@/services/blog.service";

import type { UpdateBlogRequest } from "@/types/blog";

type UpdateBlogVariables = {
  id: number;
  data: UpdateBlogRequest;
};

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateBlogVariables) =>
      BlogService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blogs", variables.id],
      });
    },
  });
}
