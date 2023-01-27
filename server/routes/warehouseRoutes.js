import express from "express";
const router = express.Router();
import { getWarehouses } from "../controllers/warehouseController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getWarehouses);

export default router;
