export interface MenuItem {
  id: number;
  menuId: number;
  title: string;
  url: string;
  icon: string | null;
  parentId: number | null;
  sortOrder: number;
  target: "_self" | "_blank";
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Menu {
  id: number;
  name: string;
  description: string | null;
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuRequest {
  name: string;
  description?: string | null;
}

export type UpdateMenuRequest = Partial<CreateMenuRequest>;

export interface CreateMenuItemRequest {
  title: string;
  url: string;
  icon?: string | null;
  parentId?: number | null;
  sortOrder?: number;
  target?: "_self" | "_blank";
  isVisible?: boolean;
}

export type UpdateMenuItemRequest = Partial<CreateMenuItemRequest>;
