

import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {
  registerUserController,
  loginUserController,
  updateUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

// Auth routes
router.post("/auth/register", registerUserController);
router.post("/auth/login", loginUserController);
router.put("/user/update", authenticateToken, updateUserController);

export default router;