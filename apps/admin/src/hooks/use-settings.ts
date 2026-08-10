"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { SettingsService } from "@/services/settings.service";

import type { SettingsGroup, SettingsMap } from "@/types/settings";

export function useSettings<K extends SettingsGroup>(group: K) {
  return useQuery({
    queryKey: ["settings", group],

    queryFn: async () => {
      const response = await SettingsService.getGroup(group);

      return response.data.data;
    },
  });
}

export function useUpdateSettings<K extends SettingsGroup>(group: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: SettingsMap[K]) =>
      SettingsService.updateGroup(group, value),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", group],
      });
    },
  });
}
