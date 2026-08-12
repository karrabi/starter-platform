import { Router } from "express";

import { upload } from "../../config/multer";
import { authenticate } from "../../middlewares/authenticate";

import { MediaController } from "./controller";
import { authorize } from "../../middlewares/authorize";

const router = Router();

const controller = new MediaController();

router.get("/public/:id", controller.getPublicById);

router.get(
  "/",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  controller.getAll,
);

router.post(
  "/upload",
  authenticate,
  authorize("Admin", "Editor", "Author"),
  upload.single("file"),
  controller.upload,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin", "Editor"),
  controller.delete,
);

export default router;
