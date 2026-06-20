

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import db from "./models/index.js";

dotenv.config();

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

// All routes
app.use("/api", router);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  console.log("Database Connected");

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

export default app;