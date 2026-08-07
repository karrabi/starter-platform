"use client";

import { Check } from "lucide-react";

import { config } from "@/config/config";
import type { Media } from "@/types/media";

type MediaItemProps = {
  media: Media;
  selected: boolean;
  onClick(): void;
  fit?: "contain" | "cover";
};

export function MediaItem({
  media,
  selected,
  onClick,
  fit = "contain",
}: MediaItemProps) {
  const imageUrl = media.path.startsWith("http")
    ? media.path
    : `${config.mediaBaseUrl}${media.path}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg border-2 transition ${
        selected ? "border-blue-600" : "border-gray-300"
      }`}
    >
      <div className="flex h-36 w-full items-center justify-center bg-gray-100">
        <img
          src={imageUrl}
          alt={media.originalName}
          className={
            fit === "cover"
              ? "h-full w-full object-cover"
              : "max-h-full max-w-full object-contain"
          }
        />
      </div>

      {selected && (
        <div className="absolute right-2 top-2 rounded-full bg-blue-600 p-1 text-white">
          <Check className="h-4 w-4" />
        </div>
      )}
    </button>
  );
}
