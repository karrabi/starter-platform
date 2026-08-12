"use client";

import axios from "axios";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

import { routes } from "@/config/routes";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteUser, useUsers } from "@/hooks/use-users";

import { hasPermission, permissions } from "@/lib/auth/permissions";

import type { User } from "@/types/user";

import { PermissionGuard } from "@/components/auth/permission-guard";

export default function UsersPage() {
  const { data: users = [], isLoading } = useUsers();

  const { data: currentUser } = useCurrentUser();

  const deleteMutation = useDeleteUser();

  const [error, setError] = useState<string | null>(null);

  const canWrite = hasPermission(currentUser?.role, permissions.users.write);

  async function handleDelete(user: User) {
    if (!canWrite) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.firstName} ${user.lastName}"?`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteMutation.mutateAsync(user.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (typeof message === "string") {
          setError(message);
          return;
        }
      }

      setError("An unexpected error occurred.");
    }
  }

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PermissionGuard allowedRoles={permissions.users.read}>
      <PageContainer>
        <PageHeader
          title="Users"
          description="Manage administrator users and their roles."
          actions={
            canWrite ? (
              <Link href={routes.createUser}>
                <Button>New User</Button>
              </Link>
            ) : undefined
          }
        />

        <div className="space-y-6">
          {error && (
            <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <DataTable<User>
            rows={users}
            columns={[
              {
                key: "name",
                title: "Name",
                render: (user) => `${user.firstName} ${user.lastName}`,
              },
              {
                key: "email",
                title: "Email",
              },
              {
                key: "role",
                title: "Role",
                render: (user) => user.role?.name ?? "-",
              },
              {
                key: "isActive",
                title: "Status",
                render: (user) => (user.isActive ? "Active" : "Inactive"),
              },
              {
                key: "createdAt",
                title: "Created",
                render: (user) => new Date(user.createdAt).toLocaleDateString(),
              },
              {
                key: "actions",
                title: "Actions",
                render: (user) => {
                  if (!canWrite) {
                    return (
                      <span className="text-sm text-gray-400">No access</span>
                    );
                  }

                  return (
                    <div className="flex gap-2">
                      <Link href={routes.editUser(user.id)}>
                        <Button type="button">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        type="button"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={deleteMutation.isPending}
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </PageContainer>
    </PermissionGuard>
  );
}
