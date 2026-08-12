import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { PagesService } from "./service";

export class PagesController {
  constructor(private readonly service = new PagesService()) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const pages = await this.service.getAll();

      ApiResponse.success(res, pages);
    } catch (error) {
      next(error);
    }
  };

  getPublished = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const pages = await this.service.getPublished();

      ApiResponse.success(res, pages);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        ApiResponse.error(res, "Invalid page ID", 400);
        return;
      }

      const page = await this.service.getById(id);

      if (!page) {
        ApiResponse.error(res, "Page not found", 404);
        return;
      }

      ApiResponse.success(res, page);
    } catch (error) {
      next(error);
    }
  };

  getPublishedBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const slug = String(req.params.slug);

      const page = await this.service.getPublishedBySlug(slug);
      if (!page) {
        ApiResponse.error(res, "Page not found", 404);
        return;
      }

      ApiResponse.success(res, page);
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
      const page = await this.service.create(req.body);

      ApiResponse.success(res, page, "Page created", 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        ApiResponse.error(res, "Invalid page ID", 400);
        return;
      }

      const page = await this.service.update(id, req.body);

      if (!page) {
        ApiResponse.error(res, "Page not found", 404);
        return;
      }

      ApiResponse.success(res, page, "Page updated");
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        ApiResponse.error(res, "Invalid page ID", 400);
        return;
      }

      const page = await this.service.delete(id);

      if (!page) {
        ApiResponse.error(res, "Page not found", 404);
        return;
      }

      ApiResponse.success(res, null, "Page deleted");
    } catch (error) {
      next(error);
    }
  };
}
