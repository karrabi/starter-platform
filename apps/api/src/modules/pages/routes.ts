import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";
import { PagesController } from "./controller";
import { createPageSchema, updatePageSchema } from "./schema";

const pagesRouter = Router();
const pagesController = new PagesController();

/*
 * Public endpoints
 */
pagesRouter.get("/public", pagesController.getPublished);

pagesRouter.get("/public/:slug", pagesController.getPublishedBySlug);
/*
 * Protected admin endpoints
 */
pagesRouter.get("/", authenticate, pagesController.getAll);
pagesRouter.get("/:id", authenticate, pagesController.getById);
pagesRouter.post(
  "/",
  authenticate,
  validate(createPageSchema),
  pagesController.create,
);

pagesRouter.put(
  "/:id",
  authenticate,
  validate(updatePageSchema),
  pagesController.update,
);

pagesRouter.delete("/:id", authenticate, pagesController.delete);

export default pagesRouter;
