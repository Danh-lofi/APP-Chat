import express from "express";
import RequestFriendController from "../app/controllers/RequestFriendController.js";
import UserController from "../app/controllers/UserController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";
const routerRequestFriend = express.Router();
// /request-friend
routerRequestFriend.get(
  "/:id",
  RequestFriendController.getListRequest,
  UserController.getListUserFromId
);
routerRequestFriend.post("/accept", RequestFriendController.acceptFriend);
routerRequestFriend.post("/decline", RequestFriendController.declineFriend);
routerRequestFriend.post("/send", RequestFriendController.sendRequestFriend);

export default routerRequestFriend;
