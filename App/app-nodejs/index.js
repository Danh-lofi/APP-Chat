import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ConnectDB from "./config/db/index.js";
import route from "./routes/index.js";

import socket from "./app/socket/socket.js";

import { Server } from "socket.io";

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

const server = app.listen(process.env.PORT, () => {
  console.log("started");
});

// Socket IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3005",
  },
});
socket(io);
