import express from "express";
import imageRoutes from "./routes/imageRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://image-optimizer-client.onrender.com", // Update with your React app's origin
    credentials: true,
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/compressed", express.static(path.join(__dirname, "compressed")));
app.use("/watermark", express.static(path.join(__dirname, "watermark")));
app.use("/removebg", express.static(path.join(__dirname, "removebg")));

app.use("/image", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
