import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validate } from "../../middlewares/validate";

import { NavigationController } from "./controller";
import {
  createMenuItemSchema,
  createMenuSchema,
  updateMenuItemSchema,
  updateMenuSchema,
} from "./schema";
import { authorize } from "../../middlewares/authorize";

const router = Router();

const controller = new NavigationController();

router.get("/public/:name", controller.getPublicMenu);

router.get(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getMenus,
);
router.get(
  "/:id",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getMenuById,
);
router.post(
  "/",
  authenticate,
  authorize("Admin", "Editor"),
  validate(createMenuSchema),
  controller.createMenu,
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  validate(updateMenuSchema),
  controller.updateMenu,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  controller.deleteMenu,
);

router.get(
  "/:menuId/items",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getItems,
);

router.post(
  "/:menuId/items",
  authenticate,
  authorize("Admin", "Editor"),
  validate(createMenuItemSchema),
  controller.createItem,
);

router.put(
  "/items/:id",
  authenticate,
  authorize("Admin", "Editor"),
  validate(updateMenuItemSchema),
  controller.updateItem,
);

router.delete(
  "/items/:id",
  authenticate,
  authorize("Admin", "Editor"),
  controller.deleteItem,
);

export default router;
