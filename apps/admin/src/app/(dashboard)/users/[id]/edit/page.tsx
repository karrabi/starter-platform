"use client";

import { useParams, useRouter } from "next/navigation";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { PageHeader } from "@/components/layout/page-header";
import { UserForm } from "@/components/user/user-form";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useRoles, useUpdateUser, useUser } from "@/hooks/use-users";

import { permissions } from "@/lib/auth/permissions";

import type { CreateUserRequest, UpdateUserRequest } from "@/types/user";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const { data: user, isLoading: userLoading } = useUser(id);

  const { data: roles = [], isLoading: rolesLoading } = useRoles();

  const updateMutation = useUpdateUser();

  async function handleSubmit(data: CreateUserRequest | UpdateUserRequest) {
    await updateMutation.mutateAsync({
      id,
      data: data as UpdateUserRequest,
    });

    router.push(routes.users);
  }

  if (userLoading || rolesLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!user) {
    return <PageContainer>User not found.</PageContainer>;
  }

  return (
    <PermissionGuard allowedRoles={permissions.users.write}>
      <PageContainer>
        <PageHeader
          title="Edit User"
          description={`Edit ${user.firstName} ${user.lastName}.`}
        />

        <UserForm
          key={user.id}
          mode="edit"
          roles={roles}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: "",
            roleId: user.roleId,
            isActive: user.isActive,
          }}
          isSubmitting={updateMutation.isPending}
          onSubmit={handleSubmit}
        />
      </PageContainer>
    </PermissionGuard>
  );
}
