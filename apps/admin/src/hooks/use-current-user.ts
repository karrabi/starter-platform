"use client";

import { useQuery } from "@tanstack/react-query";

import { AuthService } from "@/services/auth.service";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],

    queryFn: async () => {
      const response = await AuthService.me();

      return response.data.data;
    },

    retry: false,
  });
}
