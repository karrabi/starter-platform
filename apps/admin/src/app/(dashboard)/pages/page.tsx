"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { usePages } from "@/hooks/use-pages";
import { useDeletePage } from "@/hooks/use-delete-page";

import { DataTable } from "@/components/tables/data-table";

import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { PageHeader } from "@/components/layout/page-header";

import { routes } from "@/config/routes";

export default function PagesPage() {
  const { data = [], isLoading } = usePages();
  const deleteMutation = useDeletePage();

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this page?",
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(id);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Pages"
        description="Manage website pages."
        actions={
          <Link href={routes.createPage}>
            <Button>New Page</Button>
          </Link>
        }
      />

      <DataTable
        rows={data}
        columns={[
          {
            key: "title",
            title: "Title",
          },
          {
            key: "slug",
            title: "Slug",
          },
          {
            key: "status",
            title: "Status",
          },
          {
            key: "updatedAt",
            title: "Updated",
            render: (page) => new Date(page.updatedAt).toLocaleDateString(),
          },
          {
            key: "actions",
            title: "Actions",
            render: (page) => (
              <div className="flex gap-2">
                <Link href={routes.editPage(page.id)}>
                  <Button>Edit</Button>
                </Link>

                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(page.id)}
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
