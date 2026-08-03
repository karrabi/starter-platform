import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/logger";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
}