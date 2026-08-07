"use client";

import type { Media } from "@/types/media";

import { MediaItem } from "./media-item";

type MediaGridProps = {
  items: Media[];
  selected: number[];
  onSelect(id: number): void;
};

export function MediaGrid({ items, selected, onSelect }: MediaGridProps) {
  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
        No media found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {items.map((media) => (
        <MediaItem
          key={media.id}
          media={media}
          selected={selected.includes(media.id)}
          onClick={() => onSelect(media.id)}
        />
      ))}
    </div>
  );
}
