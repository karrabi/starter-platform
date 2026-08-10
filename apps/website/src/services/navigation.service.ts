import { apiGet } from "@/lib/api";

import type { NavigationMenu } from "@/types/navigation";

export function getPublicNavigation(name: string) {
  return apiGet<NavigationMenu>(`/navigation/public/${name}`);
}
