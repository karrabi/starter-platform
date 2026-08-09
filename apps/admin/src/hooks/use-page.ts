"use client";

import { useQuery } from "@tanstack/react-query";

import { PageService } from "@/services/page.service";

export function usePage(id: number) {
  return useQuery({
    queryKey: ["pages", id],

    queryFn: async () => {
      const response = await PageService.getById(id);

      return response.data.data;
    },

    enabled: Number.isInteger(id) && id > 0,
  });
}
