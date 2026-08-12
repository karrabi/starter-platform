"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TagService, type CreateTagInput } from "@/services/tag.service";

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTagInput) => TagService.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
