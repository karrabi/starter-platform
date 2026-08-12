"use client";

import { FormEvent, useState } from "react";

import { useCategories } from "@/hooks/use-categories";
import { useCreateCategory } from "@/hooks/use-create-category";
import { useDeleteCategory } from "@/hooks/use-delete-category";
import { useUpdateCategory } from "@/hooks/use-update-category";
import type { Category } from "@/services/category.service";

const CATEGORY_TYPES = ["PRODUCT", "BLOG"];

export default function CategoriesPage() {
  const { data: categories = [], isLoading, isError } = useCategories();

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [editing, setEditing] = useState<Category | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("PRODUCT");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [parentId, setParentId] = useState<number | null>(null);

  function resetForm() {
    setEditing(null);
    setName("");
    setSlug("");
    setType("PRODUCT");
    setDescription("");
    setSortOrder(0);
    setIsActive(true);
    setParentId(null);
  }

  function startEdit(category: Category) {
    setEditing(category);
    setName(category.name);
    setSlug(category.slug);
    setType(category.type);
    setDescription(category.description ?? "");
    setSortOrder(category.sortOrder);
    setIsActive(category.isActive);
    setParentId(category.parentId ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      name,
      slug,
      type,
      description: description.trim() || null,
      parentId,
      sortOrder,
      isActive,
    };

    if (editing) {
      await updateMutation.mutateAsync({
        id: editing.id,
        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }

    resetForm();
  }

  async function handleDelete(category: Category) {
    const confirmed = window.confirm(`Delete category "${category.name}"?`);

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(category.id);

    if (editing?.id === category.id) {
      resetForm();
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading categories...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-600">Failed to load categories.</div>;
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage product and blog categories.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-5">
        <h2 className="font-semibold">
          {editing ? "Edit category" : "Create category"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            required
            className="rounded-md border px-3 py-2"
          />

          <input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder="Slug"
            required
            className="rounded-md border px-3 py-2"
          />

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-md border px-3 py-2"
          >
            {CATEGORY_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={parentId ?? ""}
            onChange={(event) =>
              setParentId(
                event.target.value ? Number(event.target.value) : null,
              )
            }
            className="rounded-md border px-3 py-2"
          >
            <option value="">No parent</option>

            {categories
              .filter(
                (category) =>
                  category.type === type && category.id !== editing?.id,
              )
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <input
            type="number"
            value={sortOrder}
            onChange={(event) => setSortOrder(Number(event.target.value))}
            placeholder="Sort order"
            className="rounded-md border px-3 py-2"
          />
        </div>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          rows={3}
          className="w-full rounded-md border px-3 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
          />
          Active
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : editing
                ? "Update category"
                : "Create category"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Type</th>
              <th className="p-3">Parent</th>
              <th className="p-3">Order</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-3">{category.name}</td>

                <td className="p-3">{category.slug}</td>

                <td className="p-3">{category.type}</td>

                <td className="p-3">
                  {category.parentId
                    ? (categories.find((item) => item.id === category.parentId)
                        ?.name ?? "-")
                    : "-"}
                </td>

                <td className="p-3">{category.sortOrder}</td>

                <td className="p-3">
                  {category.isActive ? "Active" : "Inactive"}
                </td>

                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(category)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!categories.length && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
