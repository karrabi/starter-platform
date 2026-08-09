"use client";

import Link from "next/link";
import { List, Trash2 } from "lucide-react";

import { useDeleteMenu, useMenus } from "@/hooks/use-navigation";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

export default function NavigationPage() {
  const { data = [], isLoading } = useMenus();
  const deleteMutation = useDeleteMenu();

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu?",
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(id);
  }

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Navigation"
        description="Manage website navigation menus."
        actions={
          <Link href={routes.createNavigation}>
            <Button>New Menu</Button>
          </Link>
        }
      />

      <DataTable
        rows={data}
        columns={[
          {
            key: "name",
            title: "Name",
          },
          {
            key: "description",
            title: "Description",
            render: (menu) => menu.description || "-",
          },
          {
            key: "items",
            title: "Items",
            render: (menu) => menu.items?.length ?? 0,
          },
          {
            key: "actions",
            title: "Actions",
            render: (menu) => (
              <div className="flex gap-2">
                <Link href={routes.navigationItems(menu.id)}>
                  <Button>
                    <List className="mr-2 h-4 w-4" />
                    Items
                  </Button>
                </Link>

                <Link href={routes.editNavigation(menu.id)}>
                  <Button>Edit</Button>
                </Link>

                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(menu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ),
          },
        ]}
      />
    </PageContainer>
  );
}
