"use client";

import { ChangeEvent } from "react";

import { useUploadMedia } from "@/hooks/use-upload-media";

type MediaUploadProps = {
  onUploaded(): void;
};

export function MediaUpload({ onUploaded }: MediaUploadProps) {
  const uploadMutation = useUploadMedia();

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await uploadMutation.mutateAsync(file);

    onUploaded();

    event.target.value = "";
  }

  return (
    <div className="mb-6">
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
}
