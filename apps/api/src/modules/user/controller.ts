import type { NextFunction, Request, Response } from "express";

import { UserService } from "./service";

import { ApiResponse } from "../../utils/response";

export class UserController {
  constructor(private readonly service = new UserService()) {}

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.service.getUsers();
      ApiResponse.success(res, users);
    } catch (error) {
      next(error);
    }
  };
}