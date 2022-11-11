import mongoose, { mongo } from "mongoose";
import GroupChatModel from "../models/GroupChat.js";
import UserModel from "../models/User.js";

const GroupChatController = {
  createGroupChat: async (req, res, next) => {
    const nameGroupChat = req.body.nameGroupChat;
    console.log(req.user._id);
    const adminGroup = req.user._id;
    const memberChat = req.body.memberChat;

    if (memberChat.length < 3) {
      return res.status(400).send("Nhóm chat phải từ từ3 thành viên trở lên!");
    }

    const groupChat = new GroupChatModel({
      nameGroupChat: nameGroupChat,
      adminGroup: adminGroup,
      memberChat: memberChat,
    });

    try {
      const rs = await groupChat.save();
      req.body.idGroupChat = rs._id;
      req.body.listIdUser = rs.memberChat;
      next();
    } catch (error) {
      res.status(406).json(error);
    }
  },

  getGroupChat: async (req, res) => {
    const user = req.user;
    console.log(user);
    const listGroup = [];
    for (const group of user.groups) {
      const id = mongoose.Types.ObjectId(group.id);
      const data = await GroupChatModel.findOne({ _id: id });
      listGroup.push(data);
    }
    res.status(200).json({ listGroup });
  },

  updateGroupChatInUser: async (req, res) => {
    const listIdUser = req.body.listIdUser;
    const idGroupChat = req.body.idGroupChat;
    console.log(idGroupChat);
    console.log(listIdUser);
    const oGroups = { id: idGroupChat };
    // const idUser = req.body.idUser;
    for (const idUser of listIdUser) {
      try {
        const rs = await UserModel.findOneAndUpdate(
          { _id: idUser.id },
          { $push: { groups: oGroups } }
        );
      } catch (error) {
        res.status(407).json({ error, message: "Khong thanh cong" });
      }
    }
    res.status(200).json({ message: "Thanh cong" });
  },
};

export default GroupChatController;
