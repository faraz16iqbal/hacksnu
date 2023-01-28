import express from "express";
import { getDistance } from "../controllers/utils.js";
const router = express.Router();
import {
  getWarehouses,
  getAllWarehouses,
} from "../controllers/warehouseController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getWarehouses);
router.route("/all").get(protect, getAllWarehouses);
router.route("/distance").post(protect, getDistance);

export default router;
