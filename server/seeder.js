import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import countries from "./data/countries.js";
import categories from "./data/categories.js";
import User from "./models/userModel.js";
import Warehouse from "./models/warehouseModel.js";
import Shipment from "./models/shipmentsModels.js";
import connectDB from "./config/db.js";
import data from "./data/list.json";

dotenv.config();
connectDB();

const generate = (idx) => {
  const shuffled = data.sort((a, b) => 0.5 - Math.random());
  const shuffledCountries = countries.sort((a, b) => 0.5 - Math.random());
  let cur = {};
  cur["location"] = shuffledCountries[idx];
  cur["inventory"] = [];
  for (let k = 0; k < 50; k++) {
    cur["inventory"].push({
      item: shuffled[k],
      quantity: Math.floor(Math.random() * 100),
    });
  }
  return cur;
};

const importData = async () => {
  try {
    await User.deleteMany();
    await Warehouse.deleteMany();
    await Shipment.deleteMany();
    const createdUsers = await User.insertMany(users);

    for (let i = 0; i < createdUsers.length; i++) {
      const curUser = await User.findById(createdUsers[i]._id);
      const wData = [];
      for (let j = 0; j < 20; j++) {
        const store = generate(j);
        const currentWh = await Warehouse.create({
          ...store,
          ownerId: createdUsers[i]._id,
        });
        wData.push(currentWh);
      }
      await User.findByIdAndUpdate(curUser._id, { warehouses: wData });
    }
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
