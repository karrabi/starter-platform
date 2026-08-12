"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { routes } from "@/config/routes";
import { useCurrentUser } from "@/hooks/use-current-user";
import { tokenStorage } from "@/lib/auth/token";

type Props = {
  children: ReactNode;
};

const ADMIN_ROLES = ["Admin", "Editor", "Author"];

export function DashboardGuard({ children }: Props) {
  const router = useRouter();

  const token = tokenStorage.get();

  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (!token) {
      router.replace(routes.login);
      return;
    }

    if (isError) {
      tokenStorage.remove();
      router.replace(routes.login);
      return;
    }

    if (user && !ADMIN_ROLES.includes(user.role)) {
      tokenStorage.remove();
      router.replace(routes.login);
    }
  }, [token, user, isError, router]);

  if (
    !token ||
    isLoading ||
    isError ||
    !user ||
    !ADMIN_ROLES.includes(user.role)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
