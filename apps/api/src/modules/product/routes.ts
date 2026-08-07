import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { ProductController } from "./controller";
import { createProductSchema, updateProductSchema } from "./schema";

const router = Router();
const controller = new ProductController();

router.get("/public/:slug", controller.getPublicBySlug);

router.get("/", authenticate, controller.getAll);

router.post(
  "/",
  authenticate,
  validate(createProductSchema),
  controller.create,
);

router.get("/:id", authenticate, controller.getById);

router.put(
  "/:id",
  authenticate,
  validate(updateProductSchema),
  controller.update,
);

router.delete("/:id", authenticate, controller.delete);

export default router;
