"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";

const menu = [
  {
    title: "Dashboard",
    href: routes.dashboard,
  },
  {
    title: "Products",
    href: routes.products,
  },
  {
    title: "Pages",
    href: routes.pages,
  },
  {
    title: "Blog",
    href: routes.blog,
  },
  {
    title: "Media",
    href: routes.media,
  },
  {
    title: "Categories",
    href: routes.categories,
  },
  {
    title: "Tags",
    href: routes.tags,
  },
  {
    title: "Navigation",
    href: routes.navigation,
  },
  {
    title: "Settings",
    href: routes.settings,
  },
  {
    title: "Users",
    href: routes.users,
  },
];
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">Starter Admin</h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menu.map((item) => (
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
