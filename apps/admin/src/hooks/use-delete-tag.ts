"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TagService } from "@/services/tag.service";

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => TagService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
