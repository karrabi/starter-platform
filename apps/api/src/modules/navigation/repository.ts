import prisma from "../../database/prisma";
import type {
  CreateMenuDto,
  CreateMenuItemDto,
  UpdateMenuDto,
  UpdateMenuItemDto,
} from "./dto";

export class NavigationRepository {
  findAllMenus() {
    return prisma.menu.findMany({
      include: {
        items: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  findMenuById(id: number) {
    return prisma.menu.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  findMenuByName(name: string) {
    return prisma.menu.findUnique({
      where: {
        name,
      },
      include: {
        items: {
          where: {
            isVisible: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  createMenu(data: CreateMenuDto) {
    return prisma.menu.create({
      data,
    });
  }

  updateMenu(id: number, data: UpdateMenuDto) {
    return prisma.menu.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteMenu(id: number) {
    return prisma.menu.delete({
      where: {
        id,
      },
    });
  }

  findMenuItemById(id: number) {
    return prisma.menuItem.findUnique({
      where: {
        id,
      },
    });
  }

  findMenuItems(menuId: number) {
    return prisma.menuItem.findMany({
      where: {
        menuId,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  }

  createMenuItem(data: CreateMenuItemDto) {
    return prisma.menuItem.create({
      data,
    });
  }

  updateMenuItem(id: number, data: UpdateMenuItemDto) {
    return prisma.menuItem.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteMenuItem(id: number) {
    return prisma.menuItem.delete({
      where: {
        id,
      },
    });
  }
}
