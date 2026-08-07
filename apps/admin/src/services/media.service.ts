import { apiClient } from "@/lib/api/api-client";

import type { MediaResponse } from "@/types/media";

export class MediaService {
  static upload(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    return apiClient.post<MediaResponse>("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static getAll() {
    return apiClient.get("/media");
  }
}
