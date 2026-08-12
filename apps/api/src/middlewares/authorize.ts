import type { NextFunction, Response } from "express";

import type { AuthRequest } from "./authenticate";
import { ApiResponse } from "../utils/response";

export function authorize(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ApiResponse.error(res, "Unauthorized", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(res, "Forbidden", 403);
    }

    next();
  };
}
