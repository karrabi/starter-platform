"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { NavigationService } from "@/services/navigation.service";

import type {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "@/types/navigation";

export function useMenuItems(menuId: number) {
  return useQuery({
    queryKey: ["navigation", "menus", menuId, "items"],

    queryFn: async () => {
      const response = await NavigationService.getItems(menuId);

      return response.data.data;
    },

    enabled: Number.isInteger(menuId) && menuId > 0,
  });
}

export function useCreateMenuItem(menuId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuItemRequest) =>
      NavigationService.createItem(menuId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", menuId, "items"],
      });

      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", menuId],
      });
    },
  });
}

export function useUpdateMenuItem(menuId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMenuItemRequest }) =>
      NavigationService.updateItem(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", menuId, "items"],
      });

      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", menuId],
      });
    },
  });
}

export function useDeleteMenuItem(menuId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => NavigationService.deleteItem(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", menuId, "items"],
      });

      queryClient.invalidateQueries({
        queryKey: ["navigation", "menus", menuId],
      });
    },
  });
}
