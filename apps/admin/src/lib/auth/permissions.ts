export type AdminRole = "Admin" | "Editor" | "Author";

export const permissions = {
  pages: {
    read: ["Admin", "Editor", "Author"],
    write: ["Admin", "Editor"],
  },

  products: {
    read: ["Admin", "Editor", "Author"],
    write: ["Admin", "Editor"],
  },

  blog: {
    read: ["Admin", "Editor", "Author"],
    write: ["Admin", "Editor", "Author"],
  },

  categories: {
    read: ["Admin", "Editor", "Author"],
    write: ["Admin", "Editor"],
  },

  tags: {
    read: ["Admin", "Editor", "Author"],
    write: ["Admin", "Editor"],
  },

  media: {
    read: ["Admin", "Editor", "Author"],
    upload: ["Admin", "Editor", "Author"],
    delete: ["Admin", "Editor"],
  },

  navigation: {
    read: ["Admin", "Editor", "Author"],
    write: ["Admin", "Editor"],
  },

  settings: {
    read: ["Admin", "Editor"],
    write: ["Admin"],
  },

  users: {
    read: ["Admin"],
    write: ["Admin"],
  },
} as const;

export function hasPermission(
  role: string | undefined,
  allowedRoles: readonly string[],
): boolean {
  if (!role) {
    return false;
  }

  return allowedRoles.includes(role);
}
