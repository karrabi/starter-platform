import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { SettingsController } from "./controller";
import { updateSettingsSchema } from "./schema";
import { authorize } from "../../middlewares/authorize";

const router = Router();

const controller = new SettingsController();

router.get("/public/:group", controller.getPublicGroup);

router.get(
  "/:group",
  authenticate,
  authorize("Admin", "Editor"),
  controller.getGroup,
);

router.put(
  "/:group",
  authenticate,
  authorize("Admin"),
  validate(updateSettingsSchema),
  controller.updateGroup,
);

export default router;
