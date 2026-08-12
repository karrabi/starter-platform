"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { DataTable } from "@/components/tables/data-table";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useProducts } from "@/hooks/use-products";

import { hasPermission, permissions } from "@/lib/auth/permissions";

export default function ProductsPage() {
  const { data = [], isLoading } = useProducts();
  const { data: user } = useCurrentUser();

  const deleteMutation = useDeleteProduct();

  const canWrite = hasPermission(user?.role, permissions.products.write);

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  async function handleDelete(id: number) {
    if (!canWrite) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(id);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Products"
        description="Manage all products."
        actions={
          canWrite ? (
            <Link href={routes.createProduct}>
              <Button>New Product</Button>
            </Link>
          ) : undefined
        }
      />

      <DataTable
        rows={data}
        columns={[
          {
            key: "image",
            title: "Image",
            render: (product) => {
              const featuredMedia =
                product.media?.find((item) => item.featured) ??
                product.media?.[0];

              if (!featuredMedia?.media?.path) {
                return (
                  <div className="h-14 w-14 rounded-lg border bg-gray-100" />
                );
              }

              return (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace(
                    /\/api$/,
                    "",
                  )}${featuredMedia.media.path}`}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg border object-contain"
                />
              );
            },
          },
          {
            key: "name",
            title: "Name",
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
            key: "actions",
            title: "Actions",
            render: (product) => {
              if (!canWrite) {
                return <span className="text-sm text-gray-400">Read only</span>;
              }

              return (
                <div className="flex gap-2">
                  <Link href={`/products/${product.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>

                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(product.id)}
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
