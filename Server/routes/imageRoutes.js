import { Router } from "express";
import {
  addWatermark,
  compressImg,
  removeBG,
  upload,
} from "../controllers/imageController.js";
import downloadImg from "../controllers/download.js";

const router = Router();

router.post("/upload", upload.single("image"), compressImg);
router.get("/download/:type/:filename", downloadImg);

router.post("/watermark", upload.single("image"), addWatermark);
router.post("/removebg", upload.single("image"), removeBG);

export default router;
