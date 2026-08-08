"use client";

import { useRouter, useParams } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { ProductForm } from "@/components/product/product-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useProduct } from "@/hooks/use-product";
import { useUpdateProduct } from "@/hooks/use-update-product";

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

  return (
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
        }}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
}
