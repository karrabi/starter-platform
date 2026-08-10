import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { SettingsController } from "./controller";
import { updateSettingsSchema } from "./schema";

const router = Router();

const controller = new SettingsController();

router.get("/public/:group", controller.getPublicGroup);

router.get("/:group", authenticate, controller.getGroup);

router.put(
  "/:group",
  authenticate,
  validate(updateSettingsSchema),
  controller.updateGroup,
);

export default router;
