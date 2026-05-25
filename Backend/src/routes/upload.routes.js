import express from "express";
import multer from "multer";
import path from "path";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Image kahan save ho aur kya naam mile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads folder mein save hoga
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Sirf images allow karo
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed!"));
    }
  },
});

// Upload route
router.post("/upload-avatar", authenticateToken, upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export default router;