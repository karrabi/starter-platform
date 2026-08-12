import fs from "node:fs";
import path from "node:path";

import multer from "multer";
import { env } from "./env";

const uploadRoot = path.isAbsolute(env.UPLOAD_DIR)
  ? env.UPLOAD_DIR
  : path.join(process.cwd(), env.UPLOAD_DIR);

const imageDir = path.join(uploadRoot, "images");
const documentDir = path.join(uploadRoot, "documents");

fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(documentDir, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, imageDir);
    } else {
      cb(null, documentDir);
    }
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

    cb(null, fileName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error("Unsupported file type"));
};

export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
