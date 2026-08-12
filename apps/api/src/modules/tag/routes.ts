import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";
import { TagController } from "./controller";
import { createTagSchema, updateTagSchema } from "./schema";
import { authorize } from "../../middlewares/authorize";

const router = Router();
const controller = new TagController();

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
  validate(createTagSchema),
  controller.create,
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  validate(updateTagSchema),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  controller.delete,
);

export default router;
