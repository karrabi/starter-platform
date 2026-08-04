import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { SettingsController } from "./controller";
import { updateSettingSchema } from "./schema";

const router = Router();

const controller = new SettingsController();

router.get("/", authenticate, controller.getAll);

router.put("/", authenticate, validate(updateSettingSchema), controller.update);

export default router;
