import type { Request, Response, NextFunction } from "express";
import { CategoryType } from "@prisma/client";

import { CategoryService } from "./service";
import { ApiResponse } from "../../utils/response";

export class CategoryController {
  constructor(private readonly service = new CategoryService()) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAll();

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getByType = async (
    req: Request<{ type: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const type = req.params.type.toUpperCase() as CategoryType;

      const result = await this.service.getByType(type);

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.create(req.body);

      ApiResponse.success(res, result, "Category created", 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.update(Number(req.params.id), req.body);

      if (!result) {
        ApiResponse.error(res, "Category not found", 404);
        return;
      }

      ApiResponse.success(res, result, "Category updated");
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.delete(Number(req.params.id));

      if (!result) {
        ApiResponse.error(res, "Category not found", 404);
        return;
      }

      ApiResponse.success(res, null, "Category deleted");
    } catch (error) {
      next(error);
    }
  };
}
