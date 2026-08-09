"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BlogService } from "@/services/blog.service";

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => BlogService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
}
