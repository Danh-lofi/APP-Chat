import express from "express";
import RequestFriendController from "../app/controllers/RequestFriendController.js";
const routerRequestFriend = express.Router();

routerRequestFriend.get("/:id", RequestFriendController.getListRequest);

export default routerRequestFriend;
