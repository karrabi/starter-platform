"use client";

import { useRouter } from "next/navigation";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { PageHeader } from "@/components/layout/page-header";
import { PageForm } from "@/components/page/page-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useCreatePage } from "@/hooks/use-create-page";

import { permissions } from "@/lib/auth/permissions";

import type { CreatePageRequest } from "@/types/page";

export default function CreatePagePage() {
  const router = useRouter();

  const createMutation = useCreatePage();

  async function handleCreate(data: CreatePageRequest) {
    await createMutation.mutateAsync(data);

    router.push(routes.pages);
  }

  return (
    <PermissionGuard allowedRoles={permissions.pages.write}>
      <PageContainer>
        <PageHeader
          title="Create Page"
          description="Create a new website page."
        />

        <PageForm
          mode="create"
          isSubmitting={createMutation.isPending}
          onSubmit={handleCreate}
        />
      </PageContainer>
    </PermissionGuard>
  );
}
