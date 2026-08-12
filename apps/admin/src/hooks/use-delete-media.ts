"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MediaService } from "@/services/media.service";

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => MediaService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["media"],
      });
    },
  });
}
