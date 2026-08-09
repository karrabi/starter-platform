"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { MenuForm } from "@/components/navigation/menu-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useCreateMenu } from "@/hooks/use-navigation";

import type { CreateMenuRequest } from "@/types/navigation";

export default function CreateNavigationPage() {
  const router = useRouter();
  const createMutation = useCreateMenu();

  async function handleCreate(data: CreateMenuRequest) {
    await createMutation.mutateAsync(data);

    router.push(routes.navigation);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Create Menu"
        description="Create a new navigation menu."
      />

      <MenuForm
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={handleCreate}
      />
    </PageContainer>
  );
}
