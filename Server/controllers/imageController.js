import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import sharp from "sharp";
import TextToSvg from "text-to-svg";

///// COMMON CODE FOR FILE UPLOADING
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
//////

const CompressedDir = path.join(__dirname, "../compressed");
const compressImg = async (req, res) => {
  try {
    if (!fs.existsSync(CompressedDir)) {
      fs.mkdirSync(CompressedDir, { recursive: true });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    /// COMPRESSION OF IMAGE
    const inputPath = path.join(uploadsDir, req.file.filename);
    const outputPath = path.join(CompressedDir, req.file.filename);

    await sharp(inputPath).jpeg({ quality: 70 }).toFile(outputPath);

    // DELETE THE ORIGINAL FILE
    fs.unlinkSync(inputPath);

    res.status(200).json({
      message: "File compressed successfully",
      filename: req.file.filename,
      url: `http://localhost:6767/image/download/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

const watermarkDir = path.join(__dirname, "../watermark");
const addWatermark = async (req, res) => {
  try {
    if (!fs.existsSync(watermarkDir)) {
      fs.mkdirSync(watermarkDir, { recursive: true });
    }

    const inputPath = path.join(uploadsDir, req.file.filename);

    const outputPath = path.join(watermarkDir, req.file.filename);

    const textToSvg = TextToSvg.loadSync();

    // watermark text
    const waterMarkText = "Confidential";

    // convert to svg text {that will be applied to image as watermark}
    const attributes = { fill: "rgba(255, 255, 255, 0.5)" };
    const options = { x: 0, y: 0, fontSize: 50, anchor: "top", attributes };
    const svgText = textToSvg.getSVG(waterMarkText, options);

    // convert to Buffer
    const svgBuffer = Buffer.from(svgText);

    await sharp(inputPath)
      .composite([{ input: svgBuffer, gravity: "southeast" }])
      .toFile(outputPath);

    res.status(200).json({
      message: "watermark added successfully",
      filename: req.file.filename,
      url: `http://localhost:6767/image/watermark/${req.file.filename}`,
    });
    ////
  } catch (err) {
    console.log("Something went wrong!!, Watermark not added");
    res
      .status(400)
      .json({ message: "Errour occured while adding watermark", err });
  }
};

export { upload, CompressedDir, watermarkDir, compressImg, addWatermark };
