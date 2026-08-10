import { Router } from "express";

import { UserController } from "./controller";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { createUserSchema, updateUserSchema } from "./schema";

const userRouter = Router();

const userController = new UserController();

userRouter.use(authenticate);

userRouter.get("/", userController.getAll);

userRouter.get("/:id", userController.getById);

userRouter.post("/", validate(createUserSchema), userController.create);

userRouter.put("/:id", validate(updateUserSchema), userController.update);

userRouter.delete("/:id", userController.delete);

export default userRouter;
