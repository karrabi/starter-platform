import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { BlogCategoryController } from "./controller";
import { assignCategorySchema } from "./dto";

const router = Router();

const controller = new BlogCategoryController();

router.get("/:blogId/categories", authenticate, controller.getCategories);

router.post(
  "/:blogId/categories",
  authenticate,
  validate(assignCategorySchema),
  controller.assign,
);

router.delete(
  "/:blogId/categories/:categoryId",
  authenticate,
  controller.remove,
);

export default router;
