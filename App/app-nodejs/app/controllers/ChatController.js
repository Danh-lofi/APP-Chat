import { log } from "util";
import ChatModel from "../models/chatModel.js";

const ChatController = {
  // POST
  createChat: async (req, res) => {
    console.log(req.body);
    console.log(req.body.senderId);
    console.log(req.body.receiverId);
    if (!req.body.senderId || !req.body.receiverId) {
      return;
    }
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      console.log("Success");

      res.status(200).send("Success");
    } catch (error) {
      console.log("Fail");
      res.status(500).json(error);
    }
  },
  // GET /chat
  userChats: async (req, res) => {
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findChat: async (req, res) => {
    console.log(req.params);
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.senderId, req.params.recieverId] },
      });
      if (chat) {
        console.log(chat);
        res.status(200).json(chat);
      } else {
        console.log("chua tao");
        res.status(402).send("chua tao");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default ChatController;
