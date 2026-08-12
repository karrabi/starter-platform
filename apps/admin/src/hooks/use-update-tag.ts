"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TagService, type UpdateTagInput } from "@/services/tag.service";

type UpdateTagVariables = {
  id: number;
  data: UpdateTagInput;
};

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTagVariables) =>
      TagService.update(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
}
