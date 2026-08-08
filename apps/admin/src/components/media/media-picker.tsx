"use client";

import { useEffect, useState } from "react";

import { MediaGrid } from "./media-grid";
import { MediaUpload } from "./media-upload";

import { MediaService } from "@/services/media.service";

import type { Media } from "@/types/media";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { SortableMediaItem } from "./sortable-media-item";

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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = value.indexOf(Number(active.id));
    const newIndex = value.indexOf(Number(over.id));

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    onChange(arrayMove(value, oldIndex, newIndex));
  }
  const selectedItems = value
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is Media => Boolean(item));

  return (
    <div className="space-y-4">
      {selectedItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Selected images</div>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={value}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex flex-wrap gap-3">
                {selectedItems.map((item, index) => (
                  <SortableMediaItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      <MediaUpload onUploaded={loadMedia} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MediaGrid items={items} selected={value} onSelect={handleSelect} />
      )}
    </div>
  );
}
