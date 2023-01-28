import express from "express";
const router = express.Router();
import {
  createShipment,
  editShipmentCost,
  getShipments,
} from "../controllers/shipmentControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createShipment);
router.route("/").get(protect, admin, getShipments);
router.route("/edit").patch(protect, admin, editShipmentCost);

export default router;
