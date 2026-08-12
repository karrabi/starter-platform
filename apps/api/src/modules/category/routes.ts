import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { CategoryController } from "./controller";
import { createCategorySchema, updateCategorySchema } from "./schema";
import { authorize } from "../../middlewares/authorize";

const router = Router();

const controller = new CategoryController();

router.get(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getAll,
);

router.get(
  "/type/:type",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getByType,
);

router.post(
  "/",
  authenticate,
  authorize("Admin", "Editor"),
  validate(createCategorySchema),
  controller.create,
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  validate(updateCategorySchema),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  controller.delete,
);

export default router;
