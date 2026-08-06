import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { ProductTagService } from "./service";

type ProductParams = {
  productId: string;
};

type ProductTagParams = {
  productId: string;
  tagId: string;
};

export class ProductTagController {
  constructor(private readonly service = new ProductTagService()) {}

  assign = async (
    req: Request<ProductParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.assign(
        Number(req.params.productId),
        req.body.tagId,
      );

      if ("error" in result) {
        ApiResponse.error(res, result.error, 400);
        return;
      }

      ApiResponse.success(res, result.data, "Tag assigned", 201);
    } catch (error) {
      next(error);
    }
  };

  getTags = async (
    req: Request<ProductParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tags = await this.service.getTags(Number(req.params.productId));

      ApiResponse.success(res, tags);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request<ProductTagParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.remove(
        Number(req.params.productId),
        Number(req.params.tagId),
      );

      ApiResponse.success(res, null, "Tag removed");
    } catch (error) {
      next(error);
    }
  };
}
