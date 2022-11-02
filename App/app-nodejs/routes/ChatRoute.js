import express from "express";
import ChatController from "../app/controllers/ChatController.js";
const routerChat = express.Router();

routerChat.post("/", ChatController.createChat);
routerChat.get("/:senderId.:recieverId", ChatController.findChat);

export default routerChat;
