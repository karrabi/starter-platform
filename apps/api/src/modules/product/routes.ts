import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { ProductController } from "./controller";
import { createProductSchema, updateProductSchema } from "./schema";
import { authorize } from "../../middlewares/authorize";
const router = Router();
const controller = new ProductController();
router.get("/public", controller.getPublic);
router.get("/public/:slug", controller.getPublicBySlug);

router.get(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getAll,
);

router.post(
  "/",
  authenticate,
  authorize("Admin", "Editor"),
  validate(createProductSchema),
  controller.create,
);

router.get(
  "/:id",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getById,
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  validate(updateProductSchema),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  controller.delete,
);

export default router;
