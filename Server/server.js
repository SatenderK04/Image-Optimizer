import express from "express";
import imageRoutes from "./routes/imageRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your React app's origin
    credentials: true,
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/image", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
