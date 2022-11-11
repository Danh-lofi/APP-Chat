import express from "express";
import GroupChatController from "../app/controllers/GroupChatController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const routerGroupChat = express.Router();

routerGroupChat.post(
  "/createGroup",
  authMiddleware.isAuth,
  GroupChatController.createGroupChat,
  GroupChatController.updateGroupChatInUser
);
routerGroupChat.get(
  "/getGroupChat",
  authMiddleware.authApp,
  GroupChatController.getGroupChat
);
routerGroupChat.get(
  "/getAllGroup",
  authMiddleware.isAuth,
  GroupChatController.getGroupChat
);
routerGroupChat.put(
  "/updateGroupChatInUser",
  GroupChatController.updateGroupChatInUser
);

export default routerGroupChat;
