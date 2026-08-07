"use client";

import { useMutation } from "@tanstack/react-query";

import { tokenStorage } from "@/lib/auth/token";
import { AuthService } from "@/services/auth.service";

import type { LoginRequest, LoginResponse } from "@/types/auth";

import type { AxiosResponse } from "axios";

export function useLogin() {
  return useMutation<AxiosResponse<LoginResponse>, Error, LoginRequest>({
    mutationFn: AuthService.login,

    onSuccess(response) {
      tokenStorage.set(response.data.token);
    },
  });
}
