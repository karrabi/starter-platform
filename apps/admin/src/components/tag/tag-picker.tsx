"use client";

import { useTags } from "@/hooks/use-tags";

type TagPickerProps = {
  value: number[];
  onChange(ids: number[]): void;
  type: "PRODUCT" | "BLOG";
};

export function TagPicker({ value, onChange, type }: TagPickerProps) {
  const { data: tags = [], isLoading } = useTags();

  function handleToggle(id: number) {
    if (value.includes(id)) {
      onChange(value.filter((tagId) => tagId !== id));
      return;
    }

    onChange([...value, id]);
  }

  if (isLoading) {
    return <div>Loading tags...</div>;
  }

  const filteredTags = tags.filter((tag) => tag.type === type && tag.isActive);

  if (filteredTags.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No {type.toLowerCase()} tags available.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filteredTags.map((tag) => {
        const selected = value.includes(tag.id);

        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => handleToggle(tag.id)}
            className={`rounded-full border px-3 py-1 text-sm ${
              selected
                ? "border-blue-600 bg-blue-50 font-medium"
                : "border-gray-300 bg-white"
            }`}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}
