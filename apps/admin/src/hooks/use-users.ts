"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UserService } from "@/services/user.service";

import type { CreateUserRequest, UpdateUserRequest } from "@/types/user";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const response = await UserService.getAll();

      return response.data.data;
    },
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],

    queryFn: async () => {
      const response = await UserService.getById(id);

      return response.data.data;
    },

    enabled: Number.isInteger(id) && id > 0,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],

    queryFn: async () => {
      const response = await UserService.getRoles();

      return response.data.data;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => UserService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      UserService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users", variables.id],
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UserService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
