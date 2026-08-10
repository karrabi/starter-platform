import { Router } from "express";

import { RoleController } from "./controller";

const roleRouter = Router();

const roleController = new RoleController();

roleRouter.get("/", roleController.getAll);

export default roleRouter;
