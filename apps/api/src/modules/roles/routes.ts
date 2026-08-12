import { Router } from "express";

import { RoleController } from "./controller";

import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const roleRouter = Router();

const roleController = new RoleController();

roleRouter.get("/", authenticate, authorize("Admin"), roleController.getAll);

export default roleRouter;
