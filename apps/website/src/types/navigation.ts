export type NavigationItem = {
  id: number;
  menuId: number;
  title: string;
  url: string;
  icon: string | null;
  parentId: number | null;
  sortOrder: number;
  target: string | null;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  children: NavigationItem[];
};

export type NavigationMenu = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  items: NavigationItem[];
};
