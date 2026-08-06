import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { NavigationService } from "./service";

export class NavigationController {
  constructor(private readonly service = new NavigationService()) {}

  getMenus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAllMenus();

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPublicMenu = async (
    req: Request<{ name: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.getPublicMenu(req.params.name);

      if (!result) {
        ApiResponse.error(res, "Menu not found", 404);
        return;
      }

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  createMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createMenu(req.body);

      ApiResponse.success(res, result, "Menu created", 201);
    } catch (error) {
      next(error);
    }
  };

  updateMenu = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.updateMenu(
        Number(req.params.id),
        req.body,
      );

      if (!result) {
        ApiResponse.error(res, "Menu not found", 404);
        return;
      }

      ApiResponse.success(res, result, "Menu updated");
    } catch (error) {
      next(error);
    }
  };

  deleteMenu = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.deleteMenu(Number(req.params.id));

      if (!result) {
        ApiResponse.error(res, "Menu not found", 404);
        return;
      }

      ApiResponse.success(res, null, "Menu deleted");
    } catch (error) {
      next(error);
    }
  };

  getItems = async (
    req: Request<{ menuId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.getMenuItems(Number(req.params.menuId));

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  createItem = async (
    req: Request<{ menuId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.createMenuItem(
        Number(req.params.menuId),
        req.body,
      );

      if (!result) {
        ApiResponse.error(res, "Menu not found", 404);
        return;
      }

      ApiResponse.success(res, result, "Menu item created", 201);
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.updateMenuItem(
        Number(req.params.id),
        req.body,
      );

      if (!result) {
        ApiResponse.error(res, "Menu item not found", 404);
        return;
      }

      ApiResponse.success(res, result, "Menu item updated");
    } catch (error) {
      next(error);
    }
  };

  deleteItem = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.deleteMenuItem(Number(req.params.id));

      if (!result) {
        ApiResponse.error(res, "Menu item not found", 404);
        return;
      }

      ApiResponse.success(res, null, "Menu item deleted");
    } catch (error) {
      next(error);
    }
  };
}
