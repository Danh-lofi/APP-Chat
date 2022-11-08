import mongoose, { mongo } from "mongoose";
import GroupChatModel from "../models/GroupChat.js";
import UserModel from "../models/User.js";

const GroupChatController = {
  createGroupChat: async (req, res) => {
    const nameGroupChat = req.body.nameGroupChat;
    const adminGroup = req.body.adminGroup;
    const memberChat = req.body.memberChat;
    console.log("memberChat");
    console.log(memberChat);

    if (memberChat.length < 3) {
      return res.status(400).send("Nhóm chat phải từ từ3 thành viên trở lên!");
    }

    const groupChat = new GroupChatModel({
      nameGroupChat: nameGroupChat,
      adminGroup: adminGroup,
      memberChat: memberChat,
    });

    // groupChat.save((err) => {
    //   if (err) {
    //     return res.status(406).send("Khong tao duoc group " + err);
    //   }

    //   const rs = { nameGroupChat, adminGroup, memberChat };
    //   res.status(200).json({ rs });
    // });

    try {
      const rs = await groupChat.save();
      res.status(200).json(rs);
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
    const idGroupChat = req.body.idGroupChat;
    const oGroups = { id: idGroupChat };
    const idUser = req.body.idUser;

    try {
      const rs = await UserModel.findOneAndUpdate(
        { _id: idUser },
        { $push: { groups: oGroups } }
      );

      res.status(200).json({ rs, message: "Thanh cong" });
    } catch (error) {
      res.status(407).json({ error, message: "Khong thanh cong" });
    }

    // UserModel.findOneAndUpdate(
    //   { _id: idUser },
    //   { $push: { groups: oGroups } },
    //   function (error, success) {
    //     if (error) {
    //       console.log("Khong thanh cong: " + error);
    //     } else {
    //       console.log("Thanh cong " + success);
    //     }
    //   }
    // );
  },
};

export default GroupChatController;
