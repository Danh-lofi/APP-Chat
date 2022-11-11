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
  authMiddleware.authApp,
  GroupChatController.getGroupChat
);
routerGroupChat.put(
  "/updateGroupChatInUser",
  GroupChatController.updateGroupChatInUser
);
routerGroupChat.post("/deleteMember",authMiddleware.isAuth,GroupChatController.deleteGroupChat);
routerGroupChat.post("/leaveGroup",authMiddleware.isAuth,GroupChatController.leaveGroup);

routerGroupChat.put("/renameGroupChat", GroupChatController.renameGroupChat);

routerGroupChat.put(
  "/deleteUserFromGroupChat",
  GroupChatController.deleteUserFromGroupChat,
  GroupChatController.updateUserWhenDelete
);

routerGroupChat.put(
  "/addUserToGroup",
  GroupChatController.addUserToGroup,
  GroupChatController.updateGroupInUser
);

export default routerGroupChat;
