"use client";

import { useParams, useRouter } from "next/navigation";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { PageHeader } from "@/components/layout/page-header";
import { ProductForm } from "@/components/product/product-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useProduct } from "@/hooks/use-product";
import { useUpdateProduct } from "@/hooks/use-update-product";

import { permissions } from "@/lib/auth/permissions";

import type { CreateProductRequest } from "@/types/product";

export default function EditProductPage() {
  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);

  const { data: product, isLoading } = useProduct(id);

  const updateMutation = useUpdateProduct();

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!product) {
    return <PageContainer>Product not found.</PageContainer>;
  }

  async function handleUpdate(data: CreateProductRequest) {
    await updateMutation.mutateAsync({
      id,
      data,
    });

    router.push(routes.products);
  }

  const seo = product.seo && typeof product.seo === "object" ? product.seo : {};

  const seoTitle = typeof seo.title === "string" ? seo.title : "";

  const seoDescription =
    typeof seo.description === "string" ? seo.description : "";

  const seoOgImageId = typeof seo.ogImageId === "number" ? seo.ogImageId : null;

  return (
    <PermissionGuard allowedRoles={permissions.products.write}>
      <PageContainer>
        <PageHeader
          title="Edit Product"
          description="Update product information."
        />

        <ProductForm
          mode="edit"
          isSubmitting={updateMutation.isPending}
          initialValues={{
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription ?? "",
            description:
              typeof product.description === "object"
                ? ((product.description as any).body ?? "")
                : "",
            status: product.status,
            featured: product.featured,

            gallery: Array.isArray(product.media)
              ? product.media
                  .slice()
                  .sort((a, b) => a.position - b.position)
                  .map((item) => item.mediaId)
              : [],

            categoryIds: Array.isArray(product.categories)
              ? product.categories.map((item) => item.categoryId)
              : [],

            tagIds: Array.isArray(product.tags)
              ? product.tags.map((item) => item.tagId)
              : [],

            seoTitle,
            seoDescription,
            seoOgImageId,
          }}
          onSubmit={handleUpdate}
        />
      </PageContainer>
    </PermissionGuard>
  );
}
