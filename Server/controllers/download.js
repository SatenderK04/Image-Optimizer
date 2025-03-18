import path from "path";
import fs from "fs";
import { CompressedDir, watermarkDir, removeBgDir } from "./imageController.js";

const downloadImg = async (req, res) => {
  const { type, filename } = req.params;

  // Determine the directory based on type
  let fileDir;

  if (type === "compressed") {
    fileDir = CompressedDir;
  } else if (type === "watermark") {
    fileDir = watermarkDir;
  } else if (type === "removebg") {
    fileDir = removeBgDir;
  } else {
    return res.status(400).json({ message: "Invalid file type!" });
  }

  const filePath = path.join(fileDir, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename);
  } else {
    res.status(404).json({ message: "File not found" });
  }
};

export default downloadImg;
