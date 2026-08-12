import cors from "cors";
import express from "express";
import path from "node:path";

import userRoutes from "./modules/user/routes";
import roleRoutes from "./modules/roles/routes";
import { ApiResponse } from "./utils/response";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";

import authRoutes from "./modules/auth/routes";
import settingsRoutes from "./modules/settings/routes";
import pagesRoutes from "./modules/pages/routes";
import mediaRoutes from "./modules/media/routes";
import blogRoutes from "./modules/blog/routes";
import navigationRoutes from "./modules/navigation/routes";
import categoryRoutes from "./modules/category/routes";
import blogCategoryRoutes from "./modules/blog-category/routes";
import tagRoutes from "./modules/tag/routes";
import blogTagRoutes from "./modules/blog-tag/routes";
import productRoutes from "./modules/product/routes";
import productCategoryRoutes from "./modules/product-category/routes";
import productTagRoutes from "./modules/product-tag/routes";

const app = express();

const allowedOrigins = env.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  return ApiResponse.success(res, {
    status: "OK",
    service: "Starter Platform API",
  });
});

const uploadDirectory = path.isAbsolute(env.UPLOAD_DIR)
  ? env.UPLOAD_DIR
  : path.join(process.cwd(), env.UPLOAD_DIR);

app.use("/uploads", express.static(uploadDirectory));

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogCategoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/blogs", blogTagRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products", productCategoryRoutes);
app.use("/api/products", productTagRoutes);

app.use(errorHandler);

export default app;
