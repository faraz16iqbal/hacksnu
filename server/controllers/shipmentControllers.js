import expressAsyncHandler from "express-async-handler";
import Shipment from "../models/shipmentsModels.js";

//@desc Create new shipment
//@route POST /api/shipment/
//@access Private

const createShipment = expressAsyncHandler(async (req, res) => {
  const { to, from, product, cost } = req.body;
  const shipment = await Shipment.create({
    to,
    from,
    product,
    cost,
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
  const { objId, newCost } = req.body;
  let shipments = await Shipment.findById(objId);
  shipments.cost = newCost;
  await shipments.save();
  console.log(shipments);
  return res.json(shipments);
});
export { createShipment, getShipments, editShipmentCost };
