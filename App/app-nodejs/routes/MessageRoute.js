import express from "express";
import MessageController from "../app/controllers/MessageController.js";

const routerMessage = express.Router();

routerMessage.post("/", MessageController.addMessage);

routerMessage.get("/:chatId", MessageController.getMessages);

export default routerMessage;
