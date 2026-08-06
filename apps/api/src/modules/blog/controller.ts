import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { BlogService } from "./service";

export class BlogController {
  constructor(private readonly service = new BlogService()) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogs = await this.service.getAll();

      ApiResponse.success(res, blogs);
    } catch (error) {
      next(error);
    }
  };

  getPublic = async (
    req: Request<{ slug: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const blog = await this.service.getPublishedBySlug(req.params.slug);

      if (!blog) {
        ApiResponse.error(res, "Blog not found", 404);
        return;
      }

      ApiResponse.success(res, blog);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blog = await this.service.create(req.body);

      ApiResponse.success(res, blog, "Blog created", 201);
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
      const blog = await this.service.update(Number(req.params.id), req.body);

      ApiResponse.success(res, blog, "Blog updated");
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
      await this.service.delete(Number(req.params.id));

      ApiResponse.success(res, null, "Blog deleted");
    } catch (error) {
      next(error);
    }
  };
}
