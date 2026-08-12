"use client";

import { useState } from "react";

import { MediaUpload } from "@/components/media/media-upload";

import { config } from "@/config/config";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteMedia } from "@/hooks/use-delete-media";
import { useMedia } from "@/hooks/use-media";

import { hasPermission, permissions } from "@/lib/auth/permissions";

import type { Media } from "@/types/media";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const { data: media = [], isLoading, isError } = useMedia();

  const { data: user } = useCurrentUser();

  const deleteMutation = useDeleteMedia();

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const canUpload = hasPermission(user?.role, permissions.media.upload);

  const canDelete = hasPermission(user?.role, permissions.media.delete);

  async function handleDelete(item: Media) {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(`Delete "${item.originalName}"?`);

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(item.id);

    if (selectedMedia?.id === item.id) {
      setSelectedMedia(null);
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading media...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-600">Failed to load media.</div>;
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Media Library</h1>

        <p className="mt-1 text-sm text-gray-500">
          Upload and manage files used across the website.
        </p>
      </div>

      {canUpload && <MediaUpload onUploaded={() => {}} />}

      {!media.length ? (
        <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">
          No media found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => {
            const fileUrl = item.path.startsWith("http")
              ? item.path
              : `${config.mediaBaseUrl}${item.path}`;

            const isImage = item.mimeType.startsWith("image/");

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border bg-white"
              >
                <button
                  type="button"
                  onClick={() => setSelectedMedia(item)}
                  className="flex h-40 w-full items-center justify-center bg-gray-100"
                >
                  {isImage ? (
                    <img
                      src={fileUrl}
                      alt={item.originalName}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="px-4 text-center text-sm text-gray-500">
                      {item.extension.toUpperCase()}
                    </span>
                  )}
                </button>

                <div className="space-y-1 p-3">
                  <p
                    className="truncate text-sm font-medium"
                    title={item.originalName}
                  >
                    {item.originalName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {formatFileSize(item.size)}
                  </p>

                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      disabled={deleteMutation.isPending}
                      className="mt-2 text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedMedia && (
        <div className="rounded-lg border p-5">
          <h2 className="text-lg font-semibold">File information</h2>

          <dl className="mt-4 grid gap-2 text-sm">
            <div>
              <dt className="font-medium">Name</dt>

              <dd className="text-gray-600">{selectedMedia.originalName}</dd>
            </div>

            <div>
              <dt className="font-medium">Type</dt>

              <dd className="text-gray-600">{selectedMedia.mimeType}</dd>
            </div>

            <div>
              <dt className="font-medium">Size</dt>

              <dd className="text-gray-600">
                {formatFileSize(selectedMedia.size)}
              </dd>
            </div>

            <div>
              <dt className="font-medium">Path</dt>

              <dd className="break-all text-gray-600">{selectedMedia.path}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
