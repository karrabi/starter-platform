import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { ProductCategoryService } from "./service";

export class ProductCategoryController {
  constructor(private readonly service = new ProductCategoryService()) {}

  assign = async (
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.assign(
        Number(req.params.productId),
        req.body.categoryId,
      );

      if (!result) {
        ApiResponse.error(res, "Product or Category not found", 404);
        return;
      }

      ApiResponse.success(res, result, "Category assigned");
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.getCategories(
        Number(req.params.productId),
      );

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request<{
      productId: string;
      categoryId: string;
    }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.service.remove(
        Number(req.params.productId),
        Number(req.params.categoryId),
      );

      ApiResponse.success(res, null, "Category removed");
    } catch (error) {
      next(error);
    }
  };
}
