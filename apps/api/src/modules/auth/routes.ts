import { Router } from "express";

import { validate } from "../../middlewares/validate";
import { AuthController } from "./controller";
import { loginSchema } from "./schema";

const router = Router();

const controller = new AuthController();

router.post(
  "/login",
  validate(loginSchema),
  controller.login
);

export default router;