import express from "express";
import ChatController from "../app/controllers/ChatController.js";

const routerChat = express.Router();
routerChat.post("/", ChatController.createChat);
routerChat.get("/:userId", ChatController.userChats);
routerChat.get("/find/:firstId/:secondId", ChatController.findChat);
export default routerChat;
