import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { CategoryController } from "./controller";
import { createCategorySchema, updateCategorySchema } from "./schema";

const router = Router();

const controller = new CategoryController();

router.get("/", authenticate, controller.getAll);

router.get("/type/:type", authenticate, controller.getByType);

router.post(
  "/",
  authenticate,
  validate(createCategorySchema),
  controller.create,
);

router.put(
  "/:id",
  authenticate,
  validate(updateCategorySchema),
  controller.update,
);

router.delete("/:id", authenticate, controller.delete);

export default router;
