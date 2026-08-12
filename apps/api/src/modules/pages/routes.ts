import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";
import { PagesController } from "./controller";
import { createPageSchema, updatePageSchema } from "./schema";
import { authorize } from "../../middlewares/authorize";
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
pagesRouter.get(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  pagesController.getAll,
);
pagesRouter.get(
  "/:id",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  pagesController.getById,
);
pagesRouter.post(
  "/",
  authenticate,
  authorize("Admin", "Editor"),
  validate(createPageSchema),
  pagesController.create,
);

pagesRouter.put(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  validate(updatePageSchema),
  pagesController.update,
);

pagesRouter.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  pagesController.delete,
);

export default pagesRouter;
