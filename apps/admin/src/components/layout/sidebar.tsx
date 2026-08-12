"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { useCurrentUser } from "@/hooks/use-current-user";

const menu = [
  {
    title: "Dashboard",
    href: routes.dashboard,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Products",
    href: routes.products,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Pages",
    href: routes.pages,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Blog",
    href: routes.blog,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Media",
    href: routes.media,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Categories",
    href: routes.categories,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Tags",
    href: routes.tags,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Navigation",
    href: routes.navigation,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Settings",
    href: routes.settings,
    roles: ["Admin", "Editor"],
  },
  {
    title: "Users",
    href: routes.users,
    roles: ["Admin"],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const { data: user } = useCurrentUser();

  const visibleMenu = user
    ? menu.filter((item) => item.roles.includes(user.role))
    : [];

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">Starter Admin</h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {visibleMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-lg px-3 py-2 transition

${pathname === item.href ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
