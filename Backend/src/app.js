



import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));

// Static files — uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Saare routes ek jagah
app.use("/api", router);

// Error handler
app.use(errorHandler);

export default app;