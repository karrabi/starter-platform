import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { ProductService } from "./service";

type IdParams = {
  id: string;
};

type SlugParams = {
  slug: string;
};

export class ProductController {
  constructor(private readonly service = new ProductService()) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const products = await this.service.getAll();

      ApiResponse.success(res, products);
    } catch (error) {
      next(error);
    }
  };

  getPublicBySlug = async (
    req: Request<SlugParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const product = await this.service.getPublicBySlug(req.params.slug);

      if (!product) {
        ApiResponse.error(res, "Product not found", 404);
        return;
      }

      ApiResponse.success(res, product);
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const product = await this.service.create(req.body);

      ApiResponse.success(res, product, "Product created", 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request<IdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        ApiResponse.error(res, "Invalid product ID", 400);
        return;
      }

      const product = await this.service.update(id, req.body);

      if (!product) {
        ApiResponse.error(res, "Product not found", 404);
        return;
      }

      ApiResponse.success(res, product, "Product updated");
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request<IdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        ApiResponse.error(res, "Invalid product ID", 400);
        return;
      }

      const product = await this.service.delete(id);

      if (!product) {
        ApiResponse.error(res, "Product not found", 404);
        return;
      }

      ApiResponse.success(res, null, "Product deleted");
    } catch (error) {
      next(error);
    }
  };
}
