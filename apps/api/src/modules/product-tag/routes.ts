import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";
import { ProductTagController } from "./controller";
import { assignTagSchema } from "./schema";

const router = Router();
const controller = new ProductTagController();

router.get("/:productId/tags", authenticate, controller.getTags);

router.post(
  "/:productId/tags",
  authenticate,
  validate(assignTagSchema),
  controller.assign,
);

router.delete("/:productId/tags/:tagId", authenticate, controller.remove);

export default router;
