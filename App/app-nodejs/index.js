import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ConnectDB from "./config/db/index.js";
import route from "./routes/index.js";

const app = express();
// CONFIG
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// CONNECT DB
ConnectDB();
// CONFIG ROUTE
route(app);

app.listen(process.env.PORT, () => {
  console.log("started");
});
