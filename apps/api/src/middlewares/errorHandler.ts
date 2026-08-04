import type { ErrorRequestHandler } from "express";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
