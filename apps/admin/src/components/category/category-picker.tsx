"use client";

import { useCategories } from "@/hooks/use-categories";

type CategoryPickerProps = {
  value: number[];
  onChange(ids: number[]): void;
  type: "PRODUCT" | "BLOG";
};

export function CategoryPicker({ value, onChange, type }: CategoryPickerProps) {
  const { data: categories = [], isLoading } = useCategories();

  function handleToggle(id: number) {
    if (value.includes(id)) {
      onChange(value.filter((categoryId) => categoryId !== id));
      return;
    }

    onChange([...value, id]);
  }

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  const filteredCategories = categories.filter(
    (category) => category.type === type && category.isActive,
  );

  if (filteredCategories.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No {type.toLowerCase()} categories available.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredCategories.map((category) => (
        <label
          key={category.id}
          className="flex cursor-pointer items-center gap-2"
        >
          <input
            type="checkbox"
            checked={value.includes(category.id)}
            onChange={() => handleToggle(category.id)}
          />

          <span>{category.name}</span>
        </label>
      ))}
    </div>
  );
}
