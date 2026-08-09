"use client";

import { useCategories } from "@/hooks/use-categories";

type CategoryPickerProps = {
  value: number[];
  onChange(ids: number[]): void;
};

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
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

  const productCategories = categories.filter(
    (category) => category.type === "PRODUCT" && category.isActive,
  );

  if (productCategories.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No product categories available.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {productCategories.map((category) => (
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
