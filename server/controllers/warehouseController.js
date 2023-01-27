import asyncHandler from "express-async-handler";
import Warehouse from "../models/warehouseModel.js";

//@desc Fetch all warehouses
//@route GET /api/warehouses
//@access Public
const getWarehouses = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  let data = [];
  for (let i = 0; i < req.user.warehouses.length; i++) {
    let cur = await Warehouse.findById(req.user.warehouses[i]);
    data.push(cur);
  }
  res.json(data);
});

export { getWarehouses };