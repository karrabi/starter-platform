import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { BlogTagService } from "./service";

type BlogParams = {
  blogId: string;
};

type BlogTagParams = {
  blogId: string;
  tagId: string;
};

export class BlogTagController {
  constructor(private readonly service = new BlogTagService()) {}

  assign = async (
    req: Request<BlogParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.assign(
        Number(req.params.blogId),
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
    req: Request<BlogParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tags = await this.service.getTags(Number(req.params.blogId));

      ApiResponse.success(res, tags);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request<BlogTagParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.remove(
        Number(req.params.blogId),
        Number(req.params.tagId),
      );

      ApiResponse.success(res, null, "Tag removed");
    } catch (error) {
      next(error);
    }
  };
}
