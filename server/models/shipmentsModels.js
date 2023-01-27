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
  pendingApproval: {
    type: Boolean,
    required: true,
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;
