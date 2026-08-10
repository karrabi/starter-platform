"use client";

import axios from "axios";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { MenuItemForm } from "@/components/navigation/menu-item-form";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { useMenu } from "@/hooks/use-navigation";

import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useMenuItems,
  useUpdateMenuItem,
} from "@/hooks/use-navigation-items";

import type { CreateMenuItemRequest, MenuItem } from "@/types/navigation";

export default function NavigationItemsPage() {
  const params = useParams();

  const menuId = Number(params.id);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { data: menu, isLoading: isMenuLoading } = useMenu(menuId);

  const { data: items = [], isLoading: areItemsLoading } = useMenuItems(menuId);

  const createMutation = useCreateMenuItem(menuId);

  const updateMutation = useUpdateMenuItem(menuId);

  const deleteMutation = useDeleteMenuItem(menuId);

  async function handleSubmit(data: CreateMenuItemRequest) {
    setFormError(null);

    try {
      if (editingItem) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          data,
        });

        setEditingItem(null);
        return;
      }

      await createMutation.mutateAsync(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (typeof message === "string") {
          setFormError(message);
          return;
        }
      }

      setFormError("An unexpected error occurred.");
    }
  }

  async function handleDelete(item: MenuItem) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(item.id);

    if (editingItem?.id === item.id) {
      setEditingItem(null);
    }
  }

  if (isMenuLoading || areItemsLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!menu) {
    return <PageContainer>Menu not found.</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader
        title={`${menu.name} Menu`}
        description="Manage navigation menu items."
      />

      <div className="space-y-6">
        {formError && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {formError}
          </div>
        )}
        <MenuItemForm
          key={
            editingItem ? `edit-${editingItem.id}` : `create-${items.length}`
          }
          items={items}
          editingItem={editingItem}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          onSubmit={handleSubmit}
          onCancelEdit={() => {
            setFormError(null);
            setEditingItem(null);
          }}
        />

        <DataTable
          rows={items}
          columns={[
            {
              key: "title",
              title: "Title",
            },
            {
              key: "url",
              title: "URL",
            },
            {
              key: "parent",
              title: "Parent",
              render: (item) => {
                if (!item.parentId) {
                  return "-";
                }

                const parent = items.find(
                  (candidate) => candidate.id === item.parentId,
                );

                return parent?.title ?? "-";
              },
            },
            {
              key: "sortOrder",
              title: "Order",
            },
            {
              key: "target",
              title: "Target",
            },
            {
              key: "isVisible",
              title: "Visible",
              render: (item) => (item.isVisible ? "Yes" : "No"),
            },
            {
              key: "actions",
              title: "Actions",
              render: (item) => (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setFormError(null);
                      setEditingItem(item);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </PageContainer>
  );
}
