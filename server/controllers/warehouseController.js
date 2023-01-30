import asyncHandler from "express-async-handler";
import Warehouse from "../models/warehouseModel.js";
import User from "../models/userModel.js";

//@desc Register a new user
//@route POST /api/warehouses
//@access Private

const addWarehouse = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  if (user) {
    const { location } = req.body;
    const data = await Warehouse.create({
      location,
      inventory: [],
      ownerId: req.user._id,
    });
    user.warehouses.push(data);
    await user.save();
    res.json(data);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Fetch all user warehouses
//@route GET /api/warehouses
//@access Private
const getWarehouses = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  let data = [];
  for (let i = 0; i < req.user.warehouses.length; i++) {
    let cur = await Warehouse.findById(req.user.warehouses[i]);
    data.push(cur);
  }
  res.json(data);
});

//@desc Fetch all warehouses
//@route GET /api/warehouses/all
//@access Public
const getAllWarehouses = asyncHandler(async (req, res) => {
  const data = await Warehouse.find({}).populate("ownerId");
  res.json(data);
});

//@desc Fetch all warehouses
//@route PATCH /api/warehouses
//@access Private
const updateInventory = asyncHandler(async (req, res) => {
  const { id, product } = req.body;
  let data = await Warehouse.findById({ id });
  // data.inventory.push({
  //   item: product.name,

  // });
  res.json(data);
});

export { getWarehouses, getAllWarehouses, addWarehouse };
