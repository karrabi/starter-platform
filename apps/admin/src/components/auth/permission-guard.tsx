"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";

import { hasPermission } from "@/lib/auth/permissions";

type Props = {
  children: ReactNode;
  allowedRoles: readonly string[];
};

export function PermissionGuard({ children, allowedRoles }: Props) {
  const router = useRouter();

  const { data: user, isLoading } = useCurrentUser();

  const allowed = hasPermission(user?.role, allowedRoles);

  useEffect(() => {
    if (!isLoading && user && !allowed) {
      router.replace("/dashboard");
    }
  }, [allowed, isLoading, router, user]);

  if (isLoading || !user) {
    return <div className="p-8">Loading...</div>;
  }

  if (!allowed) {
    return <div className="p-8">Redirecting...</div>;
  }

  return children;
}
