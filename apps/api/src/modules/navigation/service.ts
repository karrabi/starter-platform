import type {
  CreateMenuDto,
  CreateMenuItemDto,
  UpdateMenuDto,
  UpdateMenuItemDto,
} from "./dto";
import { NavigationRepository } from "./repository";

export class NavigationService {
  constructor(private readonly repository = new NavigationRepository()) {}

  getAllMenus() {
    return this.repository.findAllMenus();
  }

  getMenuById(id: number) {
    return this.repository.findMenuById(id);
  }

  getPublicMenu(name: string) {
    return this.repository.findMenuByName(name);
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
        throw new Error("Menu item cannot be its own parent");
      }

      const parent = await this.repository.findMenuItemById(data.parentId);

      if (!parent || parent.menuId !== item.menuId) {
        throw new Error("Parent menu item must belong to the same menu");
      }

      const createsCycle = await this.wouldCreateCycle(id, data.parentId);

      if (createsCycle) {
        throw new Error("Menu item parent relationship would create a cycle");
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
