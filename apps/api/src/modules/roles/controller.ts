import type { NextFunction, Request, Response } from "express";

import { RoleRepository } from "./repository";
import { ApiResponse } from "../../utils/response";

export class RoleController {
  constructor(private readonly repository = new RoleRepository()) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const roles = await this.repository.findAll();

      ApiResponse.success(res, roles);
    } catch (error) {
      next(error);
    }
  };
}
