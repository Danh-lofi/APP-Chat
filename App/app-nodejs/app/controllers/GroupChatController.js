import mongoose, { mongo } from "mongoose";
import ChatModel from "../models/chatModel.js";
import GroupChatModel from "../models/GroupChat.js";
import UserModel from "../models/User.js";

const GroupChatController = {
  createGroupChat: async (req, res, next) => {
    const nameGroupChat = req.body.nameGroupChat;
    const adminGroup = req.body.adminGroup;
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

  getMemberInGroupChat: async (req, res) => {
    const { idGroupChat } = req.params;
    console.log(idGroupChat);

    const rs = await GroupChatModel.findById({
      _id: mongoose.Types.ObjectId(idGroupChat),
    });

    if (!rs) {
      res.status(400).json({ mess: "Khong co group" });
    } else {
      const listUser = rs.memberChat;
      const listMemberChat = [];

      for (const idUser of listUser) {
        const mb = await UserModel.findById({
          _id: mongoose.Types.ObjectId(idUser.id),
        });
        listMemberChat.push(mb);
      }

      res.status(200).json(listMemberChat);
    }
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

        // res.status(200).json({ rs, message: "Thanh cong" });
      } catch (error) {
        res.status(407).json({ error, message: "Khong thanh cong" });
      }
    }
    res.status(200).json({ message: "Thanh cong" });

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

  // getInforGroup: async (req, res) => {
  //   console.log(req.params);
  // }
};

export default GroupChatController;
