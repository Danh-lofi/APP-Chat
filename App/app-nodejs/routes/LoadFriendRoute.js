import express from "express";
import FriendController from "../app/controllers/LoadFriendController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const routerFriend = express.Router();

routerFriend.get("/", authMiddleware.authApp, FriendController.getAllFriend);

export default routerFriend;
