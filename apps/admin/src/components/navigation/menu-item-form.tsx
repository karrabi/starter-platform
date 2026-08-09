"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { CreateMenuItemRequest, MenuItem } from "@/types/navigation";

import {
  menuItemSchema,
  type MenuItemFormData,
} from "@/app/(dashboard)/navigation/[id]/items/schema";

type MenuItemFormProps = {
  items: MenuItem[];
  editingItem?: MenuItem | null;
  isSubmitting: boolean;
  onSubmit: (data: CreateMenuItemRequest) => Promise<void>;
  onCancelEdit?: () => void;
};

export function MenuItemForm({
  items,
  editingItem,
  isSubmitting,
  onSubmit,
  onCancelEdit,
}: MenuItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),

    defaultValues: editingItem
      ? {
          title: editingItem.title,
          url: editingItem.url,
          icon: editingItem.icon ?? "",
          parentId: editingItem.parentId,
          sortOrder: editingItem.sortOrder,
          target: editingItem.target,
          isVisible: editingItem.isVisible,
        }
      : {
          title: "",
          url: "",
          icon: "",
          parentId: null,
          sortOrder: 0,
          target: "_self",
          isVisible: true,
        },
  });

  async function submit(data: MenuItemFormData) {
    await onSubmit({
      title: data.title,
      url: data.url,
      icon: data.icon || null,
      parentId: data.parentId,
      sortOrder: data.sortOrder,
      target: data.target,
      isVisible: data.isVisible,
    });
  }

  const availableParents = items.filter(
    (item) => !editingItem || item.id !== editingItem.id,
  );

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <TextField
          label="Title"
          error={errors.title?.message}
          {...register("title")}
        />

        <TextField
          label="URL"
          error={errors.url?.message}
          {...register("url")}
        />

        <TextField
          label="Icon"
          error={errors.icon?.message}
          {...register("icon")}
        />

        <SelectField
          label="Parent"
          error={errors.parentId?.message}
          options={[
            {
              label: "No parent",
              value: "",
            },
            ...availableParents.map((item) => ({
              label: item.title,
              value: String(item.id),
            })),
          ]}
          {...register("parentId", {
            setValueAs: (value) =>
              value === "" || value == null ? null : Number(value),
          })}
        />

        <TextField
          label="Sort Order"
          type="number"
          error={errors.sortOrder?.message}
          {...register("sortOrder", {
            valueAsNumber: true,
          })}
        />

        <SelectField
          label="Target"
          error={errors.target?.message}
          options={[
            {
              label: "Same window",
              value: "_self",
            },
            {
              label: "New window",
              value: "_blank",
            },
          ]}
          {...register("target")}
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isVisible")} />

          <span className="text-sm">Visible</span>
        </label>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : editingItem
                ? "Update Item"
                : "Add Item"}
          </Button>

          {editingItem && onCancelEdit && (
            <Button
              type="button"
              className="bg-gray-600 hover:bg-gray-700"
              onClick={onCancelEdit}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
