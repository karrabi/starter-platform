import { TagType } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { TagService } from "./service";

type IdParams = {
  id: string;
};

type TypeParams = {
  type: string;
};

export class TagController {
  constructor(private readonly service = new TagService()) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tags = await this.service.getAll();

      ApiResponse.success(res, tags);
    } catch (error) {
      next(error);
    }
  };

  getByType = async (
    req: Request<TypeParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const type = req.params.type.toUpperCase();

      if (!Object.values(TagType).includes(type as TagType)) {
        ApiResponse.error(res, "Invalid tag type", 400);
        return;
      }

      const tags = await this.service.getByType(type as TagType);

      ApiResponse.success(res, tags);
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
      const tag = await this.service.create(req.body);

      ApiResponse.success(res, tag, "Tag created", 201);
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
        ApiResponse.error(res, "Invalid tag ID", 400);
        return;
      }

      const tag = await this.service.update(id, req.body);

      if (!tag) {
        ApiResponse.error(res, "Tag not found", 404);
        return;
      }

      ApiResponse.success(res, tag, "Tag updated");
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
        ApiResponse.error(res, "Invalid tag ID", 400);
        return;
      }

      const tag = await this.service.delete(id);

      if (!tag) {
        ApiResponse.error(res, "Tag not found", 404);
        return;
      }

      ApiResponse.success(res, null, "Tag deleted");
    } catch (error) {
      next(error);
    }
  };
}
