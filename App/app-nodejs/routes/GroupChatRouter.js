import express from "express";
import CloudinaryController from "../app/controllers/CloudinaryController.js";
import GroupChatController from "../app/controllers/GroupChatController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const routerGroupChat = express.Router();
// /groupChat"
routerGroupChat.post(
  "/createGroup",
  authMiddleware.isAuth,
  CloudinaryController.uploadAvatar,
  GroupChatController.createGroupChat,
  GroupChatController.updateGroupChatInUser
);
routerGroupChat.get(
  "/getGroupChat",
  authMiddleware.authApp,
  GroupChatController.getGroupChat
);
routerGroupChat.get(
  "/get-info-group/:idGroup",
  GroupChatController.getInfoGroup
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
routerGroupChat.post(
  "/deleteMember",
  authMiddleware.isAuth,
  GroupChatController.deleteGroupChat
);
routerGroupChat.post(
  "/leaveGroup",
  authMiddleware.isAuth,
  GroupChatController.leaveGroup
);

routerGroupChat.put("/renameGroupChat", GroupChatController.renameGroupChat);

// _id: idGroup, idUserDeleted
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
// idGroupChat, listIdUser
routerGroupChat.put(
  "/add-users",
  GroupChatController.addUsersToGroup,
  GroupChatController.updateGroupInUsers
);

export default routerGroupChat;
