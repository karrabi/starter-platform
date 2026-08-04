import type { NextFunction, Request, Response } from "express";

import { ApiResponse } from "../../utils/response";
import { AuthService } from "./service";

export class AuthController {
  constructor(private readonly service = new AuthService()) {}

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.login(
        req.body.email,
        req.body.password,
      );

      ApiResponse.success(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  };
}
