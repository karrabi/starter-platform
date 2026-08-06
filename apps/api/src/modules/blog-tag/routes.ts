import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";
import { BlogTagController } from "./controller";
import { assignTagSchema } from "./schema";

const router = Router();
const controller = new BlogTagController();

router.get("/:blogId/tags", authenticate, controller.getTags);

router.post(
  "/:blogId/tags",
  authenticate,
  validate(assignTagSchema),
  controller.assign,
);

router.delete("/:blogId/tags/:tagId", authenticate, controller.remove);

export default router;
