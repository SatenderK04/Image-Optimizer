import path from "path";
import { CompressedDir } from "./imageController.js";
import fs from "fs";

const downloadImg = (req, res) => {
  const filePath = path.join(CompressedDir, req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, req.params.filename);
  } else {
    res.status(404).json({ message: "File not found" });
  }
};

export default downloadImg;
