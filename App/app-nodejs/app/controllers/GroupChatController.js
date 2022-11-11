import mongoose, { mongo } from "mongoose";
import ChatModel from "../models/chatModel.js";
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
  deleteUserFromGroupChat: async (req, res, next) => {
    const idGroupChat = req.body._id;
    const idUserDeleted = req.body.idUserDeleted;

    console.log("idUserDeleted");
    console.log(idUserDeleted);

    const remove = await GroupChatModel.findByIdAndUpdate(
      idGroupChat,
      {
        $pull: {
          memberChat: { id: idUserDeleted },
        },
      },
      {
        new: true,
      }
    );

    if (!remove) {
      res.status(408).json({ message: "xoa khong thanh cong" });
      throw new Error("Chat Not Found");
    } else {
      req.body.idGroupChat = idGroupChat;
      req.body.idUserDeleted = idUserDeleted;
      next();
      // res.status(200).json({ message: "xoa thanh cong", remove });
    }
  },
  deleteGroupChat: async (req, res) => {
    const user = req.user;
    const meId = user._id;
    const groupId = req.body.groupId;
    const groupChat = await GroupChatModel.findOne({ _id: groupId });
    const _groupId = groupChat._id;
    const groupChatAdminId = groupChat.adminGroup;
    const userDeleteId = req.body.userDeleteId;
    try {
      if (meId == groupChatAdminId) {
        await GroupChatModel.findOneAndUpdate(
          { _id: groupId },
          { $pull: { memberChat: { id: userDeleteId } } }
        );
        await UserModel.findOneAndUpdate(
          { _id: userDeleteId },
          { $pull: { groups: { id: _groupId } } }
        );
        res
          .status(200)
          .send(
            "groupId: " +
              groupId +
              "+" +
              "admin: " +
              groupChatAdminId +
              "+" +
              "id bi xoa: " +
              userDeleteId
          );
      } else {
        res.send("ban khong phai admin");
      }
    } catch (error) {
      console.log("loi");
    }
  },
  leaveGroup: async (req, res) => {
    const user = req.user;
    const meId = user._id;
    const groupId = req.body.groupId;
    const groupChat = await GroupChatModel.findOne({ _id: groupId });
    const _groupId = groupChat._id;
    const groupChatAdminId = groupChat.adminGroup;
    const newAdminId = req.body.newAdminId;
    try {
      if (meId == groupChatAdminId) {
        await GroupChatModel.findOneAndUpdate(
          { _id: groupId },
          { $pull: { memberChat: { id: meId } } }
        );
        await UserModel.findOneAndUpdate(
          { _id: meId },
          { $pull: { groups: { id: _groupId } } }
        );
        await GroupChatModel.findOneAndUpdate(
          { _id: groupId },
          { adminGroup: newAdminId }
        );
        res
          .status(200)
          .send("admin da roi khoi nhom va admin moi la: " + "newAdminId");
      }
      if (meId != groupChatAdminId) {
        await GroupChatModel.findOneAndUpdate(
          { _id: groupId },
          { $pull: { memberChat: { id: meId } } }
        );
        await UserModel.findOneAndUpdate(
          { _id: meId },
          { $pull: { groups: { id: _groupId } } }
        );
      }
    } catch (error) {
      console.log("loi");
    }
  },

  renameGroupChat: async (req, res) => {
    const idGroupChat = req.body._id;
    // const adminGroup = req.body.adminGroup;
    // const idOfUserRename = req.body.idOfUserRename;
    const newNameGroupChat = req.body.newNameGroupChat;

    // if (adminGroup !== idOfUserRename) {
    //   return res.status(408).json({ message: "Ban khong co quyen doi ten!" });
    // } else {
    const update = await GroupChatModel.findByIdAndUpdate(
      idGroupChat,
      {
        nameGroupChat: newNameGroupChat,
      },
      {
        new: true,
      }
    );

    if (!update) {
      res.status(408).json({ message: "cap nhat khong thanh cong" });
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json({ message: "cap nhat thanh cong", update });
    }
    // }
  },

  updateUserWhenDelete: async (req, res) => {
    const idGroupChat = req.body.idGroupChat;
    const idUserDeleted = req.body.idUserDeleted;

    console.log("---------");
    console.log(idGroupChat);
    console.log(idUserDeleted);
    console.log("---------");

    const removeGroup = await UserModel.findByIdAndUpdate(
      idUserDeleted,
      {
        $pull: {
          groups: { id: mongoose.Types.ObjectId(idGroupChat) },
        },
      },
      {
        new: true,
      }
    );

    if (!removeGroup) {
      res.status(409).json({ message: "khong thanh cong" });
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json({ message: "thanh cong", removeGroup });
    }
  },

  addUserToGroup: async (req, res, next) => {
    const idGroupChat = req.body.idGroupChat;
    const idUser = req.body.idUser;

    console.log(idGroupChat);
    console.log(idUser);

    const added = await GroupChatModel.findByIdAndUpdate(
      idGroupChat,
      {
        $push: {
          memberChat: { id: idUser },
        },
      },
      {
        new: true,
      }
    );

    if (!added) {
      res.status(409).json({ message: "khong thanh cong" });
      throw new Error("Chat Not Found");
    } else {
      req.body.idGroupChat = idGroupChat;
      req.body.idUser = idUser;
      next();
      // res.status(200).json({ message: "them thanh cong", added });
    }
  },

  updateGroupInUser: async (req, res) => {
    const idGroupChatInsert = req.body.idGroupChat;
    const idUserNeedInsert = req.body.idUser;

    console.log("---------");
    console.log(idGroupChatInsert);
    console.log(idUserNeedInsert);
    console.log("---------");

    const insert = await UserModel.findByIdAndUpdate(
      idUserNeedInsert,
      {
        $push: {
          groups: { id: mongoose.Types.ObjectId(idGroupChatInsert) },
        },
      },
      {
        new: true,
      }
    );

    if (!insert) {
      res.status(409).json({ message: "them vao nhom chatkhong thanh cong" });
      throw new Error("Chat Not Found");
    } else {
      res
        .status(200)
        .json({ message: "them vao nhom chat thanh cong", insert });
    }
  },
};

export default GroupChatController;
