"use client";

import { useParams, useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { MenuForm } from "@/components/navigation/menu-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useMenu, useUpdateMenu } from "@/hooks/use-navigation";

import type { CreateMenuRequest } from "@/types/navigation";

export default function EditNavigationPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const { data: menu, isLoading } = useMenu(id);

  const updateMutation = useUpdateMenu();

  async function handleUpdate(data: CreateMenuRequest) {
    await updateMutation.mutateAsync({
      id,
      data,
    });

    router.push(routes.navigation);
  }

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!menu) {
    return <PageContainer>Menu not found.</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader title="Edit Menu" description="Update navigation menu." />

      <MenuForm
        mode="edit"
        isSubmitting={updateMutation.isPending}
        onSubmit={handleUpdate}
        initialValues={{
          name: menu.name,
          description: menu.description ?? "",
        }}
      />
    </PageContainer>
  );
}
