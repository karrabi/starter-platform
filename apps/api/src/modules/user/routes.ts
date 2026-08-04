import { Router } from "express";

import { UserController } from "./controller";
import { validate } from "../../middlewares/validate";
import { createUserSchema } from "./schema";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAll);

userRouter.post(
  "/validate",
  validate(createUserSchema),
  (_req, res) => {
    res.json({
      success: true,
      message: "Validation passed",
    });
  }
);

export default userRouter;