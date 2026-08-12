"use client";

import { useParams, useRouter } from "next/navigation";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { PageHeader } from "@/components/layout/page-header";
import { PageForm } from "@/components/page/page-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { usePage } from "@/hooks/use-page";
import { useUpdatePage } from "@/hooks/use-update-page";

import { permissions } from "@/lib/auth/permissions";

import type { CreatePageRequest, UpdatePageRequest } from "@/types/page";

export default function EditPagePage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const { data: page, isLoading } = usePage(id);

  const updateMutation = useUpdatePage();

  async function handleUpdate(data: CreatePageRequest) {
    const updateData: UpdatePageRequest = data;

    await updateMutation.mutateAsync({
      id,
      data: updateData,
    });

    router.push(routes.pages);
  }

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!page) {
    return <PageContainer>Page not found.</PageContainer>;
  }

  const content =
    page.content &&
    typeof page.content === "object" &&
    typeof page.content.body === "string"
      ? page.content.body
      : "";

  const seo = page.seo && typeof page.seo === "object" ? page.seo : {};

  const seoTitle = typeof seo.title === "string" ? seo.title : "";

  const seoDescription =
    typeof seo.description === "string" ? seo.description : "";

  const seoOgImageId = typeof seo.ogImageId === "number" ? seo.ogImageId : null;

  return (
    <PermissionGuard allowedRoles={permissions.pages.write}>
      <PageContainer>
        <PageHeader title="Edit Page" description="Update website page." />

        <PageForm
          mode="edit"
          isSubmitting={updateMutation.isPending}
          onSubmit={handleUpdate}
          initialValues={{
            title: page.title,
            slug: page.slug,
            content,
            status: page.status,
            seoTitle,
            seoDescription,
            seoOgImageId,
          }}
        />
      </PageContainer>
    </PermissionGuard>
  );
}
