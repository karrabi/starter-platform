import { Router } from "express";

import { upload } from "../../config/multer";
import { authenticate } from "../../middlewares/authenticate";

import { MediaController } from "./controller";

const router = Router();

const controller = new MediaController();

router.get("/public/:id", controller.getPublicById);

router.get("/", authenticate, controller.getAll);

router.post("/upload", authenticate, upload.single("file"), controller.upload);

router.delete("/:id", authenticate, controller.delete);

export default router;
