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

    return this.repository.createMenuItem({
      ...data,
      menuId,
    });
  }

  async updateMenuItem(id: number, data: UpdateMenuItemDto) {
    const item = await this.repository.findMenuItemById(id);

    if (!item) {
      return null;
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
