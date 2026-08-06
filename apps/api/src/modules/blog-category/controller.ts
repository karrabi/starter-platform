import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { BlogCategoryService } from "./service";

export class BlogCategoryController {
  constructor(private readonly service = new BlogCategoryService()) {}

  assign = async (
    req: Request<{ blogId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.assign(
        Number(req.params.blogId),
        req.body.categoryId,
      );

      if (!result) {
        ApiResponse.error(res, "Blog or Category not found", 404);
        return;
      }

      ApiResponse.success(res, result, "Category assigned");
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (
    req: Request<{ blogId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.getCategories(
        Number(req.params.blogId),
      );

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request<{
      blogId: string;
      categoryId: string;
    }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.service.remove(
        Number(req.params.blogId),
        Number(req.params.categoryId),
      );

      ApiResponse.success(res, null, "Category removed");
    } catch (error) {
      next(error);
    }
  };
}
