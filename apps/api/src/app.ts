import cors from "cors";
import express from "express";
import path from "node:path";

import userRoutes from "./modules/user/routes";

import { ApiResponse } from "./utils/response";

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

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  return ApiResponse.success(res, {
    status: "OK",
    service: "Starter Platform API",
  });
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/users", userRoutes);
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
