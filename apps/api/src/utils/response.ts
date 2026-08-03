import type { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    data: unknown,
    message = "Success",
    status = 200
  ) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message = "Internal Server Error",
    status = 500
  ) {
    return res.status(status).json({
      success: false,
      message,
    });
  }
}