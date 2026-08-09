"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PageService } from "@/services/page.service";

export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => PageService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
    },
  });
}
