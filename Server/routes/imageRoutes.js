import { Router } from "express";
import {
  addWatermark,
  compressImg,
  upload,
} from "../controllers/imageController.js";
import downloadImg from "../controllers/download.js";

const router = Router();

router.post("/upload", upload.single("image"), compressImg);
router.get("/download/:filename", downloadImg);
router.post("/watermark", upload.single("image"), addWatermark);

export default router;
