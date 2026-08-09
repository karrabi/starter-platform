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

const router = Router();

const controller = new NavigationController();

router.get("/public/:name", controller.getPublicMenu);

router.get("/", authenticate, controller.getMenus);
router.get("/:id", authenticate, controller.getMenuById);
router.post(
  "/",
  authenticate,
  validate(createMenuSchema),
  controller.createMenu,
);

router.put(
  "/:id",
  authenticate,
  validate(updateMenuSchema),
  controller.updateMenu,
);

router.delete("/:id", authenticate, controller.deleteMenu);

router.get("/:menuId/items", authenticate, controller.getItems);

router.post(
  "/:menuId/items",
  authenticate,
  validate(createMenuItemSchema),
  controller.createItem,
);

router.put(
  "/items/:id",
  authenticate,
  validate(updateMenuItemSchema),
  controller.updateItem,
);

router.delete("/items/:id", authenticate, controller.deleteItem);

export default router;
