import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { BlogController } from "./controller";
import { createBlogSchema, updateBlogSchema } from "./schema";
import { authorize } from "../../middlewares/authorize";
const router = Router();

const controller = new BlogController();

router.get("/public", controller.getPublicList);

router.get("/public/:slug", controller.getPublic);

router.get(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getAll,
);

router.get(
  "/:id",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getById,
);

router.post(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  validate(createBlogSchema),
  controller.create,
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  validate(updateBlogSchema),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.delete,
);

export default router;
