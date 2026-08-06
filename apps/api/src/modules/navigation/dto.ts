export interface CreateMenuDto {
  name: string;
  description?: string | null;
}

export interface UpdateMenuDto {
  name?: string;
  description?: string | null;
}

export interface CreateMenuItemDto {
  menuId: number;
  title: string;
  url: string;
  icon?: string | null;
  parentId?: number | null;
  sortOrder?: number;
  target?: string | null;
  isVisible?: boolean;
}

export interface UpdateMenuItemDto {
  title?: string;
  url?: string;
  icon?: string | null;
  parentId?: number | null;
  sortOrder?: number;
  target?: string | null;
  isVisible?: boolean;
}
