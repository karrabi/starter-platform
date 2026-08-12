"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { routes } from "@/config/routes";
import { useCurrentUser } from "@/hooks/use-current-user";
import { tokenStorage } from "@/lib/auth/token";

export function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useCurrentUser();

  function handleLogout() {
    tokenStorage.remove();
    queryClient.clear();

    router.replace(routes.login);
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold">Administration Panel</h1>

      <div className="flex items-center gap-4">
        {!isLoading && user && (
          <div className="text-right">
            <div className="text-sm font-medium">{user.email}</div>

            <div className="text-xs text-gray-500">{user.role}</div>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
