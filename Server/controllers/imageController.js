import fs from "fs";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import TextToSvg from "text-to-svg";
import { removeBackground } from "@imgly/background-removal-node";
import { fileURLToPath, pathToFileURL } from "url";

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
      url: `https://image-optimizer-server.onrender.com/image/download/${req.file.filename}`,
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

    const waterMarkText = req.body.watermark || "Default Watermark";
    const opacity = parseFloat(req.body.opacity) || 0.5;
    const position = req.body.position || "southeast";
    const isDiagonal = req.body.diagonal === "true";

    // Gray color and rotation setup
    const options = {
      x: 0,
      y: 0,
      fontSize: Number(req.body.fontSize) || 50,
      anchor: "top",
      attributes: {
        fill: "#BCCCDC",
      },
    };

    const svgText = textToSvg.getSVG(waterMarkText, options);

    // Create base watermark
    let watermarkBuffer = await sharp(Buffer.from(svgText))
      .toFormat("png")
      .png({ quality: 100 })
      .toBuffer();

    // Rotate for diagonal effect
    if (isDiagonal) {
      watermarkBuffer = await sharp(watermarkBuffer)
        .rotate(45, { background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toBuffer();
    }

    const compositeOptions = [];
    if (isDiagonal) {
      // Diagonal tiling pattern
      const tileGap = 400;
      for (let i = -500; i < 2000; i += tileGap) {
        compositeOptions.push({
          input: watermarkBuffer,
          top: i,
          left: i,
          blend: "overlay",
          // opacity: opacity * 0.3,
        });
      }
    } else {
      // Single watermark
      compositeOptions.push({
        input: watermarkBuffer,
        gravity: position,
        blend: "overlay",
        opacity: opacity,
      });
    }

    await sharp(inputPath).composite(compositeOptions).toFile(outputPath);

    res.status(200).json({
      message: "Watermark added successfully",
      filename: req.file.filename,
      url: `https://image-optimizer-server.onrender.com/image/download/${req.file.filename}`,
    });
  } catch (err) {
    console.error("Error adding watermark:", err);
    res.status(400).json({ message: "Error adding watermark", err });
  }
};

const removeBgDir = path.join(__dirname, "../removebg");
const removeBG = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "file is not uploaded" });
    }
    const inputPath = path.join(uploadsDir, req.file.filename);
    const outputPath = path.join(removeBgDir, `${req.file.filename}`);

    const inputFileURL = pathToFileURL(inputPath).href;
    const blob = await removeBackground(inputFileURL); // removing the background
    const buffer = Buffer.from(await blob.arrayBuffer());

    fs.writeFileSync(outputPath, buffer);
    // write to output file

    res.status(200).json({
      message: "background removal successful",
      filename: req.file.filename,
      url: `https://image-optimizer-server.onrender.com/image/download/${req.file.filename}.png`,
    });
  } catch (err) {
    console.log("Something went wrong, while remove background.", err);
    return res
      .status(500)
      .json({ message: "error occured while removing background", err });
  }
};

export {
  upload,
  CompressedDir,
  watermarkDir,
  removeBgDir,
  compressImg,
  addWatermark,
  removeBG,
};
