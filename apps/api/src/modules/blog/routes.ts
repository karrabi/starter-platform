import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { BlogController } from "./controller";
import { createBlogSchema, updateBlogSchema } from "./schema";

const router = Router();

const controller = new BlogController();

router.get("/", authenticate, controller.getAll);

router.get("/public/:slug", controller.getPublic);

router.post("/", authenticate, validate(createBlogSchema), controller.create);

router.put("/:id", authenticate, validate(updateBlogSchema), controller.update);

router.delete("/:id", authenticate, controller.delete);

export default router;
