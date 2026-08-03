import { Router } from "express";

import { UserController } from "./controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAll);

export default userRouter;