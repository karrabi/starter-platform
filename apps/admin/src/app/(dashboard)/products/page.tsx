"use client";

import Link from "next/link";

import { useProducts } from "@/hooks/use-products";

import { DataTable } from "@/components/tables/data-table";

import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { PageHeader } from "@/components/layout/page-header";

import { routes } from "@/config/routes";

import { Trash2 } from "lucide-react";

import { useDeleteProduct } from "@/hooks/use-delete-product";

export default function ProductsPage() {
  const { data = [], isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  async function handleDelete(id: number) {
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
          <Link href={routes.createProduct}>
            <Button>New Product</Button>
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
            render: (product) => (
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
            ),
          },
        ]}
      />
    </PageContainer>
  );
}
