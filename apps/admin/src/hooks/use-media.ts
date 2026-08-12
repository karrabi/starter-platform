"use client";

import { useQuery } from "@tanstack/react-query";

import { MediaService } from "@/services/media.service";
import type { Media } from "@/types/media";

type MediaApiResponse = {
  success: boolean;
  message: string;
  data: Media[];
};

export function useMedia() {
  return useQuery({
    queryKey: ["media"],

    queryFn: async () => {
      const response = await MediaService.getAll();

      return (response.data as MediaApiResponse).data;
    },
  });
}
