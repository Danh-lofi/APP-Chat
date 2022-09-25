import express from "express";
// const express = require("express");
import cors from "cors";
import mongoose from "mongoose";
import ConnectDB from "./config/db/index.js";
import route from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
ConnectDB();
route(app);

app.listen(3001, () => {
  console.log("started");
});
