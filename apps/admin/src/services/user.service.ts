import { apiClient } from "@/lib/api/api-client";

import type { CreateUserRequest, UpdateUserRequest } from "@/types/user";

export class UserService {
  static getAll() {
    return apiClient.get("/users");
  }

  static getById(id: number) {
    return apiClient.get(`/users/${id}`);
  }

  static create(data: CreateUserRequest) {
    return apiClient.post("/users", data);
  }

  static update(id: number, data: UpdateUserRequest) {
    return apiClient.put(`/users/${id}`, data);
  }

  static delete(id: number) {
    return apiClient.delete(`/users/${id}`);
  }

  static getRoles() {
    return apiClient.get("/roles");
  }
}
