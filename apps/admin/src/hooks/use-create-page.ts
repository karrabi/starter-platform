"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PageService } from "@/services/page.service";

import type { CreatePageRequest } from "@/types/page";

export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePageRequest) => PageService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });
    },
  });
}
