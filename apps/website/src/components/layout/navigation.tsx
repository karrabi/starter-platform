import Link from "next/link";

import type { NavigationItem } from "@/types/navigation";

type Props = {
  items: NavigationItem[];
};

function NavigationItemView({ item }: { item: NavigationItem }) {
  const hasChildren = item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.url}
        target={item.target ?? "_self"}
        className="transition hover:text-gray-600"
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={item.url}
        target={item.target ?? "_self"}
        className="transition hover:text-gray-600"
      >
        {item.title}
      </Link>

      <div className="absolute left-0 top-full z-50 hidden min-w-48 pt-2 group-hover:block">
        <div className="rounded-lg border bg-white p-2 shadow-lg">
          {item.children.map((child) => (
            <div key={child.id} className="px-3 py-2">
              <NavigationItemView item={child} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navigation({ items }: Props) {
  return (
    <nav className="flex items-center gap-6">
      {items.map((item) => (
        <NavigationItemView key={item.id} item={item} />
      ))}
    </nav>
  );
}
