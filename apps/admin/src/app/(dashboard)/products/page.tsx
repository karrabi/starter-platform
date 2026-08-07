import Link from "next/link";

import { DataTable } from "@/components/tables/data-table";

import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/layout/page-header";

type Product = {
  id: number;
  name: string;
  slug: string;
};

const rows: Product[] = [];

export default function ProductsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Products"
        description="Manage all products."
        actions={
          <Link href="/products/create">
            <Button>New Product</Button>
          </Link>
        }
      />

      <DataTable
        rows={rows}
        columns={[
          {
            key: "name",
            title: "Name",
          },
          {
            key: "slug",
            title: "Slug",
          },
        ]}
      />
    </PageContainer>
  );
}
