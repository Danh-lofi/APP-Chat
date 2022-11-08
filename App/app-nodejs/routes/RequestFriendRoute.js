import express from "express";
import RequestFriendController from "../app/controllers/RequestFriendController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";
const routerRequestFriend = express.Router();

routerRequestFriend.get("/:id",RequestFriendController.getListRequest);
routerRequestFriend.post("/accept", RequestFriendController.acceptFriend);
routerRequestFriend.post("/decline", RequestFriendController.declineFriend);
routerRequestFriend.post("/sendRequest", RequestFriendController.sendRequestFriend);


export default routerRequestFriend;
