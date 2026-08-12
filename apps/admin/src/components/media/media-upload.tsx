"use client";

import { ChangeEvent, useRef } from "react";

import { useUploadMedia } from "@/hooks/use-upload-media";

type MediaUploadProps = {
  onUploaded(): void;
};

export function MediaUpload({ onUploaded }: MediaUploadProps) {
  const uploadMutation = useUploadMedia();

  const inputRef = useRef<HTMLInputElement>(null);

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
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploadMutation.isPending}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {uploadMutation.isPending ? "Uploading..." : "Upload file"}
      </button>

      {uploadMutation.isError && (
        <p className="mt-2 text-sm text-red-600">File upload failed.</p>
      )}
    </div>
  );
}
