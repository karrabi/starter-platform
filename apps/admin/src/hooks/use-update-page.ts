"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PageService } from "@/services/page.service";

import type { UpdatePageRequest } from "@/types/page";

type UpdatePageVariables = {
  id: number;
  data: UpdatePageRequest;
};

export function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePageVariables) =>
      PageService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["pages", variables.id],
      });
    },
  });
}
