import express from "express";
import * as dotenv from "dotenv";
import colors from "colors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import warehouseRoutes from "./routes/warehouseRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/shipments", shipmentRoutes);

//Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV || "dev"} mode on port ${PORT}`
      .magenta.bold
  )
);
