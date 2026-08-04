import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { SettingsService } from "./service";

export class SettingsController {
  constructor(private readonly service = new SettingsService()) {}

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await this.service.getAll();

      ApiResponse.success(res, settings);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.update(req.body.key, req.body.value);

      ApiResponse.success(res, result, "Setting updated");
    } catch (error) {
      next(error);
    }
  };
}
