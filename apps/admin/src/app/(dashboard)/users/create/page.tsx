"use client";

import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { UserForm } from "@/components/user/user-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useCreateUser, useRoles } from "@/hooks/use-users";

import type { CreateUserRequest, UpdateUserRequest } from "@/types/user";

export default function CreateUserPage() {
  const router = useRouter();

  const { data: roles = [], isLoading: rolesLoading } = useRoles();

  const createMutation = useCreateUser();

  async function handleSubmit(data: CreateUserRequest | UpdateUserRequest) {
    await createMutation.mutateAsync(data as CreateUserRequest);

    router.push(routes.users);
  }

  if (rolesLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Create User"
        description="Create a new administrator user."
      />

      <UserForm
        mode="create"
        roles={roles}
        isSubmitting={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
}
