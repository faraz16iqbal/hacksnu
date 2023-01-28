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
});

const warehouseSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  inventory: [inventorySchema],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;
