import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

import { AppError } from "../utils/app-error";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      next(new AppError(message, 400));
      return;
    }

    req.body = result.data;

    next();
  };
