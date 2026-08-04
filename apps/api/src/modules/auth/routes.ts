import { Router } from "express";

import { validate } from "../../middlewares/validate";
import { AuthController } from "./controller";
import { loginSchema } from "./schema";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

const controller = new AuthController();

router.post("/login", validate(loginSchema), controller.login);

router.get("/me", authenticate, controller.me);
export default router;
