import { Router } from "express";
import { uploadImage, upload } from "../controllers/imageController.js";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;
