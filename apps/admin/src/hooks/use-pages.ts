"use client";

import { useQuery } from "@tanstack/react-query";

import { PageService } from "@/services/page.service";

export function usePages() {
  return useQuery({
    queryKey: ["pages"],

    queryFn: async () => {
      const response = await PageService.getAll();

      return response.data.data;
    },
  });
}
