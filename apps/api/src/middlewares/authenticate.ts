import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { ApiResponse } from "../utils/response";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return ApiResponse.error(res, "Unauthorized", 401);
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      userId: number;
      email: string;
    };

    req.user = payload;

    next();
  } catch {
    return ApiResponse.error(res, "Invalid token", 401);
  }
};
