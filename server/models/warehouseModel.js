import mongoose from "mongoose";

const inventorySchema = mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const warehouseSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  inventory: [inventorySchema],
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;
