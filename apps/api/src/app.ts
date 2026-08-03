import cors from "cors";
import express from "express";

import userRoutes from "./modules/user/routes";

import { ApiResponse } from "./utils/response";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  return ApiResponse.success(res, {
    status: "OK",
    service: "Starter Platform API",
  });
});

app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;