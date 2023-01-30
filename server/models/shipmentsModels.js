import mongoose from "mongoose";

const shipmentSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  frombusiness: {
    type: String,
    required: true,
  },
  tobusiness: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
    required: false,
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;
