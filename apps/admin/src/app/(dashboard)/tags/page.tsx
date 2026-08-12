"use client";

import { FormEvent, useState } from "react";

import { useCreateTag } from "@/hooks/use-create-tag";
import { useDeleteTag } from "@/hooks/use-delete-tag";
import { useTags } from "@/hooks/use-tags";
import { useUpdateTag } from "@/hooks/use-update-tag";
import type { Tag } from "@/services/tag.service";

const TAG_TYPES = ["PRODUCT", "BLOG"];

export default function TagsPage() {
  const { data: tags = [], isLoading, isError } = useTags();

  const createMutation = useCreateTag();
  const updateMutation = useUpdateTag();
  const deleteMutation = useDeleteTag();

  const [editing, setEditing] = useState<Tag | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("PRODUCT");
  const [isActive, setIsActive] = useState(true);

  function resetForm() {
    setEditing(null);
    setName("");
    setSlug("");
    setType("PRODUCT");
    setIsActive(true);
  }

  function startEdit(tag: Tag) {
    setEditing(tag);
    setName(tag.name);
    setSlug(tag.slug);
    setType(tag.type);
    setIsActive(tag.isActive);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      name,
      slug,
      type,
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

  async function handleDelete(tag: Tag) {
    const confirmed = window.confirm(`Delete tag "${tag.name}"?`);

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(tag.id);

    if (editing?.id === tag.id) {
      resetForm();
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading tags...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-600">Failed to load tags.</div>;
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Tags</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage product and blog tags.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-5">
        <h2 className="font-semibold">{editing ? "Edit tag" : "Create tag"}</h2>

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
            {TAG_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
            />
            Active
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isSaving ? "Saving..." : editing ? "Update tag" : "Create tag"}
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
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-t">
                <td className="p-3">{tag.name}</td>

                <td className="p-3">{tag.slug}</td>

                <td className="p-3">{tag.type}</td>

                <td className="p-3">{tag.isActive ? "Active" : "Inactive"}</td>

                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(tag)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(tag)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!tags.length && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No tags found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
