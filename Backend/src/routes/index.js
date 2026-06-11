import express from "express";
import todoRoutes from "./todo.route.js";
import userRoutes from "./user.route.js";
import uploadRoutes from "./upload.route.js";

const router = express.Router();

//  register all routes here
router.use("/", userRoutes);
router.use("/", todoRoutes);
router.use("/", uploadRoutes);

export default router;