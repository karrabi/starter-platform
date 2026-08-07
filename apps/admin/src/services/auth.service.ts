import { apiClient } from "@/lib/api/api-client";

import type { LoginRequest, LoginResponse } from "@/types/auth";

export class AuthService {
  static login(data: LoginRequest) {
    return apiClient.post<LoginResponse>("/auth/login", data);
  }
}
