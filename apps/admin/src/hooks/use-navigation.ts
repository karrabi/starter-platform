"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { NavigationService } from "@/services/navigation.service";

import type { CreateMenuRequest, UpdateMenuRequest } from "@/types/navigation";

export function useMenus() {
  return useQuery({
    queryKey: ["navigation", "menus"],

    queryFn: async () => {
      const response = await NavigationService.getMenus();

      return response.data.data;
    },
  });
}

export function useMenu(id: number) {
  return useQuery({
    queryKey: ["navigation", "menus", id],

    queryFn: async () => {
      const response = await NavigationService.getMenu(id);

      return response.data.data;
    },

    enabled: Number.isInteger(id) && id > 0,
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuRequest) => NavigationService.createMenu(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus"],
      });
    },
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMenuRequest }) =>
      NavigationService.updateMenu(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus"],
      });

      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", variables.id],
      });
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => NavigationService.deleteMenu(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus"],
      });
    },
  });
}
