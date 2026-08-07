"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Pages",
    href: "/pages",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Media",
    href: "/media",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Tags",
    href: "/tags",
  },
  {
    title: "Navigation",
    href: "/navigation",
  },
  {
    title: "Settings",
    href: "/settings",
  },
  {
    title: "Users",
    href: "/users",
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
