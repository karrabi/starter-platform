"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Media } from "@/types/media";

type Props = {
  item: Media;
  index: number;
};

export function SortableMediaItem({ item, index }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-28 rounded-lg border bg-white p-2"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "")}${item.path}`}
        alt={item.originalName}
        className="h-20 w-full rounded object-contain"
      />

      <div className="mt-2 text-center text-xs">
        {index === 0 ? (
          <span className="font-medium">Featured</span>
        ) : (
          <span>#{index + 1}</span>
        )}
      </div>

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="mt-2 w-full cursor-grab rounded border px-2 py-1 text-xs active:cursor-grabbing"
      >
        Drag
      </button>
    </div>
  );
}
