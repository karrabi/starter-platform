import type { NextFunction, Request, Response } from "express";

import { UserService } from "./service";

import { ApiResponse } from "../../utils/response";

import type { AuthRequest } from "../../middlewares/authenticate";

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

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);

      const user = await this.service.getUserById(id);

      ApiResponse.success(res, user);
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
      const user = await this.service.createUser(req.body);

      ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const currentUserId = req.user!.userId;

      const user = await this.service.updateUser(id, req.body, currentUserId);

      ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const currentUserId = req.user!.userId;

      const user = await this.service.deleteUser(id, currentUserId);

      ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  };
}
