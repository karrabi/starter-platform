import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { SettingsService } from "./service";

export class SettingsController {
  constructor(private readonly service = new SettingsService()) {}

  getGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const group = String(req.params.group);

      const result = await this.service.getGroup(group);

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPublicGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const group = String(req.params.group);

      const result = await this.service.getGroup(group);

      if (!result) {
        ApiResponse.error(res, "Settings not found", 404);

        return;
      }

      ApiResponse.success(res, result.value);
    } catch (error) {
      next(error);
    }
  };

  updateGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const group = String(req.params.group);
      const value = req.body.value;

      const result = await this.service.updateGroup(group, value);

      ApiResponse.success(res, result, "Settings updated");
    } catch (error) {
      next(error);
    }
  };
}
