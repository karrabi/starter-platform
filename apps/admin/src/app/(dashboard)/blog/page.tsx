"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useBlogs } from "@/hooks/use-blogs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteBlog } from "@/hooks/use-delete-blog";

import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/layout/page-header";

import { routes } from "@/config/routes";

import { hasPermission, permissions } from "@/lib/auth/permissions";

export default function BlogsPage() {
  const { data = [], isLoading } = useBlogs();
  const { data: user } = useCurrentUser();

  const deleteMutation = useDeleteBlog();

  const canWrite = hasPermission(user?.role, permissions.blog.write);

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  async function handleDelete(id: number) {
    if (!canWrite) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(id);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Blog"
        description="Manage all blog posts."
        actions={
          canWrite ? (
            <Link href={routes.createBlog}>
              <Button>New Blog</Button>
            </Link>
          ) : undefined
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
            key: "publishedAt",
            title: "Published",
            render: (blog) =>
              blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString()
                : "-",
          },
          {
            key: "updatedAt",
            title: "Updated",
            render: (blog) => new Date(blog.updatedAt).toLocaleDateString(),
          },
          {
            key: "actions",
            title: "Actions",
            render: (blog) => {
              if (!canWrite) {
                return <span className="text-sm text-gray-400">Read only</span>;
              }

              return (
                <div className="flex gap-2">
                  <Link href={routes.editBlog(blog.id)}>
                    <Button>Edit</Button>
                  </Link>

                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}
