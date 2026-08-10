import { AppError } from "../../utils/app-error";
import type {
  CreateMenuDto,
  CreateMenuItemDto,
  UpdateMenuDto,
  UpdateMenuItemDto,
} from "./dto";
import { NavigationRepository } from "./repository";

type NavigationTreeItem = {
  id: number;
  menuId: number;
  title: string;
  url: string;
  icon: string | null;
  parentId: number | null;
  sortOrder: number;
  target: string | null;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  children: NavigationTreeItem[];
};

export class NavigationService {
  constructor(private readonly repository = new NavigationRepository()) {}

  getAllMenus() {
    return this.repository.findAllMenus();
  }

  getMenuById(id: number) {
    return this.repository.findMenuById(id);
  }

  async getPublicMenu(name: string) {
    const menu = await this.repository.findMenuByName(name);

    if (!menu) {
      return null;
    }

    const itemMap = new Map<number, NavigationTreeItem>();

    for (const item of menu.items) {
      itemMap.set(item.id, {
        ...item,
        children: [],
      });
    }

    const rootItems: NavigationTreeItem[] = [];

    for (const item of menu.items) {
      const treeItem = itemMap.get(item.id);

      if (!treeItem) {
        continue;
      }

      if (item.parentId === null) {
        rootItems.push(treeItem);
        continue;
      }

      const parent = itemMap.get(item.parentId);

      if (parent) {
        parent.children.push(treeItem);
      }
    }

    return {
      ...menu,
      items: rootItems,
    };
  }

  createMenu(data: CreateMenuDto) {
    return this.repository.createMenu(data);
  }

  async updateMenu(id: number, data: UpdateMenuDto) {
    const menu = await this.repository.findMenuById(id);

    if (!menu) {
      return null;
    }

    return this.repository.updateMenu(id, data);
  }

  async deleteMenu(id: number) {
    const menu = await this.repository.findMenuById(id);

    if (!menu) {
      return null;
    }

    return this.repository.deleteMenu(id);
  }

  getMenuItems(menuId: number) {
    return this.repository.findMenuItems(menuId);
  }

  async createMenuItem(
    menuId: number,
    data: Omit<CreateMenuItemDto, "menuId">,
  ) {
    const menu = await this.repository.findMenuById(menuId);

    if (!menu) {
      return null;
    }

    if (data.parentId != null) {
      const parent = await this.repository.findMenuItemById(data.parentId);

      if (!parent || parent.menuId !== menuId) {
        throw new Error("Parent menu item must belong to the same menu");
      }
    }

    return this.repository.createMenuItem({
      ...data,
      menuId,
    });
  }

  private async wouldCreateCycle(
    itemId: number,
    parentId: number,
  ): Promise<boolean> {
    let currentParentId: number | null = parentId;

    while (currentParentId !== null) {
      if (currentParentId === itemId) {
        return true;
      }

      const parent = await this.repository.findMenuItemById(currentParentId);

      if (!parent) {
        return false;
      }

      currentParentId = parent.parentId;
    }

    return false;
  }

  async updateMenuItem(id: number, data: UpdateMenuItemDto) {
    const item = await this.repository.findMenuItemById(id);

    if (!item) {
      return null;
    }

    if (data.parentId != null) {
      if (data.parentId === id) {
        throw new AppError("Menu item cannot be its own parent", 400);
      }

      const parent = await this.repository.findMenuItemById(data.parentId);

      if (!parent || parent.menuId !== item.menuId) {
        throw new AppError(
          "Parent menu item must belong to the same menu",
          400,
        );
      }

      const createsCycle = await this.wouldCreateCycle(id, data.parentId);

      if (createsCycle) {
        throw new AppError(
          "Menu item parent relationship would create a cycle",
          400,
        );
      }
    }

    return this.repository.updateMenuItem(id, data);
  }

  async deleteMenuItem(id: number) {
    const item = await this.repository.findMenuItemById(id);

    if (!item) {
      return null;
    }

    return this.repository.deleteMenuItem(id);
  }
}
