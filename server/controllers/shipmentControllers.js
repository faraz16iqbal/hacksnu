import expressAsyncHandler from "express-async-handler";
import Shipment from "../models/shipmentsModels.js";

//@desc Create new shipment
//@route POST /api/shipment/
//@access Private

const createShipment = expressAsyncHandler(async (req, res) => {
  const { to, from, product, cost, tobusiness, frombusiness } = req.body;
  const shipment = await Shipment.create({
    to,
    from,
    product,
    cost,
    approved: false,
    tobusiness,
    frombusiness,
  });

  return res.json(shipment);
});

//@desc Get all shipments
//@route GET /api/shipment/
//@access Private

const getShipments = expressAsyncHandler(async (req, res) => {
  const shipments = await Shipment.find({});
  return res.json(shipments);
});

const editShipmentCost = expressAsyncHandler(async (req, res) => {
  const { objId, newCost, approved } = req.body;
  let shipments = await Shipment.findById(objId);
  shipments.cost = newCost;
  if (approved) {
    shipments.approved = true;
  }
  await shipments.save();
  console.log(shipments);
  return res.json(shipments);
});
export { createShipment, getShipments, editShipmentCost };
