import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { ProductCategoryController } from "./controller";
import { assignCategorySchema } from "./dto";

const router = Router();

const controller = new ProductCategoryController();

router.get("/:productId/categories", authenticate, controller.getCategories);

router.post(
  "/:productId/categories",
  authenticate,
  validate(assignCategorySchema),
  controller.assign,
);

router.delete(
  "/:productId/categories/:categoryId",
  authenticate,
  controller.remove,
);

export default router;
