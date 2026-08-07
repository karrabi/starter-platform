"use client";

import { useMutation } from "@tanstack/react-query";

import { MediaService } from "@/services/media.service";

export function useUploadMedia() {
  return useMutation({
    mutationFn: (file: File) => MediaService.upload(file),
  });
}
