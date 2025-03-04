import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");
const compressedDir = path.join(__dirname, "../compressed");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir, { recursive: true });
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

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  try {
    /// COMPRESSION OF IMAGE
    const inputPath = path.join(uploadsDir, req.file.filename);
    const outputPath = path.join(compressedDir, req.file.filename);

    await sharp(inputPath).jpeg({ quality: 70 }).toFile(outputPath);

    // DELETE THE ORIGINAL FILE
    fs.unlinkSync(inputPath);

    // fileUrl = outputPath;

    res.status(200).json({
      message: "File compressed successfully",
      filename: req.file.filename,
      url: `/compressed/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

export { upload, uploadImage };
