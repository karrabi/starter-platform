import axios from "axios";

import { config } from "@/config/config";
import { tokenStorage } from "@/lib/auth/token";

export const apiClient = axios.create({
  baseURL: config.apiUrl,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((requestConfig) => {
  const token = tokenStorage.get();

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
});
