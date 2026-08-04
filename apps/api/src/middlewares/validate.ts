import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { ApiResponse } from "../utils/response";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      ApiResponse.error(
        res,
        result.error.issues.map((i) => i.message).join(", "),
        400
      );
      return;
    }

    req.body = result.data;

    next();
  };