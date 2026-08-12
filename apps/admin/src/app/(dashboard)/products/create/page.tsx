"use client";

import { useRouter } from "next/navigation";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { PageHeader } from "@/components/layout/page-header";
import { ProductForm } from "@/components/product/product-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useCreateProduct } from "@/hooks/use-create-product";

import { permissions } from "@/lib/auth/permissions";

import type { CreateProductRequest } from "@/types/product";

export default function CreateProductPage() {
  const router = useRouter();

  const createMutation = useCreateProduct();

  async function handleCreate(data: CreateProductRequest) {
    await createMutation.mutateAsync(data);

    router.push(routes.products);
  }

  return (
    <PermissionGuard allowedRoles={permissions.products.write}>
      <PageContainer>
        <PageHeader
          title="Create Product"
          description="Create a new product."
        />

        <ProductForm
          mode="create"
          isSubmitting={createMutation.isPending}
          onSubmit={handleCreate}
        />
      </PageContainer>
    </PermissionGuard>
  );
}
