"use client";

import { useEffect, useState } from "react";

import { MediaGrid } from "./media-grid";
import { MediaUpload } from "./media-upload";

import { MediaService } from "@/services/media.service";

import type { Media } from "@/types/media";

type MediaPickerProps = {
  value: number[];
  onChange(ids: number[]): void;
  multiple?: boolean;
};

export function MediaPicker({
  value,
  onChange,
  multiple = false,
}: MediaPickerProps) {
  const [items, setItems] = useState<Media[]>([]);

  const [loading, setLoading] = useState(false);

  async function loadMedia() {
    setLoading(true);

    const response = await MediaService.getAll();

    setItems(response.data.data);

    setLoading(false);
  }

  useEffect(() => {
    loadMedia();
  }, []);
  function handleSelect(id: number) {
    if (!multiple) {
      onChange([id]);
      return;
    }

    if (value.includes(id)) {
      onChange(value.filter((x) => x !== id));

      return;
    }

    onChange([...value, id]);
  }

  return (
    <div className="space-y-4">
      <MediaUpload onUploaded={loadMedia} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MediaGrid items={items} selected={value} onSelect={handleSelect} />
      )}
    </div>
  );
}
