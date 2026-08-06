import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";
import { TagController } from "./controller";
import { createTagSchema, updateTagSchema } from "./schema";

const router = Router();
const controller = new TagController();

router.get("/", authenticate, controller.getAll);

router.get("/type/:type", authenticate, controller.getByType);

router.post("/", authenticate, validate(createTagSchema), controller.create);

router.put("/:id", authenticate, validate(updateTagSchema), controller.update);

router.delete("/:id", authenticate, controller.delete);

export default router;
