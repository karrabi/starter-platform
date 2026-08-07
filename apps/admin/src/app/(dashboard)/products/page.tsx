"use client";

import Link from "next/link";

import { useProducts } from "@/hooks/use-products";

import { DataTable } from "@/components/tables/data-table";

import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { PageHeader } from "@/components/layout/page-header";

import { routes } from "@/config/routes";

export default function ProductsPage() {
  const { data = [], isLoading } = useProducts();

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
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
        ]}
      />
    </PageContainer>
  );
}
