import fs from "node:fs";

import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { MediaService } from "./service";

export class MediaController {
  constructor(private readonly service = new MediaService()) {}

  upload = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.file) {
        ApiResponse.error(res, "File is required", 400);
        return;
      }

      const result = await this.service.upload({
        fileName: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        extension: req.file.originalname.split(".").pop() ?? "",
        size: req.file.size,
        path:
          "/uploads/" +
          (req.file.mimetype.startsWith("image/") ? "images/" : "documents/") +
          req.file.filename,
      });

      ApiResponse.success(res, result, "File uploaded", 201);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.getAll();

      ApiResponse.success(res, result);
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

      const media = await this.service.getById(id);

      if (!media) {
        ApiResponse.error(res, "File not found", 404);
        return;
      }

      if (fs.existsSync(media.path)) {
        fs.unlinkSync(media.path);
      }

      await this.service.delete(id);

      ApiResponse.success(res, null, "File deleted");
    } catch (error) {
      next(error);
    }
  };
}
